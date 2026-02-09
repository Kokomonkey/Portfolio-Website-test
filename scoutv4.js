const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_KEY;
const SERPER_API_KEY = process.env.SERPER_KEY;

// --- UTILS ---
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 1. SEARCH FUNCTION
async function searchWeb(query) {
    try {
        const response = await axios.post(
            'https://google.serper.dev/search',
            { q: query, num: 10 }, 
            { headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' } }
        );
        return response.data.organic || [];
    } catch (error) {
        console.error("❌ Search Error (Check API Key):", error.message);
        return [];
    }
}

// 2. PHASE 1: EXTRACT NAMES (Text Mode - Robust)
async function extractToolNames(snippet, title) {
    // We ask for a simple list, not JSON, to avoid syntax errors
    const prompt = `
    I am scanning for AI software used in ARCHITECTURE and CONSTRUCTION (AEC).
    Source Title: "${title}"
    Source Snippet: "${snippet}"

    Task: List the names of specific software tools mentioned.
    Rules:
    - Ignore general terms like "AI", "Machine Learning", "Microservices".
    - Ignore generic companies like "Adobe" unless a specific tool like "Firefly" is named.
    - Output strictly a comma-separated list.
    
    Example Output: Veras, TestFit, Hypar, Midjourney
    If none, Output: NONE
    `;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: prompt }] }] }
        );
        
        const text = response.data.candidates[0].content.parts[0].text.trim();
        
        // CLEANUP: Remove "Output:" or newlines
        const cleanText = text.replace(/^Output:/i, '').replace(/\n/g, ',').trim();
        
        if (cleanText.toUpperCase().includes("NONE")) return [];

        // Split by comma and clean up whitespace
        return cleanText.split(',').map(s => s.trim()).filter(s => s.length > 2);

    } catch (e) {
        return [];
    }
}

// 3. PHASE 2: GET DETAILS (One by one)
async function getToolDetails(toolName) {
    // Specific search for the homepage
    const searchResults = await searchWeb(`${toolName} AI architecture software homepage`);
    if (searchResults.length === 0) return null;

    const topResult = searchResults[0]; 

    const prompt = `
    Details for: "${toolName}"
    Website: "${topResult.link}"
    Snippet: "${topResult.snippet}"

    Create a valid JSON object with these fields:
    name, description_short (1 sentence), description_long (2 sentences), pricing_model (Freemium/Paid), primary_function (Design/Construction/Management).
    `;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            { 
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            }
        );
        const data = JSON.parse(response.data.candidates[0].content.parts[0].text);
        
        // Attach URL found by search
        data.website_url = topResult.link;
        data.id = toolName.toLowerCase().replace(/[^a-z0-9]/g, '_');
        
        return data;
    } catch (e) {
        return null;
    }
}

// --- MAIN LOOP ---
(async () => {
    const listQueries = [
        "best AI tools for architects 2025 list",
        "top generative design software architecture",
        "AI tools for construction documentation",
        "new AI rendering plugins Revit 2025"
    ];

    let foundNames = new Set();
    
    console.log("=== 🕵️  PHASE 1: SCANNING FOR NAMES ===");

    for (const q of listQueries) {
        console.log(`\n🔎 Query: "${q}"`);
        const results = await searchWeb(q);
        
        for (const item of results) {
            const names = await extractToolNames(item.snippet, item.title);
            
            if (names.length > 0) {
                // VISUAL FEEDBACK: Show names immediately!
                console.log(`   📄 [${item.title.substring(0, 20)}...] -> Found: ${names.join(", ")}`);
                names.forEach(n => foundNames.add(n));
            } else {
                process.stdout.write("."); // Little dot for "nothing found"
            }
            await sleep(500); // Fast scan
        }
    }

    const uniqueNames = Array.from(foundNames);
    console.log(`\n\n✨ TOTAL UNIQUE NAMES FOUND: ${uniqueNames.length}`);
    console.log(uniqueNames.join(", "));

    console.log(`\n=== 🤖 PHASE 2: ENRICHING DATA (${uniqueNames.length} items) ===`);
    
    let candidates = [];
    // Load existing to avoid re-doing work
    if (fs.existsSync('candidates.json')) candidates = JSON.parse(fs.readFileSync('candidates.json'));

    for (const name of uniqueNames) {
        // Double Check: Do we already have it?
        if (candidates.find(c => c.name.toLowerCase() === name.toLowerCase())) {
            console.log(`   ⏭️  Skipping existing: ${name}`);
            continue;
        }

        process.stdout.write(`   Fetching details for: ${name}... `);
        const details = await getToolDetails(name);
        
        if (details) {
            candidates.push(details);
            console.log(`✅ SAVED`);
        } else {
            console.log(`❌ FAILED`);
        }
        await sleep(1500); // Be nice to API
    }

    fs.writeFileSync('candidates.json', JSON.stringify(candidates, null, 2));
    console.log(`\n🎉 DONE! candidates.json updated.`);
})();