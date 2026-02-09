const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_KEY;
const SERPER_API_KEY = process.env.SERPER_KEY;

// 1. SEARCH
async function searchWeb(query) {
    console.log(`\n🔍 Searching: "${query}"...`);
    try {
        const response = await axios.post(
            'https://google.serper.dev/search',
            { q: query, num: 5 }, // 5 results is enough for testing
            { headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' } }
        );
        return response.data.organic || [];
    } catch (error) {
        console.error("❌ Serper Error:", error.message);
        return [];
    }
}

// 2. ANALYZE (Text Mode - No JSON Parser to break)
async function analyzeWithGemini(snippet, title, link) {
    // We ask for a simple pipe-separated string. easier for AI to generate.
    const prompt = `
    I am looking for AI software for architects.
    Title: "${title}"
    Snippet: "${snippet}"
    Link: "${link}"

    If this mentions a software tool, output its details in this EXACT format:
    NAME: [Tool Name]
    DESC: [1 sentence description]
    TYPE: [Category]
    
    If it is NOT a tool, output: "SKIP"
    `;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: prompt }] }] }
        );

        const text = response.data.candidates[0].content.parts[0].text.trim();
        
        // Debug Log
        // console.log(`   AI Said: ${text}`);

        if (text.includes("SKIP") || !text.includes("NAME:")) return null;

        // Manual Parsing (More robust than JSON.parse)
        const nameMatch = text.match(/NAME: (.*)/);
        const descMatch = text.match(/DESC: (.*)/);
        const typeMatch = text.match(/TYPE: (.*)/);

        if (nameMatch && nameMatch[1]) {
            return {
                id: nameMatch[1].toLowerCase().replace(/[^a-z0-9]/g, '_'),
                name: nameMatch[1].trim(),
                provider: "Unknown", // We can fill this later
                website_url: link,
                description_short: descMatch ? descMatch[1].trim() : "AI tool for architecture.",
                description_long: "Automatically discovered via web scout.",
                primary_function: typeMatch ? typeMatch[1].trim() : "CAD/BIM/Technical",
                pricing_model: "Freemium", // Default
                price_base_monthly: 0,
                pros: ["Automated Workflow", "Time Saving"],
                cons: ["Requires verification"],
                efficiency_text: "Automates manual tasks.",
                workflow_text: "General architecture workflow.",
                company_size_fit: ["Studio", "Firm"],
                benchmark_rating: 7
            };
        }
        return null;

    } catch (e) {
        return null;
    }
}

// 3. RUN
(async () => {
    // Specific Tool Names to guarantee hits
    const queries = [
        "TestFit architecture",
        "Veras AI rendering",
        "Swapp AI construction",
        "Finch 3D plans",
        "Hypar generative design",
        "UpCodes AI",
        "PromeAI design"
    ];

    let candidates = [];
    if (fs.existsSync('candidates.json')) candidates = JSON.parse(fs.readFileSync('candidates.json'));

    console.log("🚀 Starting Brute Force Scout...");

    for (const q of queries) {
        const results = await searchWeb(q);
        
        // Only look at the first result for these specific queries to save time
        if (results.length > 0) {
            const item = results[0]; 
            process.stdout.write(`   Checking: ${item.title.substring(0, 30)}... `);
            
            const data = await analyzeWithGemini(item.snippet, item.title, item.link);
            
            if (data) {
                // Avoid duplicates
                if (!candidates.find(c => c.name === data.name)) {
                    candidates.push(data);
                    console.log(`✅ CAPTURED: ${data.name}`);
                } else {
                    console.log(`(Duplicate)`);
                }
            } else {
                console.log(`(Skipped)`);
            }
            // Sleep 1s
            await new Promise(r => setTimeout(r, 1000));
        }
    }

    fs.writeFileSync('candidates.json', JSON.stringify(candidates, null, 2));
    console.log(`\n🎉 Done! Candidates saved: ${candidates.length}`);
    console.log("Run 'node review_server.js' to see them.");
})();