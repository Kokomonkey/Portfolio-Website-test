const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const vm = require('vm');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// --- 🛠 HELPER FUNCTIONS ---

// 1. Safely load JSON files (Crash-proof)
const loadJSON = (file) => {
    if (!fs.existsSync(file)) return [];
    const content = fs.readFileSync(file, 'utf8').trim();
    if (!content) return [];
    try {
        return JSON.parse(content);
    } catch (e) {
        console.error(`⚠️ Error parsing ${file}: ${e.message}`);
        return [];
    }
};

// 2. Safely load workflow.js (Node VM approach)
const loadWorkflow = () => {
    const wfPath = path.join(__dirname, 'workflow.js');
    if (!fs.existsSync(wfPath)) return [];
    
    try {
        const content = fs.readFileSync(wfPath, 'utf8');
        
        // Create a fake "browser" environment so the script doesn't crash
        const sandbox = { 
            window: {}, 
            module: {} 
        };
        
        vm.createContext(sandbox);
        vm.runInContext(content, sandbox);
        
        // Grab the data from either window or module.exports
        const extractedData = sandbox.window.workflowData || sandbox.module.exports || [];
        
        // Optional: Log it once so you know it worked!
        if (extractedData.length > 0 && !global.loggedWorkflow) {
            console.log(`✅ Loaded ${extractedData.length} workflow phases successfully.`);
            global.loggedWorkflow = true; 
        }
        
        return extractedData;
    } catch (e) {
        console.error("⚠️ Error loading workflow.js:", e.message);
        return [];
    }
};

// Data Loading
let candidates = loadJSON('candidates.json');
let whitelist = loadJSON('whitelist.json');
let blacklist = loadJSON('blacklist.json');

// --- ⚙️ CONFIGURATION OPTIONS ---

const CATEGORIES = [
    "Image Generation", "Floorplan Colouring", "Detail Creation", "Rendering",
    "Legalities", "Site Analysis", "Cost Estimation", "Material Selection",
    "3D Modeling", "Energy Analysis", "Scheduling", "Scripting", 
    "Management", "Data Interpretation", "Bidding/Finance"
];

const INPUT_TYPES = [
    "3D Model", "Docs", "Text", "Data", "2D", "Image", "Audio", "Video", "Code", "Universal"
];

const OUTPUT_TYPES = [
    "Docs", "Data", "3D Model", "2D", "Image", "Text", "Code", "Video", "Render", "Universal"
];

const PRICE_TYPES = [
    "Subscription", "Freemium", "Enterprise", "Free", "One-time", "Credit-based"
];

// --- 🚀 SERVER ROUTES ---

app.get('/', (req, res) => {
    // Reload data on every refresh to stay synced
    candidates = loadJSON('candidates.json');
    whitelist = loadJSON('whitelist.json');
    blacklist = loadJSON('blacklist.json');
    const workflow = loadWorkflow(); // Refresh workflow too

    const total = candidates.length + whitelist.length + blacklist.length;
    const processed = whitelist.length + blacklist.length;
    const progressPct = total === 0 ? 0 : Math.round((processed / total) * 100);

    // Completion Screen
    if (candidates.length === 0) {
        return res.send(`
            <body style="background:#121212; color:white; font-family:sans-serif; display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh;">
                <h1 style="color:#4caf50;">🎉 Mission Complete!</h1>
                <p>All found tools have been reviewed.</p>
                <p>Run <code>node merge.js</code> to update your database.</p>
            </body>
        `);
    }
    
    const c = candidates[0];
    const images = c.image_urls || ["", ""]; // Ensure array exists

    // Helper: Generate Options
    const genOptions = (arr, selected) => arr.map(item => `<option value="${item}" ${selected === item ? 'selected' : ''}>${item}</option>`).join('');
    
    // Helper: Generate Workflow Phase Options
    let taskOptions = '<option value="">-- Select Workflow Phase --</option>';
    if(workflow.length > 0) {
        workflow.forEach((phase, pIdx) => {
            phase.tasks.forEach((task, tIdx) => {
                taskOptions += `<option value="${pIdx},${tIdx}">${phase.title} ➤ ${task.title}</option>`;
            });
        });
    } else {
        taskOptions = '<option value="0,0">Default Phase</option>';
    }

    // Render Dashboard
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>ArchScout Review</title>
            <style>
                :root { --bg: #121212; --card: #1e1e1e; --input: #2d2d2d; --text: #e0e0e0; --accent: #64b5f6; }
                body { background: var(--bg); color: var(--text); font-family: 'Segoe UI', sans-serif; padding: 20px; display: flex; flex-direction: column; align-items: center; }
                
                .container { display: grid; grid-template-columns: 1fr 2fr; gap: 20px; max-width: 1400px; width: 100%; }
                .card { background: var(--card); padding: 25px; border-radius: 12px; border: 1px solid #333; }
                
                h2 { margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 10px; color: var(--accent); font-size: 1.2rem; }
                label { display: block; margin-top: 15px; font-size: 0.75rem; color: #888; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; }
                
                input, textarea, select { width: 100%; background: var(--input); border: 1px solid #444; color: white; padding: 10px; border-radius: 6px; margin-top: 5px; font-family: inherit; box-sizing: border-box; font-size: 0.9rem; }
                input:focus, textarea:focus, select:focus { border-color: var(--accent); outline: none; }
                
                .row { display: flex; gap: 15px; }
                .col { flex: 1; }
                
                .actions { margin-top: 30px; display: flex; gap: 15px; }
                button { flex: 1; padding: 15px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; color: white; text-transform: uppercase; letter-spacing: 1px; }
                .approve { background: #4caf50; } .approve:hover { background: #45a049; }
                .reject { background: #f44336; } .reject:hover { background: #d32f2f; }
                
                .logo-preview { width: 100%; max-height: 80px; object-fit: contain; background: white; padding: 10px; border-radius: 6px; margin-bottom: 20px; box-sizing: border-box; }
                
                /* Progress Bar */
                .progress-container { width: 100%; max-width: 1400px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; font-size: 0.8rem; color: #888; }
                .progress-bar { width: 100%; max-width: 1400px; height: 6px; background: #333; margin-bottom: 25px; border-radius: 3px; overflow: hidden; }
                .fill { height: 100%; background: var(--accent); width: ${progressPct}%; border-radius: 3px; transition: width 0.3s; }
                
                .img-preview { width: 100%; height: 100px; object-fit: cover; border: 1px solid #444; margin-top: 8px; border-radius: 4px; background: #000; }
                .raw-box { background:#111; padding:15px; border-radius:6px; font-size:0.9rem; line-height:1.5; color:#ccc; max-height:400px; overflow-y:auto; border: 1px solid #333; }
                .section-header { margin-top: 25px; margin-bottom: 10px; font-weight: bold; color: #fff; border-bottom: 1px solid #333; padding-bottom: 5px; }
            </style>
        </head>
        <body>
            <div class="progress-container">
                <span>Reviewing: <strong>${c.name}</strong></span>
                <span>${processed} / ${total}</span>
            </div>
            <div class="progress-bar"><div class="fill"></div></div>

            <div class="container">
                <div class="card">
                    <h2>🔍 Extracted Data</h2>
                    ${c.logo_url ? `<img src="${c.logo_url}" class="logo-preview">` : ''}
                    <a href="${c.website_url}" target="_blank" style="display:block; text-align:center; background:#333; color:white; padding:10px; text-decoration:none; border-radius:4px; margin-bottom:15px; font-weight:bold;">🔗 Open Website</a>
                    
                    <label>Raw Snippet</label>
                    <div class="raw-box">
                        ${c.snippet || c.description_long || "No description found."}
                    </div>
                    
                    <label>Discovery Category</label>
                    <div style="color:var(--accent); font-weight:bold; margin-top:5px;">${c.suggested_category}</div>
                </div>

                <div class="card">
                    <form action="/decide" method="POST">
    <h2>✏️ Edit & Verify</h2>
    <input type="hidden" name="id" value="${c.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}">

    <div class="row">
        <div class="col">
            <label>Tool Name</label>
            <input type="text" name="name" value="${c.name}">
        </div>
        <div class="col">
            <label>Provider / Company</label>
            <input type="text" name="provider" value="${c.provider || ''}">
        </div>
    </div>

    <div class="row">
        <div class="col">
            <label>Website URL</label>
            <input type="text" name="website_url" value="${c.website_url}">
        </div>
        <div class="col">
            <label>Logo URL</label>
            <input type="text" name="logo_url" value="${c.logo_url || ''}">
        </div>
    </div>

    <div class="section-header">📸 Workflow Images</div>
                        <div class="section-header">📸 Workflow Images</div>
                        <div class="row">
                            <div class="col">
                                <label>Screenshot 1 URL</label>
                                <input type="text" name="image_url_1" value="${images[0] || ''}">
                                ${images[0] ? `<img src="${images[0]}" class="img-preview">` : ''}
                            </div>
                            <div class="col">
                                <label>Screenshot 2 URL</label>
                                <input type="text" name="image_url_2" value="${images[1] || ''}">
                                ${images[1] ? `<img src="${images[1]}" class="img-preview">` : ''}
                            </div>
                        </div>

                        <div class="section-header">📊 Classification</div>
                        <div class="row">
                            <div class="col">
                                <label>Primary Function</label>
                                <select name="primary_function">
                                    ${genOptions(CATEGORIES, c.suggested_category)}
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div class="col">
                                <label style="color:var(--accent);">Benchmark Rating (0-10)</label>
                                <input type="number" name="benchmark_rating" step="0.5" min="0" max="10" value="7">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <label>Input Type</label>
                                <select name="input_type">
                                    ${genOptions(INPUT_TYPES, 'Text')}
                                </select>
                            </div>
                            <div class="col">
                                <label>Output Type</label>
                                <select name="output_type">
                                    ${genOptions(OUTPUT_TYPES, 'Data')}
                                </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <label>Pricing Model</label>
                                <select name="pricing_model">
                                    ${genOptions(PRICE_TYPES, 'Subscription')}
                                </select>
                            </div>
                            <div class="col">
                                <label>Monthly Cost ($)</label>
                                <input type="number" name="price_amount" placeholder="e.g. 20" value="0">
                            </div>
                        </div>

                        <div class="section-header">📝 Details</div>
                        <label>Short Pitch (One liner)</label>
                        <input type="text" name="description_short" placeholder="e.g. Automates zoning analysis via NLP" value="">

                        <label>Long Description</label>
                        <textarea name="description_long" rows="4" placeholder="Detailed explanation of features...">${c.description_long || c.snippet || ""}</textarea>

                        <div class="row">
                            <div class="col">
                                <label>Pros (One per line)</label>
                                <textarea name="pros" rows="3"></textarea>
                            </div>
                            <div class="col">
                                <label>Cons (One per line)</label>
                                <textarea name="cons" rows="3"></textarea>
                            </div>
                        </div>

                        <div style="background:#252525; padding:15px; border:1px solid var(--accent); border-radius:6px; margin-top:25px;">
                            <label style="color:var(--accent); margin-top:0;">➤ Assign to Workflow Phase (Required)</label>
                            <select name="workflow_target" required style="border: 1px solid #555; background:#111;">
                                ${taskOptions}
                            </select>
                        </div>

                        <div class="actions">
                            <button type="submit" name="decision" value="approve" class="approve">✅ Save to Database</button>
                            <button type="submit" name="decision" value="reject" class="reject">❌ Reject & Skip</button>
                        </div>
                    </form>
                </div>
            </div>
        </body>
        </html>
    `);
});

// --- 💾 SAVE HANDLER ---

app.post('/decide', (req, res) => {
    const decision = req.body.decision;
    const oldCandidate = candidates.shift(); // Remove current item from queue

    if (decision === 'approve') {
        console.log(`\n💾 Saving: ${req.body.name}`);
        
        // Parse Workflow Target
        let pIdx = 0, tIdx = 0;
        if(req.body.workflow_target) {
            [pIdx, tIdx] = req.body.workflow_target.split(',').map(Number);
        }
        
        // Parse Lists
        const prosArray = req.body.pros ? req.body.pros.split('\r\n').filter(x => x.trim().length > 0) : [];
        const consArray = req.body.cons ? req.body.cons.split('\r\n').filter(x => x.trim().length > 0) : [];

        // Construct Database Object
        const approvedItem = {
            id: req.body.id,
            name: req.body.name,
            provider: req.body.provider,
            website_url: req.body.website_url,
            logo_url: req.body.logo_url,
            
            // Images (Ensure these are captured)
            image_url_1: req.body.image_url_1,
            image_url_2: req.body.image_url_2,
            
            // Text
            description_short: req.body.description_short,
            description_long: req.body.description_long,
            
            // Classification
            primary_function: req.body.primary_function,
            integration_type: "Service", 
            
            // I/O
            input_type: req.body.input_type,
            output_type: req.body.output_type,

            // Pricing
            pricing_model: req.body.pricing_model,
            price_base_monthly: parseFloat(req.body.price_amount) || 0,
            usage_limit_per_month: -1, 

            // Fit & Rating
            company_size_fit: ["Studio", "Firm"], 
            benchmark_rating: parseFloat(req.body.benchmark_rating) || 5,
            
            pros: prosArray,
            cons: consArray,
            
            efficiency_text: "Standard efficiency.", 
            workflow_text: "Standard workflow.",   
            
            // Internal use for merge.js
            workflow_target: { phaseIndex: pIdx, taskIndex: tIdx }
        };

        whitelist.push(approvedItem);
        fs.writeFileSync('whitelist.json', JSON.stringify(whitelist, null, 2));
        console.log(`✅ Approved and Saved!`);
    } else {
        // Blacklist logic
        blacklist.push(oldCandidate.website_url);
        fs.writeFileSync('blacklist.json', JSON.stringify(blacklist, null, 2));
        console.log(`❌ Rejected: ${oldCandidate.name}`);
    }

    // Update Queue
    fs.writeFileSync('candidates.json', JSON.stringify(candidates, null, 2));
    
    // Redirect to load next item
    res.redirect('/');
});

// --- START SERVER ---
app.listen(3001, () => {
    console.log('\n🌌 Review Server Active');
    console.log('👉 http://localhost:3001');
});