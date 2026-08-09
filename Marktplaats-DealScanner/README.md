# Marktplaats DealScanner (v0.3)

Scans the latest **bordspellen** listings on Marktplaats, cross-references each with its **BoardGameGeek (BGG) rating**, and shows the **top 10 highest-rated** games currently for sale. Runs locally on your machine.

## Run it

You need **Node 18 or newer** (check with `node --version`).

```bash
cd Marktplaats-DealScanner
npm start
```

Then open **http://localhost:3000** and click **Scan**. A scan takes only a few seconds.

## How it works

1. `server.js` pages through Marktplaats' internal search API (`/lrp/api/search`) for the Bordspellen category, collecting up to 200 unique listings.
2. Each listing title is matched against a **bundled BGG ratings table** (`games.json`) — no live BGG calls, so it's fast and never rate-limited. Matching is two-tier: an exact name-phrase match first, then an all-significant-tokens match (which handles edition differences like "Second Edition" vs "Tweede Editie").
3. Matched listings are ranked by BGG rating; the top 10 are shown.

## The BGG ratings table (`games.json`)

This is a snapshot of BoardGameGeek's **top ~240 highest-ranked games** (name, year, rank, average rating, vote count), sourced from the public [beefsack/bgg-ranking-historicals](https://github.com/beefsack/bgg-ranking-historicals) dataset.

Why only the top ~240? Because any game good enough to appear in a *top-10-by-rating* is already in BGG's top ranks — so this is enough to produce the correct top 10. The trade-off: common but mid-ranked games (e.g. base Catan, Monopoly) won't be recognised. Widening coverage (more games) is a natural next step.

## Tuning (top of `server.js`)

- `targetListings` — how many listings to scan (default 200).
- `topN` — how many to show (default 10).
- `minBggVotes` — ignore BGG matches with fewer votes than this (filters bad/obscure matches). Default 30.
- `searchQuery` — leave `""` to browse the whole Bordspellen category, or set a keyword (e.g. `"catan"`) to search *within* it.
- `l1CategoryId: 1099` / `l2CategoryId: 1233` — the Spelletjes en Spellen → Bordspellen category.
- `bggDelayMs` — politeness delay between BGG calls. Lower = faster but riskier for rate limits.

## Known limitations

- **Coverage is the top ~240 BGG games.** Listings for games outside that set show no match (see above). Correct for the top-10 goal; expand `games.json` for broader coverage.
- **Matching is best-guess.** Clean titles match well; heavily bundled or vaguely-named listings ("partij bordspellen") may be skipped.
- **No "deal" logic yet** — it ranks by rating only, not price-vs-rating. That's the natural next step.

## Next steps (ideas)

- A "deal score" combining rating with asking price.
- A bigger `games.json` (top 1000+) for wider coverage.
- Filters (max price, min rating, location radius).
- More sites beyond Marktplaats.
