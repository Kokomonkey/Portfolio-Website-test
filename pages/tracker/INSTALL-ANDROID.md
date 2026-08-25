# Kloef on your phone (Android) + sync

Kloef is now an installable **PWA** — a web app that adds itself to your home screen and runs full-screen and offline, no Play Store or APK needed.

## Install on Android (≈1 min)

1. **Publish the site** so the tracker is on `https://` (PWA install and offline only work over HTTPS — a `file://` copy won't install). Your portfolio is on GitHub Pages, so pushing the repo is enough.
2. On your phone, open **Chrome** and go to your live site, then type **`Kloef`** to enter the tracker (or open `…/pages/tracker/` directly).
3. Chrome shows an **"Install app" / "Add to Home screen"** prompt — tap it. (If it doesn't pop up: **⋮ menu → Add to Home screen / Install app**.)
4. A **Kloef** icon (amber "K") lands on your home screen. Open it — it launches full-screen like a native app and works offline.

*iPhone:* Safari → **Share → Add to Home Screen**.

## Sync PC ↔ phone

Kloef stores data locally on each device, so the phone starts empty. To share one live dataset, turn on the **Firebase sync you already set up**:

1. On the **phone** app: **Settings → Cloud sync (Firebase)**.
2. Paste the **same `firebaseConfig`** and the **exact same sync key** you used on your PC (e.g. `douwe-9f3k2xq7`) → **Enable**.
3. Done. Both devices now read/write the same `kloef/<key>` document — changes on one show up on the other within a second or two (it reconciles by timestamp, then live-updates).

**No cloud yet?** You can still move data across once with **Settings → Export JSON** on the PC and **Import JSON** on the phone — but that's a one-time copy, not live sync.

## Notes
- After you change the app and re-deploy, the phone may serve the old cached version for a moment. Pull-to-refresh once, or the service worker updates on the next launch (cache name `kloef-v1` — bump it in `sw.js` to force-refresh).
- Google Calendar and Firebase both need the HTTPS origin, so they only work in the installed/live version, not a local file.
