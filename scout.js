const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

// --- ⚙️ CONFIGURATION ---
const GROQ_KEY = process.env.GROQ_KEY;
const SERPER_KEY = process.env.SERPER_KEY;

// MODEL OPTIONS: 
// "llama-3.1-8b-instant" (Fast/Cheap)
// "mixtral-8x7b-32768" (Balanced)
// "llama3-70b-8192" (High Intelligence/Expensive)
const MODEL_NAME = "llama-3.1-8b-instant"; 

const FILES = {
    READY: './ready_names.json',
    CANDIDATES: './candidates.json',
    BLACKLIST: './blacklist.json'
};

// --- 🛠 HELPERS ---
// Replace the old loadJSON with this robust version:
const loadJSON = (file) => {
    if (!fs.existsSync(file)) return [];
    const content = fs.readFileSync(file, 'utf8').trim();
    if (!content) return []; // Return empty array if file is blank
    try {
        return JSON.parse(content);
    } catch (e) {
        console.error(`⚠️ Error parsing ${file}: ${e.message}. Starting with empty list.`);
        return [];
    }
};const saveJSON = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- 🔎 SEARCH ENGINES ---

async function searchWeb(query) {
    try {
        const response = await axios.post('https://google.serper.dev/search', 
            { q: query, num: 10 }, 
            { headers: { 'X-API-KEY': SERPER_KEY, 'Content-Type': 'application/json' } }
        );
        return response.data.organic || [];
    } catch (e) { return []; }
}

async function searchImages(query, count = 1) {
    try {
        const response = await axios.post('https://google.serper.dev/images', 
            { q: query, num: count }, 
            { headers: { 'X-API-KEY': SERPER_KEY, 'Content-Type': 'application/json' } }
        );
        return response.data.images?.map(img => img.imageUrl) || [];
    } catch (e) { return []; }
}

// --- 🧠 AI PROCESSING ---

async function askGroq(prompt) {
    if (!GROQ_KEY) { console.error("❌ Missing GROQ_KEY"); return null; }
    try {
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', 
            { 
                model: MODEL_NAME,
                messages: [{ role: "user", content: prompt }],
                temperature: 0.1 
            },
            { headers: { 'Authorization': `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' } }
        );
        return response.data.choices[0].message.content;
    } catch (e) { 
        console.error(`⚠️ Groq Error: ${e.response?.status || e.message}`);
        return null; 
    }
}

async function extractToolNames(snippet, category) {
    const prompt = `
    Context: Finding specialized AI architecture and AEC software for "${category}".
    Source text: "${snippet}"
    Task: Extract specific software names used strictly in architecture, design, or construction.
    Rules: 
    1. Comma-separated list only. 
    2. No generic terms (e.g., "AI", "CAD", "3D"). 
    3. Exclude non-architectural software (e.g., general CRM, gaming, medical, general IT).
    4. If none, return "NONE".`;
    
    const text = await askGroq(prompt);
    if (!text || text.includes("NONE")) return [];
    return text.split(',').map(s => s.trim().replace(/\.$/, '')).filter(s => s.length > 2);
}

// --- 🚀 PHASE 1: ENRICH KNOWN TOOLS ---

async function runPhase1() {
    console.log(`\n📦 PHASE 1: Enriching Ready List (${FILES.READY})...`);
    
    const readyList = loadJSON(FILES.READY);
    let candidates = loadJSON(FILES.CANDIDATES);
    let updates = 0;

    for (const item of readyList) {
        // Find if we already have this tool in candidates
        let candIdx = candidates.findIndex(c => c.name.toLowerCase() === item.name.toLowerCase());
        let candidate = candIdx > -1 ? candidates[candIdx] : null;

        // Check what's missing
        const missingLogo = !candidate || !candidate.logo_url;
        const missingScreenshots = !candidate || !candidate.image_urls || candidate.image_urls.length < 2;

        if (missingLogo || missingScreenshots) {
            process.stdout.write(`   ⚙️  Processing: ${item.name}... `);
            
            // If completely new, init object
            if (!candidate) {
                candidate = { 
                    name: item.name, 
                    suggested_category: "Backlog", 
                    website_url: "", 
                    logo_url: "", 
                    image_urls: [] 
                };
            }

            // Fetch Missing Data
            if (missingLogo) {
                const logos = await searchImages(`${item.name} architecture AEC software logo transparent OR icon`, 1);
                if (logos.length) candidate.logo_url = logos[0];
            }

            if (missingScreenshots) {
                // Ensure we have array
                if(!candidate.image_urls) candidate.image_urls = [];
                const needed = 2 - candidate.image_urls.length;
                const screens = await searchImages(`${item.name} architecture software UI OR BIM interface screenshot`, needed);
                candidate.image_urls = [...candidate.image_urls, ...screens];
            }

            // Save back to list
            if (candIdx > -1) candidates[candIdx] = candidate;
            else candidates.push(candidate);
            
            updates++;
            process.stdout.write("✅ Updated\n");
            
            // Rate limit safety
            await sleep(1000);
        }
    }
    
    if (updates > 0) {
        saveJSON(FILES.CANDIDATES, candidates);
        console.log(`✨ Phase 1 Complete. Updated ${updates} tools.`);
    } else {
        console.log("✨ Phase 1 Complete. No updates needed.");
    }
}

// --- 🌍 PHASE 2: DISCOVERY (Expensive) ---

async function runPhase2() {
    console.log(`\n🌍 PHASE 2: Broad AI Discovery...`);
    
    const searchMap = [
        { cat: "Image Generation", q: `Best new AI architecture rendering tools 2025` },
        { cat: "Floorplan Colouring", q: `AI tool convert CAD to colored floor plan` },
        { cat: "Cost Estimation", q: `AI construction estimation software automation` },
        { cat: "Code Compliance", q: `AI automated building code checking software` }
    ];

    let candidates = loadJSON(FILES.CANDIDATES);
    const blacklist = loadJSON(FILES.BLACKLIST);
    let found = 0;

    for (const searchItem of searchMap) {
        console.log(`\n🔎 Scanning: [${searchItem.cat}]`);
        const results = await searchWeb(searchItem.q);

        for (const res of results) {
            // Is this URL blacklisted?
            if (blacklist.includes(res.link)) continue;

            const names = await extractToolNames(res.snippet, searchItem.cat);
            
            for (const n of names) {
                // Check if known (in candidates OR ready list)
                const isKnown = candidates.some(c => c.name.toLowerCase() === n.toLowerCase());
                
                if (!isKnown) {
                    process.stdout.write(`   + Discovered: ${n} `);
                    
                    // Fetch Basics Immediately
                    const logo = await searchImages(`${n} architecture AI software logo small`, 1);
                    const screens = await searchImages(`${n} architecture AI software logo small`, 2);
                    
                    candidates.push({
                        name: n,
                        website_url: res.link,
                        logo_url: logo[0] || "",
                        image_urls: screens,
                        suggested_category: searchItem.cat,
                        snippet: res.snippet
                    });
                    
                    found++;
                    console.log("✅");
                }
            }
            // Save periodically
            saveJSON(FILES.CANDIDATES, candidates);
        }
    }
    console.log(`\n🎉 Discovery finished. Found ${found} new tools.`);
}

// --- 🏁 MAIN EXECUTION ---
(async () => {
    // ALWAYS run Phase 1 (Cheap, fills gaps in known list)
    await runPhase1();

    // OPTIONAL: Run Phase 2 (Costly, finds new stuff)
    // Uncomment the line below when you are ready to spend API credits
    // await runPhase2(); 
})();