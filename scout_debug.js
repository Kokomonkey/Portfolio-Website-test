const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_KEY;
const SERPER_API_KEY = process.env.SERPER_KEY;

async function searchWeb(query) {
    console.log(`\n🔍 Searching Serper for: "${query}"...`);
    try {
        const response = await axios.post(
            'https://google.serper.dev/search',
            { q: query, num: 3 }, // Only 3 results to keep logs clean
            { headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' } }
        );
        
        const results = response.data.organic || [];
        console.log(`   👉 Serper returned ${results.length} results.`);
        return results;
    } catch (error) {
        console.error("   ❌ SERPER API ERROR:", error.response ? error.response.data : error.message);
        return [];
    }
}

async function checkWithGemini(title, snippet) {
    // A simplified prompt to see if Gemini is working
    const prompt = `
    I have a search result: "${title}" - "${snippet}"
    Does this mention a specific software tool? 
    Reply with JSON: {"found": true, "name": "Tool Name"} or {"found": false}
    `;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            { 
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            }
        );
        
        const text = response.data.candidates[0].content.parts[0].text;
        console.log(`   🤖 Gemini Raw Reply: ${text}`); // SEE THIS LOG
        return JSON.parse(text);
    } catch (e) {
        console.error("   ❌ GEMINI ERROR:", e.message);
        return null;
    }
}

(async () => {
    // 1. CLEAR OLD DATA (Optional, keeps it clean for testing)
    fs.writeFileSync('candidates.json', '[]'); 
    console.log("🧹 Cleared candidates.json for fresh test.");

    // 2. SEARCH
    const results = await searchWeb("Best AI architecture tools 2025");

    if (results.length === 0) {
        console.log("🛑 STOPPING: Serper found 0 results. Check your SERPER_KEY in .env");
        return;
    }

    let candidates = [];

    // 3. ANALYZE
    for (const item of results) {
        console.log(`\n--- Checking Item ---`);
        console.log(`Title: ${item.title}`);
        
        const aiDecision = await checkWithGemini(item.title, item.snippet);
        
        if (aiDecision && aiDecision.found) {
            console.log(`✅ MATCH! Adding ${aiDecision.name}`);
            candidates.push({
                name: aiDecision.name,
                website_url: item.link,
                description_short: "Auto-detected"
            });
        } else {
            console.log(`❌ Skipped (AI said no match)`);
        }
    }

    // 4. SAVE
    fs.writeFileSync('candidates.json', JSON.stringify(candidates, null, 2));
    console.log(`\n🏁 Done. Saved ${candidates.length} candidates.`);
})();