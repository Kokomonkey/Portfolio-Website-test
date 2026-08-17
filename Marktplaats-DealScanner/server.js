/**
 * Marktplaats DealScanner - v0.4
 * -------------------------------------------------------------
 * Local server. Open http://localhost:3000 and click "Scan".
 *
 * It fetches up to 200 bordspellen listings from Marktplaats, matches
 * each (title AND description) against a bundled BoardGameGeek ratings
 * table (games.json), scores each as a DEAL (rating vs. price), detects
 * bundles and condition, and shows the best deals. Optional auto-monitor
 * re-scans and notifies you of new deals.
 *
 * Runs on YOUR machine (Node 18+). No packages.  Start:  npm start
 * -------------------------------------------------------------
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

// ============================================================
// CONFIG
// ============================================================
const CONFIG = {
  port: 3000,
  pageSize: 100,
  topN: 15, // how many deals to show
  l1CategoryId: 1099, // Spelletjes en Spellen
  l2CategoryId: 1233, // Bordspellen
  minBggVotes: 30,

  // Deal score weighting (must sum to 1). Higher ratingWeight = favor great
  // games; higher priceWeight = favor cheap-relative-to-peers listings.
  ratingWeight: 0.55,
  priceWeight: 0.45,
};

// Scan modes (the two tabs in the UI).
const MODES = {
  // Whole Bordspellen category — individual games.
  category: {
    label: "Losse deals",
    targetListings: 200,
    queries: [], // [] = browse the category, no keyword
  },
  // Group listings / lots — often the best value. Searches within the category.
  bundles: {
    label: "Partijen",
    targetListings: 40,
    queries: ["bordspellen partij", "bordspellen"],
  },
};
const DEFAULT_MODE = "category";

// ============================================================
// BGG dataset (bundled)
// ============================================================
const GAMES = JSON.parse(fs.readFileSync(path.join(__dirname, "games.json"), "utf8"));

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const EDITION = new Set(
  "first second third fourth fifth deluxe edition editie anniversary big box revised new ed kickstarter ks retail exclusive collectors collector standard".split(
    " "
  )
);
const STOP = new Set("van de het een en met the of a an to voor in op der die das".split(" "));
for (const g of GAMES) {
  g.sig = g.norm.split(" ").filter((w) => w.length >= 3 && !EDITION.has(w) && !STOP.has(w));
}

// Return ALL games mentioned in a text (title and/or description), best-first.
function matchAllGames(text) {
  const nt = " " + norm(text) + " ";
  const tokens = new Set(nt.trim().split(" "));
  const hits = [];
  for (const g of GAMES) {
    let score = 0;
    if (g.norm.length >= 4 && nt.includes(" " + g.norm + " ")) score = 100 + g.norm.length;
    else if (g.sig.length >= 2 && g.sig.every((t) => tokens.has(t))) score = 50 + g.sig.length * 3;
    if (score > 0) hits.push({ g, score });
  }
  // Dedupe by game id, keep highest score; then sort by rating desc.
  const byId = new Map();
  for (const h of hits) {
    const cur = byId.get(h.g.id);
    if (!cur || h.score > cur.score) byId.set(h.g.id, h);
  }
  return [...byId.values()].sort((a, b) => b.g.rating - a.g.rating).map((h) => h.g);
}

// Condition / type tags from listing text.
function detectTags(text) {
  const t = norm(text);
  const tags = [];
  if (/\b(nieuw|sealed|verzegeld|geseald|nieuwstaat)\b/.test(t)) tags.push("nieuw");
  else if (/\b(zgan|zo goed als nieuw|nette staat|net)\b/.test(t)) tags.push("zgan");
  if (/\b(incompleet|niet compleet|onvolledig|mist|missen|ontbreek|ontbreekt)\b/.test(t))
    tags.push("incompleet");
  else if (/\bcompleet\b/.test(t)) tags.push("compleet");
  if (/\b(partij|lot|bundel|verzameling|collectie|meerdere spellen|games)\b/.test(t))
    tags.push("bundel");
  return tags;
}

// ============================================================
// Marktplaats (paginated)
// ============================================================
async function fetchMarktplaatsPage(offset, query) {
  const params = new URLSearchParams({
    l1CategoryId: String(CONFIG.l1CategoryId),
    l2CategoryId: String(CONFIG.l2CategoryId),
    limit: String(CONFIG.pageSize),
    offset: String(offset),
    viewOptions: "list-view",
  });
  if (query && query.trim()) {
    params.set("query", query.trim());
    params.set("searchInTitleAndDescription", "true");
  }
  const url = `https://www.marktplaats.nl/lrp/api/search?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "application/json",
      "Accept-Language": "nl-NL,nl;q=0.9,en;q=0.8",
    },
  });
  if (!res.ok) throw new Error(`Marktplaats HTTP ${res.status}`);
  const data = await res.json();
  return data.listings || [];
}

function normalizeListing(l) {
  const cents =
    l.priceInfo && typeof l.priceInfo.priceCents === "number" ? l.priceInfo.priceCents : null;
  const priceType = (l.priceInfo && l.priceInfo.priceType) || "";
  // Usable euro price only for fixed prices (bidding/see-description = unknown).
  const priceEuros = priceType === "FIXED" && cents != null ? cents / 100 : null;
  let priceLabel = "n.v.t.";
  if (priceType === "FIXED" && cents != null) priceLabel = `€${(cents / 100).toFixed(2)}`;
  else if (priceType === "FREE") priceLabel = "Gratis";
  else if (priceType === "MIN_BID") priceLabel = `Bieden (v.a. €${((cents || 0) / 100).toFixed(2)})`;
  else if (priceType === "SEE_DESCRIPTION") priceLabel = "Zie beschrijving";
  else if (priceType) priceLabel = priceType.toLowerCase();

  let img = null;
  if (Array.isArray(l.pictures) && l.pictures.length) {
    const p = l.pictures[0];
    img = p.largeUrl || p.mediumUrl || p.extraLargeUrl || null;
  } else if (l.imageUrls && l.imageUrls.length) img = l.imageUrls[0];
  if (img && img.startsWith("//")) img = "https:" + img;

  const rel = l.vipUrl || "";
  return {
    id: l.itemId || rel,
    title: l.title || "",
    description: l.description || l.categorySpecificDescription || "",
    priceEuros,
    priceLabel,
    url: rel.startsWith("http") ? rel : `https://www.marktplaats.nl${rel}`,
    image: img,
    location: (l.location && l.location.cityName) || "",
    date: l.date || "",
    seller: (l.sellerInformation && l.sellerInformation.sellerName) || "",
  };
}

// Fetch `target` unique listings. `queries` = [] browses the category;
// otherwise the budget is split across the given search terms (deduped).
async function fetchListings(target, queries) {
  const out = [];
  const seen = new Set();
  let loggedKeys = false;
  const terms = queries && queries.length ? queries : [""]; // "" = browse
  const perTerm = Math.ceil(target / terms.length);

  for (const term of terms) {
    let got = 0;
    for (let offset = 0; got < perTerm && out.length < target; offset += CONFIG.pageSize) {
      const page = await fetchMarktplaatsPage(offset, term);
      if (!page.length) break;
      if (!loggedKeys && page[0]) {
        loggedKeys = true;
        log("raw listing fields:", Object.keys(page[0]).join(", "));
        log("has description?", "description" in page[0] || "categorySpecificDescription" in page[0]);
      }
      for (const raw of page) {
        const l = normalizeListing(raw);
        if (l.id && !seen.has(l.id)) {
          seen.add(l.id);
          out.push(l);
          got++;
          if (got >= perTerm || out.length >= target) break;
        }
      }
      if (page.length < CONFIG.pageSize) break;
    }
  }
  log(`Marktplaats: ${out.length} unique listings (queries: ${terms.map((t) => t || "«categorie»").join(", ")})`);
  return out;
}

// ============================================================
// Scan + deal scoring
// ============================================================
function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

async function scan(modeName) {
  const mode = MODES[modeName] || MODES[DEFAULT_MODE];
  const listings = await fetchListings(mode.targetListings, mode.queries);

  // 1) Match each listing (title first, then description for bundles/vague titles).
  const matched = [];
  for (const l of listings) {
    const titleHits = matchAllGames(l.title);
    const descHits = l.description ? matchAllGames(l.description) : [];
    const all = [];
    const ids = new Set();
    for (const g of [...titleHits, ...descHits]) {
      if (!ids.has(g.id) && g.votes >= CONFIG.minBggVotes) {
        ids.add(g.id);
        all.push(g);
      }
    }
    if (!all.length) continue;
    const primary = all[0]; // highest-rated matched game
    matched.push({
      ...l,
      primary,
      games: all,
      isBundle: all.length >= 2,
      matchedIn: titleHits.length ? "titel" : "beschrijving",
      tags: detectTags(l.title + " " + l.description),
    });
  }

  // 2) Cheapness: min-max normalize price across matched listings that have one.
  const priced = matched.filter((m) => m.priceEuros != null && m.priceEuros > 0);
  const prices = priced.map((m) => m.priceEuros);
  const minP = prices.length ? Math.min(...prices) : 0;
  const maxP = prices.length ? Math.max(...prices) : 0;
  const cheapness = (p) => (maxP > minP ? (maxP - p) / (maxP - minP) : 0.5);

  // 3) Deal score = weighted rating + cheapness. Bundles get a small boost
  //    (their price covers several games). Unknown price = neutral cheapness.
  for (const m of matched) {
    const ratingNorm = clamp01((m.primary.rating - 6) / 3); // 6.0->0, 9.0->1
    const cheap = m.priceEuros != null && m.priceEuros > 0 ? cheapness(m.priceEuros) : 0.45;
    let deal = CONFIG.ratingWeight * ratingNorm + CONFIG.priceWeight * cheap;
    if (m.isBundle) deal += 0.05;
    m.dealScore = Math.round(clamp01(deal) * 100);
    m.topDeal = cheap >= 0.6 && ratingNorm >= 0.5;
    m.bggRating = m.primary.rating;
    m.bggVotes = m.primary.votes;
    m.bggRank = m.primary.rank;
    m.bggYear = m.primary.year;
    m.matchedName = m.primary.name;
    m.bggUrl = `https://boardgamegeek.com/boardgame/${m.primary.id}`;
    m.otherGames = m.games.slice(1).map((g) => g.name);
    // strip heavy fields from payload
    delete m.primary;
    delete m.games;
    delete m.description;
  }

  matched.sort((a, b) => b.dealScore - a.dealScore);
  log(`Scan [${modeName || DEFAULT_MODE}]: ${listings.length} scanned, ${matched.length} matched`);
  return {
    mode: modeName || DEFAULT_MODE,
    scannedAt: new Date().toISOString(),
    scanned: listings.length,
    ratedCount: matched.length,
    top: matched.slice(0, CONFIG.topN),
  };
}

// ============================================================
// HTTP server
// ============================================================
const server = http.createServer(async (req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    fs.readFile(path.join(__dirname, "public", "index.html"), (err, buf) => {
      if (err) {
        res.writeHead(500);
        res.end("index.html not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(buf);
      }
    });
    return;
  }
  if (req.url.startsWith("/api/scan")) {
    const mode = new URL(req.url, "http://localhost").searchParams.get("mode") || DEFAULT_MODE;
    try {
      const data = await scan(mode);
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(data));
    } catch (e) {
      log("Scan error:", e.message);
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }
  res.writeHead(404);
  res.end("Not found");
});

if (require.main === module) {
  server.listen(CONFIG.port, () => {
    log(`DealScanner v0.4 → http://localhost:${CONFIG.port}  (${GAMES.length} BGG games loaded)`);
  });
}

// Exposed for offline testing.
module.exports = { matchAllGames, detectTags, normalizeListing, CONFIG, GAMES };
