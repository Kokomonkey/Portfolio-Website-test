const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const GROQ_KEY = process.env.GROQ_KEY;
const SERPER_KEY = process.env.SERPER_KEY;

// 1. DYNAMIC MODEL SELECTOR
const MODEL_NAME = "llama-3.1-8b-instant"; 

// 📅 DYNAMIC DATE HELPER
const currentYear = new Date().getFullYear();

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

async function searchLogo(toolName) {
    try {
        const response = await axios.post(
            'https://google.serper.dev/images',
            { q: `${toolName} software logo small png`, num: 1 }, 
            { headers: { 'X-API-KEY': SERPER_KEY, 'Content-Type': 'application/json' } }
        );
        return response.data.images?.[0]?.imageUrl || "https://via.placeholder.com/150?text=No+Logo";
    } catch (error) {
        // console.error(`⚠️ Could not fetch logo for ${toolName}`); // Silence error to keep console clean
        return "https://via.placeholder.com/150?text=Error";
    }
}

async function askGroq(prompt) {
    const url = 'https://api.groq.com/openai/v1/chat/completions';
    try {
        const response = await axios.post(
            url, 
            { 
                model: MODEL_NAME,
                messages: [
                    { role: "system", content: "You are a precise data extraction assistant." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.1 
            },
            { headers: { 'Authorization': `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' } }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error(`❌ AI Error:`, error.message);
        return null;
    }
}

async function extractToolNames(snippet, title, category) {
    const prompt = `
    Context: We are looking for AI tools specifically for: "${category}".
    Source: "${title}" - "${snippet}"
    
    Task: Extract specific software names found here.
    Rules:
    1. Return strictly a Comma-separated list.
    2. Exclude generic terms (e.g. "ChatGPT" unless used for this specific code task, "BIM", "CAD").
    3. If none, return "NONE".
    `;
    
    const text = await askGroq(prompt);
    if (!text || text.includes("NONE")) return [];
    
    return text.split(',').map(s => s.trim().replace(/\.$/, '')).filter(s => s.length > 2);
}

// MAIN LOOP
(async () => {
    console.log(`🚀 Scout initialized for ${currentYear}`);
    
    // 🔎 12 SPECIFIC ARCHITECTURAL SEARCH CATEGORIES
    const searchMap = [
        { cat: "Image Generation", q: `Best AI architecture image generators comparison ${currentYear}` },
        { cat: "Floorplan Colouring", q: `AI tool convert CAD to colored floor plan zoning` },
        { cat: "Detail Creation", q: `AI generative construction details 1:5 scale software` },
        { cat: "Rendering", q: `Best AI architecture rendering software vs Lumion Enscape` },
        { cat: "Legalities", q: `AI software for checking zoning codes and building regulations NLP` },
        { cat: "Site Analysis", q: `AI site analysis tools GIS wind solar visualization` },
        { cat: "Cost Estimation", q: `AI construction cost estimation software BIM volume calculation` },
        { cat: "Material Selection", q: `AI tool for building material selection carbon footprint` },
        { cat: "3D Modeling", q: `Text to 3D model generation for architecture topology` },
        { cat: "Energy Analysis", q: `AI tool for rapid building thermal simulation energy analysis` },
        { cat: "Scheduling", q: `Generative construction project scheduling software AI` },
        { cat: "Scripting", q: `AI coding assistant for Grasshopper Rhino Python C#` }
    ];

    let foundCount = 0;

    for (const searchItem of searchMap) {
        console.log(`\n🔎 Scanning Category: [${searchItem.cat}]...`);
        const results = await searchWeb(searchItem.q);
        
        for (const item of results) {
            const names = await extractToolNames(item.snippet, item.title, searchItem.cat);
            
            if (names.length > 0) {
                let current = [];
                if (fs.existsSync('candidates.json')) current = JSON.parse(fs.readFileSync('candidates.json'));
                
                for (const n of names) {
                    // Check existence
                    const exists = current.find(c => c.name.toLowerCase() === n.toLowerCase());
                    
                    if (!exists) {
                        process.stdout.write(`   Found: ${n} `);
                        const logoUrl = await searchLogo(n);
                        console.log("✅");

                        current.push({ 
                            name: n, 
                            website_url: item.link,
                            logo_url: logoUrl,
                            suggested_category: searchItem.cat // 🆕 Save the category we found it in
                        });
                    }
                }
                
                fs.writeFileSync('candidates.json', JSON.stringify(current, null, 2));
                foundCount += names.length;
            } else {
                process.stdout.write("."); 
            }
        }
    }
    
    if (foundCount === 0) console.log("\n\n⚠️ No tools found. Check API keys.");
})();