const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

const loadJSON = (file) => fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
const workflowPath = path.join(__dirname, '.\workflow.js');

let candidates = loadJSON('candidates.json');
let whitelist = loadJSON('whitelist.json');
let blacklist = loadJSON('blacklist.json');
let workflow = fs.existsSync(workflowPath) ? require(workflowPath) : [];

// 2. THE DASHBOARD INTERFACE
app.get('/', (req, res) => {
    candidates = loadJSON('candidates.json');
    whitelist = loadJSON('whitelist.json'); // Reload to ensure counts are accurate
    blacklist = loadJSON('blacklist.json');

    // 📊 CALCULATE PROGRESS
    const total = candidates.length + whitelist.length + blacklist.length;
    const processed = whitelist.length + blacklist.length;
    const progressPct = total === 0 ? 0 : Math.round((processed / total) * 100);

    if (candidates.length === 0) {
        return res.send(`
            <body style="background:#121212; color:white; font-family:sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh;">
                <h1>🎉 Mission Complete!</h1>
                <p>You have reviewed ${processed} tools.</p>
                <div style="width:300px; background:#333; height:10px; border-radius:5px; margin-top:20px;">
                    <div style="width:100%; background:#4caf50; height:100%; border-radius:5px;"></div>
                </div>
            </body>
        `);
    }
    
    const c = candidates[0];
    
    // Generate Dropdown for Workflow Tasks
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

    // 🆕 CATEGORY LIST based on your requirements
    const categories = [
        "Image Generation", "Floorplan Colouring", "Detail Creation", "Rendering Images",
        "Checking Legalities", "Site Analysis", "Cost Estimation", "Material Selection",
        "3D Modeling", "Energy Analysis", "Project Scheduling", "Code Scripting"
    ];

    let catOptions = categories.map(cat => 
        `<option value="${cat}" ${c.suggested_category === cat ? 'selected' : ''}>${cat}</option>`
    ).join('');

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>ArchScout Command Center</title>
            <style>
                :root { --bg: #121212; --card: #1e1e1e; --input: #2d2d2d; --text: #e0e0e0; --accent: #64b5f6; }
                body { background: var(--bg); color: var(--text); font-family: 'Segoe UI', sans-serif; padding: 20px; display: flex; flex-direction: column; align-items: center; }
                .container { display: grid; grid-template-columns: 1fr 2fr; gap: 20px; max-width: 1400px; width: 100%; }
                .card { background: var(--card); padding: 25px; border-radius: 12px; border: 1px solid #333; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
                h2 { margin-top: 0; color: white; border-bottom: 1px solid #333; padding-bottom: 10px; }
                label { display: block; margin-top: 15px; font-size: 0.85rem; color: #888; font-weight: bold; text-transform: uppercase; }
                input, textarea, select { width: 100%; background: var(--input); border: 1px solid #444; color: white; padding: 12px; border-radius: 6px; margin-top: 5px; font-size: 1rem; box-sizing: border-box; }
                input:focus, textarea:focus { border-color: var(--accent); outline: none; }
                .actions { margin-top: 30px; display: flex; gap: 15px; }
                button { flex: 1; padding: 15px; border: none; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: transform 0.1s; }
                button:active { transform: scale(0.98); }
                .approve { background: #4caf50; color: white; }
                .reject { background: #f44336; color: white; }
                .row { display: flex; gap: 15px; }
                .col { flex: 1; }
                .logo-preview { width: 100%; max-height: 80px; object-fit: contain; background: white; padding: 10px; border-radius: 6px; margin-bottom: 20px; box-sizing: border-box; }
                
                /* 🆕 PROGRESS BAR STYLES */
                .progress-container { width: 100%; max-width: 1400px; background: #333; height: 8px; border-radius: 4px; margin-bottom: 20px; overflow: hidden; }
                .progress-bar { height: 100%; background: var(--accent); width: ${progressPct}%; transition: width 0.3s ease; }
                .stats { font-size: 0.8rem; color: #888; margin-bottom: 5px; width: 100%; max-width: 1400px; text-align: right; }
            </style>
        </head>
        <body>
            <div class="stats">Progress: ${processed} / ${total} (${progressPct}%)</div>
            <div class="progress-container">
                <div class="progress-bar"></div>
            </div>

            <div class="container">
                <div class="card">
                    <h2>🔍 Raw Data</h2>
                    ${c.logo_url ? `<img src="${c.logo_url}" class="logo-preview">` : ''}
                    <p style="font-size: 0.9rem; opacity: 0.7;">Found via: ${c.suggested_category || "Web Search"}</p>
                    <a href="${c.website_url}" target="_blank" style="display:inline-block; background:var(--accent); color:black; padding:8px 15px; text-decoration:none; border-radius:4px; font-weight:bold;">🔗 Open Website</a>
                    <br><br>
                    <label>Raw Snippet</label>
                    <div style="background:#111; padding:15px; border-radius:6px; font-size:0.9rem; line-height:1.5; color:#ccc;">
                        ${c.description_long || "No description found."}
                    </div>
                </div>

                <div class="card">
                    <form action="/decide" method="POST">
                        <h2>✏️ Data Enrichment</h2>
                        <input type="hidden" name="id" value="${c.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}">
                        <input type="hidden" name="website_url" value="${c.website_url}">
                        <input type="hidden" name="logo_url" value="${c.logo_url || ''}">

                        <div class="row">
                            <div class="col">
                                <label>Tool Name</label>
                                <input type="text" name="name" value="${c.name}">
                            </div>
                            <div class="col">
                                <label>Provider</label>
                                <input type="text" name="provider" value="${c.provider || 'Unknown'}">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <label>Primary Function</label>
                                <select name="primary_function">
                                    ${catOptions}
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div class="col">
                                <label>Benchmark Score (0-10)</label>
                                <input type="number" name="benchmark_score" step="0.1" min="0" max="10" value="5.0" style="border: 1px solid var(--accent);">
                            </div>
                        </div>

                        <label>Short Pitch</label>
                        <input type="text" name="description_short" placeholder="e.g. Automates zoning analysis via NLP">

                        <div class="row">
                            <div class="col">
                                <label>Pricing Model</label>
                                <select name="pricing_model">
                                    <option value="Paid">Paid</option>
                                    <option value="Freemium">Freemium</option>
                                    <option value="Enterprise">Enterprise</option>
                                    <option value="Free">Free</option>
                                </select>
                            </div>
                            <div class="col">
                                <label>Carbon Analysis?</label>
                                <select name="has_carbon_analysis">
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>
                        </div>

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

                        <label style="color: var(--accent);">➤ Assign to Workflow (Required)</label>
                        <select name="workflow_target" required style="border: 1px solid var(--accent);">
                            ${taskOptions}
                        </select>

                        <div class="actions">
                            <button type="submit" name="decision" value="approve" class="approve">✅ Approve</button>
                            <button type="submit" name="decision" value="reject" class="reject">❌ Reject</button>
                        </div>
                    </form>
                </div>
            </div>
        </body>
        </html>
    `);
});

// 3. HANDLE DECISION
app.post('/decide', (req, res) => {
    const decision = req.body.decision;
    const oldCandidate = candidates.shift();

    if (decision === 'approve') {
        let pIdx = 0, tIdx = 0;
        if(req.body.workflow_target) [pIdx, tIdx] = req.body.workflow_target.split(',').map(Number);
        
        const prosArray = req.body.pros ? req.body.pros.split('\r\n').filter(x => x.length > 0) : [];
        const consArray = req.body.cons ? req.body.cons.split('\r\n').filter(x => x.length > 0) : [];

        const approvedItem = {
            id: req.body.id,
            name: req.body.name,
            provider: req.body.provider,
            website_url: req.body.website_url,
            logo_url: req.body.logo_url,
            
            description_short: req.body.description_short,
            primary_function: req.body.primary_function, // 🆕 Matches new categories
            
            pricing_model: req.body.pricing_model,
            has_carbon_analysis: req.body.has_carbon_analysis === 'true', // 🆕
            benchmark_score: parseFloat(req.body.benchmark_score) || 0,   // 🆕
            
            pros: prosArray,
            cons: consArray,
            
            workflow_target: { phaseIndex: pIdx, taskIndex: tIdx }
        };

        whitelist.push(approvedItem);
        fs.writeFileSync('whitelist.json', JSON.stringify(whitelist, null, 2));
        console.log(`✅ Approved: ${approvedItem.name} [Score: ${approvedItem.benchmark_score}]`);
    } else {
        blacklist.push(oldCandidate.website_url);
        fs.writeFileSync('blacklist.json', JSON.stringify(blacklist, null, 2));
        console.log(`❌ Rejected: ${oldCandidate.name}`);
    }

    fs.writeFileSync('candidates.json', JSON.stringify(candidates, null, 2));
    res.redirect('/');
});

app.listen(3001, () => {
    console.log('\n🌌 Dark Mode Command Center Active');
    console.log('👉 http://localhost:3001');
});