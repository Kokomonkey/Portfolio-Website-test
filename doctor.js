const axios = require('axios');
require('dotenv').config();

const GEMINI_KEY = process.env.GEMINI_KEY;
const SERPER_KEY = process.env.SERPER_KEY;

console.log("\n🏥 API CONNECTION DOCTOR\n");

// Check 1: Do the keys look right?
if (!GEMINI_KEY || !SERPER_KEY) {
    console.error("❌ CRITICAL: One or both keys are missing from .env file.");
    process.exit(1);
}

console.log(`🔑 GEMINI_KEY:  ${GEMINI_KEY.substring(0, 6)}... (Should start with 'AIza')`);
console.log(`🔑 SERPER_KEY:  ${SERPER_KEY.substring(0, 6)}... (Usually lowercase hex)`);

(async () => {
    // TEST 1: SERPER (Search)
    console.log("\nTesting Serper API...");
    try {
        const serperResponse = await axios.post(
            'https://google.serper.dev/search',
            { q: "test", num: 1 },
            { headers: { 'X-API-KEY': SERPER_KEY, 'Content-Type': 'application/json' } }
        );
        if (serperResponse.data.organic) {
            console.log("✅ SERPER WORKING: Connection successful.");
        }
    } catch (e) {
        console.error("❌ SERPER FAILED:", e.response ? e.response.data : e.message);
        console.error("👉 Check if your SERPER_KEY is correct and has credits.");
    }

    // TEST 2: GEMINI (AI)
    console.log("\nTesting Gemini API...");
    try {
        const geminiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
            { contents: [{ parts: [{ text: "Say 'Hello'" }] }] }
        );
        console.log("✅ GEMINI WORKING: Response received.");
        console.log("   AI Said:", geminiResponse.data.candidates[0].content.parts[0].text);
    } catch (e) {
        console.error("❌ GEMINI FAILED:", e.response ? e.response.data : e.message);
        if (e.response && e.response.status === 400) {
            console.error("👉 Error 400 often means the KEY is invalid or the MODEL name is wrong.");
        }
        if (e.response && e.response.status === 403) {
            console.error("👉 Error 403 means 'Permission Denied'. You might be in a blocked region (Europe/Canada) without billing enabled.");
        }
    }
})();