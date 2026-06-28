# Kloef sync setup

Step-by-step to get your Kloef page syncing between your laptop and your girlfriend's PC (and any other device). Free, uses your own Google account.

## 1. Create the Google Sheet

1. Go to [sheets.new](https://sheets.new) (creates a blank sheet in your Drive).
2. Rename it something like `Kloef sync`. Don't add any content — the script will manage it.

## 2. Open the Apps Script editor

1. In the sheet, top menu: **Extensions → Apps Script**.
2. A new tab opens with a file called `Code.gs` containing a sample function. Select all and delete it.
3. Open `kloef-apps-script.gs` from this repo, copy the whole file, paste it into the Apps Script editor.
4. Save (Ctrl + S or Cmd + S). Give the project any name when prompted, e.g. `Kloef`.

## 3. Deploy as a Web app

1. Top right: **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Fill in:
   - **Description**: anything, e.g. `Kloef sync v1`
   - **Execute as**: `Me (your@email)`
   - **Who has access**: `Anyone`
4. Click **Deploy**.
5. Google will ask you to authorize. Click **Authorize access** → pick your account → it'll warn "Google hasn't verified this app" (normal for personal scripts you wrote) → **Advanced → Go to Kloef (unsafe)** → **Allow**.
6. After deploying you get a **Web app URL** ending in `/exec`. Copy it.

> Important: "Who has access: Anyone" means anyone with the URL can read/write your sheet. Don't share the URL publicly. Anyone you give it to can sync to your data — that's how your girlfriend's device connects.

## 4. Connect Kloef

1. Open your Kloef page (`/kloef.html` via the secret passcode).
2. In the sidebar, click the **⚙️ Setup sync** button (bottom left, under the person picker).
3. Paste the Web app URL → **Save & sync**.
4. The status pill should switch to **☁️ Synced**.

## 5. Connect the other device

1. Open Kloef on the other device.
2. Click **⚙️ Setup sync** → paste the **same URL** → **Save & sync**.

That's it. Both devices now share a single state stored in your Google Sheet.

## How it works

- Every change you make on either device gets pushed to the sheet.
- Every 15 seconds (and on tab focus), Kloef pulls the latest state from the sheet and merges it in.
- Conflicts are resolved per item: if you both add different books at the same time, both survive. If you both edit the same item, the newer one wins. Deletes always propagate.

## Updating the script later

If I make changes to `kloef-apps-script.gs`, you'll need to:
1. Open the Apps Script editor again (Extensions → Apps Script from the same sheet).
2. Replace the code with the new version.
3. **Deploy → Manage deployments** → pencil icon on your existing deployment → **Version: New version** → **Deploy**.
4. The URL stays the same, so you don't need to re-paste anything in Kloef.

## Troubleshooting

- **Status says "⚠️ Sync error"** → click it to open setup and double-check the URL. Make sure it ends in `/exec`, not `/dev`.
- **Things aren't appearing on the other device** → refresh that tab (or just switch tabs and come back; Kloef pulls on focus).
- **Want to wipe everything** → open the sheet, find the tab called `kloef_state`, clear cell A1. Refresh both Kloef tabs.
- **Want to disconnect** → click the sync status pill → **Disconnect**. Your local data stays on the device.
