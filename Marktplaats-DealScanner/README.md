# Marktplaats DealScanner (v0.5)

Hunts the latest **bordspellen** listings on Marktplaats, matches each against **BoardGameGeek (BGG) ratings**, and ranks them by a **deal score** (great game + low price). Reads titles *and* descriptions, spots bundles and condition, and can auto-monitor for new deals. Runs locally on your machine.

## Two tabs

- **Losse deals** — browses the whole Bordspellen category (up to 200 listings): individual games for sale.
- **Partijen** — searches for group listings / lots (40 listings, split across the searches `"bordspellen partij"` and `"bordspellen"`). These bundles are often the best value; the description reader lists every recognised game inside them. Each tab caches its last result and can auto-monitor independently.

## Run it

You need **Node 18 or newer** (check with `node --version`).

```bash
cd Marktplaats-DealScanner
npm start
```

Then open **http://localhost:3000** and click **Scan**. A scan takes a few seconds.

## What each scan does

1. Pages through Marktplaats' search API (`/lrp/api/search`) for the Bordspellen category — up to 200 unique listings.
2. Matches each listing's **title and description** against a bundled BGG ratings table (`games.json`). Matching is two-tier: exact name-phrase first, then all-significant-tokens (handles "Second Edition" vs "Tweede Editie").
3. Scores each match as a **deal** and shows the best ones.

## The deal score

A 0–100 score combining two things:

- **How good the game is** — BGG rating, normalised (6.0 → 0, 9.0 → 1).
- **How cheap it is** — the asking price relative to the other matched listings in the same scan (cheapest = 1, priciest = 0).

Default weighting is 55% rating / 45% price (`ratingWeight` / `priceWeight` in the config). Bundles get a small boost since one price covers several games. A **🔥 topdeal** badge means cheap *and* well-rated. Listings with "bieden" / "zie beschrijving" prices can't be price-scored, so they get a neutral cheapness value.

You can also re-sort the results by pure BGG rating or by price in the UI.

## Descriptions, bundles & condition

Because it reads descriptions, a vague listing like *"partij bordspellen"* whose text mentions "Gloomhaven, Everdell, Terraforming Mars" now surfaces — these bundles are often the best value. Each card shows condition/type tags detected from the text (**nieuw, zgan, compleet, incompleet, bundel**) and, for bundles, the other games found.

## Auto-monitor (find deals fast)

Good deals sell within minutes. Tick **Auto (elke 15 min)** and the page re-scans every 15 minutes; new matched listings are highlighted **NIEUW** and — if you allow browser notifications — you get a desktop alert for new deals. This runs while the tab is open.

(Note: this lives in the local server/page, not as a background system task, because the scraping only works from your own machine's connection.)

## The BGG ratings table (`games.json`)

A snapshot of BoardGameGeek's **top ~240 highest-ranked games** (name, year, rank, average rating, vote count), from the public [beefsack/bgg-ranking-historicals](https://github.com/beefsack/bgg-ranking-historicals) dataset. Enough to correctly rank the best deals (a game outside the top ranks can't top the list anyway). Trade-off: mid-ranked mainstream games (base Catan, Monopoly) aren't recognised — widen `games.json` for more coverage.

## Tuning (top of `server.js`)

- `MODES` — the two tabs. Each has a `targetListings` count and a `queries` list (`[]` = browse the category; otherwise the budget is split across the search terms). Add or edit terms here (e.g. add `"bordspellen lot"` to the bundles tab).
- `topN` (15) — how many results to show per tab.
- `ratingWeight` / `priceWeight` — deal-score balance (must sum to 1).
- `minBggVotes` (30) — safety filter for obscure matches.
- `l1CategoryId: 1099` / `l2CategoryId: 1233` — the Bordspellen category.

## Next steps (ideas)

- **Vision check on the shortlist** — analyse listing photos to confirm edition/completeness (needs a vision API; scaffolding-ready).
- A bigger `games.json` (top 1000+) for wider coverage.
- Full-description fetch per shortlisted listing for richer condition detection.
- Filters (max price, min rating, distance) and more sites beyond Marktplaats.
