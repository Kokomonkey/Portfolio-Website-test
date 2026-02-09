const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const GEMINI_KEY = process.env.GEMINI_KEY;
const SERPER_KEY = process.env.SERPER_KEY;

// 1. DYNAMIC MODEL SELECTOR
// We try the newest model first. If it crashes, you can manually change this string.
const MODEL_NAME = "gemini-pro"; 
// const MODEL_NAME = "gemini-pro"; // Uncomment this if 2.0 fails too

async function searchWeb(query) {
    try {
        const response = await axios.post(
            'https://google.serper.dev/search',
            { q: query, num: 10 }, 
            { headers: { 'X-API-KEY': SERPER_KEY, 'Content-Type': 'application/json' } }
        );
        return response.data.organic || [];
    } catch (error) {
        console.error("❌ Serper Error:", error.message);
        return [];
    }
}

async function askGemini(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_KEY}`;
    
    try {
        const response = await axios.post(url, { 
            contents: [{ parts: [{ text: prompt }] }] 
        });
        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        // PRINT THE REAL ERROR so we stop guessing
        const errMsg = error.response?.data?.error?.message || error.message;
        console.error(`❌ AI Error (${MODEL_NAME}):`, errMsg);
        return null;
    }
}

async function extractToolNames(snippet, title) {
    const prompt = `
    Source: "${title}" - "${snippet}"
    List specific AI architecture software names found here. 
    Format: Comma-separated list (e.g. Veras, TestFit). 
    If none, say NONE.
    `;
    
    const text = await askGemini(prompt);
    if (!text || text.includes("NONE")) return [];
    
    return text.split(',').map(s => s.trim()).filter(s => s.length > 2);
}

// MAIN LOOP
(async () => {
    console.log(`🚀 Scout initialized using model: ${MODEL_NAME}`);
    
    const queries = ["Top AI tools for architects 2025", "Generative design software architecture"];
    let foundCount = 0;

    for (const q of queries) {
        console.log(`\n🔎 Scanning: "${q}"...`);
        const results = await searchWeb(q);
        
        for (const item of results) {
            const names = await extractToolNames(item.snippet, item.title);
            if (names.length > 0) {
                console.log(`   ✅ Found: ${names.join(", ")}`);
                foundCount += names.length;
                
                // SAVE IMMEDIATELY (Simple Append)
                // In a real app we dedup, but for now let's just prove it works
                let current = [];
                if (fs.existsSync('candidates.json')) current = JSON.parse(fs.readFileSync('candidates.json'));
                
                names.forEach(n => {
                    current.push({ name: n, website_url: item.link });
                });
                
                fs.writeFileSync('candidates.json', JSON.stringify(current, null, 2));
            } else {
                process.stdout.write("."); // searching...
            }
        }
    }
    
    if (foundCount === 0) {
        console.log("\n\n⚠️ STILL 0 FOUND? Try changing 'MODEL_NAME' at the top of the script to 'gemini-pro'.");
    }
})();