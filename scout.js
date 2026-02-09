const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

// CONFIG
const GEMINI_API_KEY = process.env.GEMINI_KEY;
const SERPER_API_KEY = process.env.SERPER_KEY;

// 1. SEARCH FUNCTION
async function searchWeb(query) {
    console.log(`🔍 Searching for: "${query}"...`);
    try {
        const response = await axios.post(
            'https://google.serper.dev/search',
            { q: query, num: 10 }, 
            { headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' } }
        );
        return response.data.organic || [];
    } catch (error) {
        console.error("❌ Search Error:", error.message);
        return [];
    }
}

// 2. GEMINI ANALYZER (Improved Prompt)
async function analyzeWithGemini(snippet, title, link) {
    const prompt = `
    Analyze this search result to see if it mentions a specific AI software for architecture, construction, or design.
    
    Search Result Title: "${title}"
    Snippet: "${snippet}"
    Link: "${link}"

    INSTRUCTIONS:
    1. If this is a specific tool's homepage, extract its data.
    2. If this is a "Top 10" list or blog post, LOOK AT THE SNIPPET. If the snippet mentions a specific tool name (e.g., "Tool X is great for..."), extract data for THAT tool.
    3. If no specific software is mentioned, return "null".

    Strictly use this JSON schema:
    {
        "id": "snake_case_name",
        "name": "Tool Name",
        "provider": "Company Name (guess if unknown)",
        "website_url": "The link to the tool (use ${link} if it looks like the homepage, otherwise leave empty string)",
        "description_short": "One sentence summary.",
        "description_long": "Two sentence detailed description.",
        "primary_function": "One of: Image/Video Gen, CAD/BIM/Technical, Data Interpretation, Management, Reality Capture, Bidding/Finance",
        "pricing_model": "Subscription, Freemium, or Enterprise",
        "price_base_monthly": 0,
        "pros": ["Pro 1", "Pro 2"],
        "cons": ["Con 1", "Con 2"],
        "efficiency_text": "Short claim about speed/savings.",
        "workflow_text": "Short text on how it fits into workflow.",
        "company_size_fit": ["Studio", "Firm"], 
        "benchmark_rating": 7
    }

    Return ONLY raw JSON. No markdown.
    `;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: prompt }] }] }
        );
        
        let text = response.data.candidates[0].content.parts[0].text;
        // Clean up markdown if Gemini adds it
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        if (text.toLowerCase().includes("null")) return null;
        
        return JSON.parse(text);
    } catch (e) {
        return null; // Fail silently to keep logs clean
    }
}

// 3. MAIN EXECUTION
(async () => {
    // 1. TARGETED QUERIES (The Secret Sauce)
    // We break the workflow down into specific search terms to find niche tools.
    const queries = [
        // Pre-Design
        "AI tool for architectural zoning analysis",
        "AI site feasibility software architecture",
        "Generative design software for floor plans",
        
        // Design & Visualization
        "Best AI rendering software for architects 2024 2025",
        "Text to BIM AI software",
        "AI plugin for Revit 2025",
        
        // Construction Docs
        "Automated construction specification AI",
        "AI code compliance checker for building permits",
        
        // Bidding & Admin
        "AI construction estimating software",
        "AI bid leveling software construction",
        "AI construction schedule optimizer",
        "AI submittal review software"
    ];

    let blacklist = [];
    if (fs.existsSync('blacklist.json')) blacklist = JSON.parse(fs.readFileSync('blacklist.json'));
    
    // Load existing candidates so we don't duplicate
    let candidates = [];
    if (fs.existsSync('candidates.json')) candidates = JSON.parse(fs.readFileSync('candidates.json'));

    console.log(`🚀 Starting Scout with ${queries.length} targeted queries...`);

    for (const q of queries) {
        const results = await searchWeb(q);
        
        for (const item of results) {
            // Skip if we already have it or banned it
            if (blacklist.includes(item.link)) continue;
            if (candidates.find(c => c.website_url === item.link)) continue;

            // Log activity
            process.stdout.write(`   Analyzing: ${item.title.substring(0, 40)}... `);
            
            const aiData = await analyzeWithGemini(item.snippet, item.title, item.link);
            
            if (aiData && aiData.name) {
                // Deduplicate by name (in case different URL found same tool)
                if (!candidates.find(c => c.name === aiData.name)) {
                    candidates.push(aiData);
                    console.log(`✅ FOUND: ${aiData.name}`);
                } else {
                    console.log(`(Duplicate)`);
                }
            } else {
                console.log(`(Skipped)`);
            }
            
            // 1 second delay to respect API rate limits
            await new Promise(r => setTimeout(r, 1000));
        }
    }

    fs.writeFileSync('candidates.json', JSON.stringify(candidates, null, 2));
    console.log(`\n🎉 Done! Total candidates found: ${candidates.length}`);
    console.log("Run 'node review_server.js' to process them.");
})();