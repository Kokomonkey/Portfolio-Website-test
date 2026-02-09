const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const GROQ_KEY = process.env.GROQ_KEY;
const SERPER_KEY = process.env.SERPER_KEY;

// --- CONFIGURATION ---
const MODEL_NAME = "llama-3.3-70b-versatile"; // Powerful & Free on Groq

// 1. SEARCH (Serper)
async function searchWeb(query) {
    try {
        const response = await axios.post(
            'https://google.serper.dev/search',
            { q: query, num: 8 }, 
            { headers: { 'X-API-KEY': SERPER_KEY, 'Content-Type': 'application/json' } }
        );
        return response.data.organic || [];
    } catch (error) {
        console.error("❌ Serper Error:", error.message);
        return [];
    }
}

// 2. ASK GROQ (The new "Brain")
async function askGroq(prompt) {
    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: MODEL_NAME,
                messages: [{ role: "user", content: prompt }],
                temperature: 0.1 // Keep it factual
            },
            {
                headers: {
                    'Authorization': `Bearer ${GROQ_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        // Show the exact error if Groq fails
        console.error("❌ Groq Error:", error.response ? error.response.data : error.message);
        return null;
    }
}

// 3. PHASE 1: EXTRACT NAMES
async function extractToolNames(snippet, title) {
    const prompt = `
    Source: "${title}"
    Snippet: "${snippet}"

    Task: Identify specific AI software tools for architects mentioned here.
    Rules:
    1. Ignore general terms (AI, Machine Learning).
    2. Ignore generic company names (Adobe, Autodesk) unless a specific tool is named (Firefly, Forma).
    3. Output ONLY a comma-separated list of names.
    4. If none found, output: NONE
    `;

    const text = await askGroq(prompt);
    if (!text || text.includes("NONE")) return [];
    
    // Clean up the list
    return text.split(',')
        .map(s => s.trim().replace(/\.$/, '')) // Remove trailing dots
        .filter(s => s.length > 2);
}

// 4. PHASE 2: GET DETAILS
async function getToolDetails(toolName) {
    // Search specifically for this tool
    const searchResults = await searchWeb(`${toolName} AI architecture features pricing`);
    if (searchResults.length === 0) return null;

    const topResult = searchResults[0];

    const prompt = `
    Tool Name: "${toolName}"
    Website Info: "${topResult.link}" - "${topResult.snippet}"

    Task: Create a JSON object for this tool.
    Response must be ONLY valid JSON, no markdown.

    {
        "name": "${toolName}",
        "website_url": "${topResult.link}",
        "description_short": "Write a 1-sentence summary.",
        "description_long": "Write a 2-sentence description.",
        "pricing_model": "Freemium/Paid/Enterprise (Guess based on context)",
        "primary_function": "Design/Construction/Management"
    }
    `;

    const jsonText = await askGroq(prompt);
    
    try {
        // Groq sometimes adds "Here is the JSON:" text, we need to clean it
        const cleanJson = jsonText.substring(jsonText.indexOf('{'), jsonText.lastIndexOf('}') + 1);
        const data = JSON.parse(cleanJson);
        data.id = toolName.toLowerCase().replace(/[^a-z0-9]/g, '_');
        return data;
    } catch (e) {
        return null;
    }
}

// --- MAIN EXECUTION ---
(async () => {
    console.log(`🚀 Groq Scout initialized (${MODEL_NAME})`);
    
    if (!GROQ_KEY) {
        console.error("❌ MISSING GROQ_KEY in .env file!");
        process.exit(1);
    }

    const queries = [
        "best AI tools for architects 2025",
        "generative design software for building layouts",
        "AI construction administration software"
    ];

    let foundNames = new Set();

    // PHASE 1: Scan
    console.log("\n=== PHASE 1: Scanning for Tools ===");
    for (const q of queries) {
        process.stdout.write(`🔎 Searching "${q}"... `);
        const results = await searchWeb(q);
        
        for (const item of results) {
            const names = await extractToolNames(item.snippet, item.title);
            if (names.length > 0) {
                names.forEach(n => foundNames.add(n));
            }
        }
        console.log(`(Found ${foundNames.size} unique so far)`);
    }

    const uniqueNames = Array.from(foundNames);
    console.log(`\n📋 Final List: ${uniqueNames.join(", ")}`);

    // PHASE 2: Enrich
    console.log(`\n=== PHASE 2: Fetching Details ===");`);
    let candidates = [];
    if (fs.existsSync('candidates.json')) candidates = JSON.parse(fs.readFileSync('candidates.json'));

    for (const name of uniqueNames) {
        // Skip duplicates
        if (candidates.find(c => c.name.toLowerCase() === name.toLowerCase())) continue;

        process.stdout.write(`   Processing: ${name}... `);
        const details = await getToolDetails(name);
        
        if (details) {
            candidates.push(details);
            console.log("✅ Saved");
        } else {
            console.log("❌ Failed to parse");
        }
        // Small delay to be nice
        await new Promise(r => setTimeout(r, 1000));
    }

    fs.writeFileSync('candidates.json', JSON.stringify(candidates, null, 2));
    console.log(`\n🎉 Success! Saved ${candidates.length} candidates. Run 'node review_server.js' now.`);
})();