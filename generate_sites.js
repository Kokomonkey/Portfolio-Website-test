const fs = require('fs');
const path = require('path');

// 1. Read the database.js file
const dbPath = path.join(__dirname, 'database.js');
let dbContent = fs.readFileSync(dbPath, 'utf8');

// 2. Extract the JSON array from the file content
const cleanedContent = dbContent.replace(/window\.aiDatabase\s*=\s*/, '').trim();

// 3. Parse the Database
let aiDatabase;
try {
    // Determine where the array ends (handling the trailing semicolon)
    const end = cleanedContent.lastIndexOf('];');
    const validJsonString = end > -1 ? cleanedContent.substring(0, end + 1) : cleanedContent;
    
    // Using eval to parse the JS array (ensure database.js is trusted code)
    aiDatabase = eval(validJsonString);
} catch (e) {
    console.error("Error parsing database.js. Make sure it is valid Javascript array syntax.");
    console.error(e);
    process.exit(1);
}

// 4. Create Output Directory
const outputDir = path.join(__dirname, 'pages', 'ais');
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

// 5. HTML Template Function (Unchanged)
const generateHTML = (ai) => {
    // Fix image path logic
    const logoPath = ai.logo_url ? `../../${ai.logo_url}` : '../../Recourses/Logos/DDD.jpg';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${ai.name} | AI Analysis</title>
    <link rel="icon" type="image/png" href="../../Recourses/Logos/DDD.jpg">
    <style>
        :root {
            --bg-color: #000000;
            --accent-color: #ffffff;
            --dim-color: #333;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            background-color: var(--bg-color);
            color: var(--accent-color);
            font-family: 'Courier New', Courier, monospace;
            padding: 40px;
            display: flex;
            justify-content: center;
        }
        .container { max-width: 1000px; width: 100%; }
        
        /* Nav */
        .back-link {
            display: inline-block;
            margin-bottom: 40px;
            color: var(--accent-color);
            text-decoration: none;
            border: 1px solid var(--accent-color);
            padding: 10px 20px;
            text-transform: uppercase;
            font-weight: bold;
            transition: all 0.3s;
        }
        .back-link:hover { background: var(--accent-color); color: var(--bg-color); }

        /* Header */
        header { 
            border-bottom: 2px solid var(--accent-color); 
            padding-bottom: 20px; 
            margin-bottom: 40px; 
            display: flex; justify-content: space-between; align-items: flex-end;
        }
        h1 { font-size: 3rem; text-transform: uppercase; line-height: 1; }
        .provider { font-size: 1.2rem; color: #888; text-transform: uppercase; }

        /* Layout */
        .grid { display: grid; grid-template-columns: 1fr 2fr; gap: 40px; }

        /* Left Column */
        .info-card { 
            background: #111; 
            padding: 20px; 
            border: 1px solid var(--dim-color);
            display: flex; flex-direction: column; gap: 20px;
        }
        .logo-box { 
            width: 100%; aspect-ratio: 1; 
            background: #000; border: 1px solid #333;
            display: flex; justify-content: center; align-items: center;
        }
        .logo-box img { max-width: 80%; max-height: 80%; }
        
        .stat-row { display: flex; justify-content: space-between; border-bottom: 1px solid #333; padding-bottom: 5px; }
        .stat-label { color: #888; font-size: 0.8rem; text-transform: uppercase; }
        .stat-val { font-weight: bold; text-align: right; }

        .btn-visit {
            display: block; width: 100%; text-align: center;
            background: var(--accent-color); color: var(--bg-color);
            padding: 15px; text-decoration: none; font-weight: bold; text-transform: uppercase;
            margin-top: 10px;
            transition: opacity 0.3s;
        }
        .btn-visit:hover { opacity: 0.8; }

        /* Right Column */
        .content { line-height: 1.6; }
        .tag { 
            display: inline-block; background: #222; color: #ddd; 
            padding: 5px 10px; font-size: 0.8rem; margin-right: 5px; margin-bottom: 10px;
            border: 1px solid #444;
        }
        h2 { margin-top: 30px; margin-bottom: 15px; border-bottom: 1px solid #333; display: inline-block; }
        
        ul { margin-left: 20px; margin-bottom: 20px; }
        li { margin-bottom: 5px; color: #ccc; }

        @media(max-width: 768px) {
            .grid { grid-template-columns: 1fr; }
            h1 { font-size: 2rem; }
            body { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="../../index.html" class="back-link">← Back to Dashboard</a>

        <header>
            <div>
                <div class="provider">${ai.provider || 'Unknown Provider'}</div>
                <h1>${ai.name}</h1>
            </div>
            <div style="text-align:right">
                <span class="tag">${ai.primary_function || 'General'}</span>
            </div>
        </header>

        <div class="grid">
            <div class="info-card">
                <div class="logo-box">
                    <img src="${logoPath}" alt="${ai.name}" onerror="this.style.display='none'">
                </div>
                
                <div class="stats">
                    <div class="stat-row"><span class="stat-label">Price Model</span> <span class="stat-val">${ai.pricing_model || 'N/A'}</span></div>
                    <div class="stat-row" style="margin-top:10px;"><span class="stat-label">Monthly Cost</span> <span class="stat-val">$${ai.price_base_monthly || 0}</span></div>
                    <div class="stat-row" style="margin-top:10px;"><span class="stat-label">Benchmark</span> <span class="stat-val">${ai.benchmark_rating || '?'}/10</span></div>
                </div>

                <a href="${ai.website_url}" target="_blank" class="btn-visit">Visit Website ↗</a>
            </div>

            <div class="content">
                <p style="font-size: 1.2rem; font-weight: bold; margin-bottom: 20px;">
                    ${ai.description_short || ''}
                </p>
                <p style="margin-bottom: 30px; color: #bbb;">
                    ${ai.description_long || ''}
                </p>

                <h2>Workflow Integration</h2>
                <p>${ai.workflow_text || 'No workflow data.'}</p>
                <p style="margin-top:10px; color: #88ff88;"><em>Efficiency: ${ai.efficiency_text || 'N/A'}</em></p>

                <h2>Analysis</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <h3 style="color:#88ff88; font-size: 0.9rem; text-transform:uppercase; margin-bottom:10px;">Pros</h3>
                        <ul>
                            ${ai.pros ? ai.pros.map(p => `<li>${p}</li>`).join('') : '<li>N/A</li>'}
                        </ul>
                    </div>
                    <div>
                        <h3 style="color:#ff8888; font-size: 0.9rem; text-transform:uppercase; margin-bottom:10px;">Cons</h3>
                        <ul>
                            ${ai.cons ? ai.cons.map(c => `<li>${c}</li>`).join('') : '<li>N/A</li>'}
                        </ul>
                    </div>
                </div>

                <h2>Fit For</h2>
                <div>
                    ${ai.company_size_fit ? ai.company_size_fit.map(size => `<span class="tag" style="background:#333; border:none;">${size}</span>`).join('') : ''}
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
};

// 6. Generate Files (The "Smart Loop")
console.log(`\n--- 🏭 Site Generator Started ---`);
console.log(`Processing ${aiDatabase.length} entries...\n`);

let stats = { added: 0, updated: 0, skipped: 0 };

aiDatabase.forEach(ai => {
    if(!ai.id) return;
    
    const fileName = `${ai.id}.html`;
    const filePath = path.join(outputDir, fileName);
    
    // 1. Generate the content in memory first
    const newHtmlContent = generateHTML(ai);
    
    // 2. Check if file exists
    if (fs.existsSync(filePath)) {
        // 3. Read existing file to compare
        const existingContent = fs.readFileSync(filePath, 'utf8');
        
        if (existingContent !== newHtmlContent) {
            // 4. Update (Replace) if content is different
            fs.writeFileSync(filePath, newHtmlContent);
            console.log(`[UPDATED] ${fileName}`);
            stats.updated++;
        } else {
            // 5. Skip if identical
            // console.log(`[CHECKED] ${fileName} (No changes)`); // Uncomment to see all checks
            stats.skipped++;
        }
    } else {
        // 6. Add if it doesn't exist
        fs.writeFileSync(filePath, newHtmlContent);
        console.log(`[ ADDED ] ${fileName}`);
        stats.added++;
    }
});

console.log(`\n--- 🎉 Generation Complete ---`);
console.log(`Added: ${stats.added} | Updated: ${stats.updated} | Checked & Skipped: ${stats.skipped}\n`);