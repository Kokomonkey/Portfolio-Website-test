/**
 * Marktplaats DealScanner - v0.3
 * -------------------------------------------------------------
 * Local server. Open http://localhost:3000 and click "Scan".
 * It fetches up to 200 bordspellen listings from Marktplaats,
 * matches each against a bundled BoardGameGeek ratings table
 * (games.json — BGG's top-rated games), and shows the TOP 10
 * highest-rated games currently for sale.
 *
 * The BGG ratings are bundled locally (games.json), so scans are
 * fast and don't depend on BGG's rate-limited live API.
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
  targetListings: 200, // how many Marktplaats listings to scan
  pageSize: 100, // Marktplaats returns ~100 per request; we paginate
  topN: 10, // how many to show
  l1CategoryId: 1099, // Spelletjes en Spellen
  l2CategoryId: 1233, // Bordspellen
  searchQuery: "", // "" = whole category; or a keyword to search within
  minBggVotes: 30, // ignore matches with fewer BGG votes (safety filter)
};

// ============================================================
// BGG ratings dataset (bundled)
// ============================================================
const GAMES = JSON.parse(
  fs.readFileSync(path.join(__dirname, "games.json"), "utf8")
);

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

function log(...a) {
  console.log(new Date().toISOString().slice(11, 19), ...a);
}

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Words we ignore when comparing game names token-by-token.
const EDITION = new Set(
  "first second third fourth fifth deluxe edition editie anniversary big box revised new ed kickstarter ks retail exclusive collectors collector standard".split(
    " "
  )
);
const STOP = new Set(
  "van de het een en met the of a an to voor in op der die das".split(" ")
);

// Precompute significant tokens for each game name.
for (const g of GAMES) {
  g.sig = g.norm.split(" ").filter((w) => w.length >= 3 && !EDITION.has(w) && !STOP.has(w));
}

// Match a listing title to the best BGG game (or null).
//   Tier 1: full game name appears as a phrase in the title (precise)
//   Tier 2: all significant tokens of the game name appear in the title
function matchGame(title) {
  const nt = " " + norm(title) + " ";
  const titleTokens = new Set(nt.trim().split(" "));
  let best = null;
  let bestScore = 0;
  for (const g of GAMES) {
    let score = 0;
    if (g.norm.length >= 4 && nt.includes(" " + g.norm + " ")) {
      score = 100 + g.norm.length; // longer exact phrase = more specific
    } else if (g.sig.length >= 2 && g.sig.every((t) => titleTokens.has(t))) {
      score = 50 + g.sig.length * 3;
    }
    if (score > bestScore || (score === bestScore && best && g.votes > best.votes)) {
      best = g;
      bestScore = score;
    }
  }
  return bestScore > 0 ? best : null;
}

// ============================================================
// Marktplaats (paginated)
// ============================================================
async function fetchMarktplaatsPage(offset) {
  const params = new URLSearchParams({
    l1CategoryId: String(CONFIG.l1CategoryId),
    l2CategoryId: String(CONFIG.l2CategoryId),
    limit: String(CONFIG.pageSize),
    offset: String(offset),
    viewOptions: "list-view",
  });
  if (CONFIG.searchQuery && CONFIG.searchQuery.trim()) {
    params.set("query", CONFIG.searchQuery.trim());
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
  let priceLabel = "n.v.t.";
  if (l.priceInfo) {
    const t = l.priceInfo.priceType;
    if (t === "FIXED" && cents != null) priceLabel = `€${(cents / 100).toFixed(2)}`;
    else if (t === "FREE") priceLabel = "Gratis";
    else if (t === "MIN_BID") priceLabel = `Bieden (v.a. €${((cents || 0) / 100).toFixed(2)})`;
    else if (t === "SEE_DESCRIPTION") priceLabel = "Zie beschrijving";
    else if (t) priceLabel = t.toLowerCase();
  }
  let img = null;
  if (Array.isArray(l.pictures) && l.pictures.length) {
    const p = l.pictures[0];
    img = p.largeUrl || p.mediumUrl || p.extraLargeUrl || null;
  } else if (l.imageUrls && l.imageUrls.length) {
    img = l.imageUrls[0];
  }
  if (img && img.startsWith("//")) img = "https:" + img;
  const rel = l.vipUrl || "";
  return {
    id: l.itemId || rel,
    title: l.title || "",
    priceCents: cents,
    priceLabel,
    url: rel.startsWith("http") ? rel : `https://www.marktplaats.nl${rel}`,
    image: img,
    location: (l.location && l.location.cityName) || "",
    date: l.date || "",
  };
}

async function fetchListings(target) {
  const out = [];
  const seen = new Set();
  for (let offset = 0; out.length < target; offset += CONFIG.pageSize) {
    const page = await fetchMarktplaatsPage(offset);
    if (!page.length) break;
    for (const raw of page) {
      const l = normalizeListing(raw);
      if (l.id && !seen.has(l.id)) {
        seen.add(l.id);
        out.push(l);
        if (out.length >= target) break;
      }
    }
    if (page.length < CONFIG.pageSize) break;
  }
  log(`Marktplaats: ${out.length} unique listings`);
  return out;
}

// ============================================================
// Scan
// ============================================================
async function scan() {
  const listings = await fetchListings(CONFIG.targetListings);
  const rated = [];
  for (const l of listings) {
    const g = matchGame(l.title);
    if (g && g.votes >= CONFIG.minBggVotes) {
      rated.push({
        ...l,
        matchedName: g.name,
        bggRating: g.rating,
        bggVotes: g.votes,
        bggRank: g.rank,
        bggYear: g.year,
        bggUrl: `https://boardgamegeek.com/boardgame/${g.id}`,
      });
    }
  }
  rated.sort((a, b) => b.bggRating - a.bggRating);
  log(`Scan: ${listings.length} scanned, ${rated.length} matched`);
  return {
    scannedAt: new Date().toISOString(),
    scanned: listings.length,
    ratedCount: rated.length,
    top: rated.slice(0, CONFIG.topN),
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
  if (req.url === "/api/scan") {
    try {
      const data = await scan();
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

server.listen(CONFIG.port, () => {
  log(`DealScanner v0.3 → http://localhost:${CONFIG.port}  (${GAMES.length} BGG games loaded)`);
});
