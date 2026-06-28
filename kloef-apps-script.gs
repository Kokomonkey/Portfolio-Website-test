/**
 * Kloef sync backend — Google Apps Script
 * ----------------------------------------
 * Setup:
 *   1. Open a new Google Sheet (sheets.new)
 *   2. Extensions > Apps Script
 *   3. Delete any sample code, paste this whole file, save (Ctrl+S)
 *   4. Deploy > New deployment > gear icon > Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 *   5. Authorize when prompted (it'll warn about "unverified" — that's normal for personal scripts)
 *   6. Copy the Web app URL (ends with /exec)
 *   7. Paste it into the Kloef "Setup sync" prompt
 *
 * The sheet stores the whole Kloef state as JSON in cell A1 of a tab called
 * "kloef_state". You can clear that cell to wipe everything.
 */

const SHEET_NAME = 'kloef_state';
const CELL = 'A1';

function doGet(e) {
  const raw = getSheet().getRange(CELL).getValue();
  const state = raw ? safeParse_(raw) : {};
  return jsonResp_({ ok: true, state: state });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const incoming = safeParse_(e.postData.contents) || {};
    const sheet = getSheet();
    const cur = sheet.getRange(CELL).getValue();
    const remote = cur ? (safeParse_(cur) || {}) : {};
    const merged = mergeStates_(remote, incoming);
    sheet.getRange(CELL).setValue(JSON.stringify(merged));
    return jsonResp_({ ok: true, state: merged });
  } catch (err) {
    return jsonResp_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Item-level merge across all lists.
 * Rules per item id:
 *   - if only one side has it, keep it
 *   - if both, pick the one with newer updated_at
 *   - deleted=true wins over not-deleted (deletes propagate)
 */
function mergeStates_(a, b) {
  const lists = ['tasks', 'books', 'movies', 'series', 'anime'];
  const out = {};
  for (const k of lists) {
    const map = new Map();
    for (const it of (a[k] || [])) map.set(it.id, it);
    for (const it of (b[k] || [])) {
      const ex = map.get(it.id);
      if (!ex) { map.set(it.id, it); continue; }
      if (it.deleted && !ex.deleted) { map.set(it.id, it); continue; }
      if (ex.deleted && !it.deleted) { continue; }
      const eU = ex.updated_at || 0;
      const iU = it.updated_at || 0;
      if (iU > eU) map.set(it.id, it);
    }
    out[k] = Array.from(map.values());
  }
  return out;
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function safeParse_(s) {
  try { return JSON.parse(s); } catch (e) { return null; }
}

function jsonResp_(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}
