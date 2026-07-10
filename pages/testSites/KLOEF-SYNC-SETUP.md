# Kloef sync setup (JSONBin.io)

Free shared backend so Kloef syncs between your laptop, your phone, and your girlfriend's PC. ~2 minutes to set up. Free tier is 10,000 requests/month — plenty.

## 1. Create a JSONBin account

1. Go to [jsonbin.io](https://jsonbin.io) → **Sign Up** (use any email).
2. Verify your email.

## 2. Create a private bin

1. Once logged in, top right: **Create Bin**.
2. The editor opens with sample JSON. Replace the content with just an empty object:
   ```json
   {}
   ```
3. Make sure **Private** is toggled on (it's the default).
4. Click **Create**.
5. After creation, you'll see the bin ID at the top — looks like `65f1a2b3c4d5e6f7g8h9i0j1`. Copy it.

## 3. Get your Master Key

1. Top right corner → click your profile icon → **API Keys**.
2. Copy your **Master Key** (starts with `$2a$10$...`). This is the long secret that gives full read/write access.

## 4. Connect Kloef

1. Open your Kloef page (use the secret passcode from the homepage).
2. Sidebar, bottom-left: click **⚙️ Setup sync**.
3. Paste the **Bin ID** and **Master Key** in the two fields.
4. Click **Save & sync**.
5. The status pill should turn green: **☁️ Synced**.

## 5. Connect the other device

1. Open Kloef on the other device.
2. **⚙️ Setup sync** → paste the **same Bin ID and Master Key** → **Save & sync**.

That's it. Both devices now share state.

## How it works

- Every change on either device gets pushed to the bin (debounced ~700ms).
- Every 15 seconds (and on tab focus), Kloef pulls the latest bin and merges it in.
- Conflicts resolved per-item: if you both add different books, both survive. If you both edit the same item, newer wins. Deletes propagate.

## Security note

Anyone with the Master Key has full access to your bin (read + write + delete). Don't paste it anywhere public. Treat it like a password.

If you need to reset it: JSONBin → API Keys → generate a new key, then re-paste in Kloef on all devices.

## Troubleshooting

- **Status says "⚠️ Sync error"** → click it, double-check both fields. The Bin ID is the long string from the bin URL/page, not the bin name.
- **Things aren't appearing on the other device** → wait 15s, or switch tabs and back to force a pull.
- **Want to wipe everything** → on JSONBin.io, edit the bin and replace content with `{}`. Refresh both Kloef tabs.
- **Want to disconnect** → click the sync status pill → **Disconnect**. Your local data stays on the device.
- **Running out of free requests?** Unlikely (each save = 2 requests, polling = 1 every 15s ≈ 240/hour per device). At 2 devices, ~12,000/month if both are open all day. If you do hit it, JSONBin's paid tier is $5/month — or switch backends.
