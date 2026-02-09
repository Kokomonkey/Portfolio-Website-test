const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// 1. SAFE FILE LOADING (Fixes the "Module Not Found" error)
const loadJSON = (file) => fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
const workflowPath = path.join(__dirname, 'workflow.js');

let candidates = loadJSON('candidates.json');
let whitelist = loadJSON('whitelist.json');
let blacklist = loadJSON('blacklist.json');
let workflow = require(workflowPath); // This requires workflow.js to exist!

// 2. THE DASHBOARD INTERFACE
app.get('/', (req, res) => {
    if (candidates.length === 0) {
        return res.send(`
            <body style="background:#121212; color:white; font-family:sans-serif; display:flex; align-items:center; justify-content:center; height:100vh;">
                <div style="text-align:center;">
                    <h1>🎉 All Done!</h1>
                    <p>No more candidates to review.</p>
                    <p>Run <code>node merge.js</code> to publish changes.</p>
                </div>
            </body>
        `);
    }
    
    const c = candidates[0];
    
    // Generate Dropdown for Workflow Tasks
    let taskOptions = '<option value="">-- Select Workflow Phase --</option>';
    workflow.forEach((phase, pIdx) => {
        phase.tasks.forEach((task, tIdx) => {
            taskOptions += `<option value="${pIdx},${tIdx}">${phase.title} ➤ ${task.title}</option>`;
        });
    });

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>ArchScout Command Center</title>
            <style>
                :root { --bg: #121212; --card: #1e1e1e; --input: #2d2d2d; --text: #e0e0e0; --accent: #64b5f6; }
                body { background: var(--bg); color: var(--text); font-family: 'Segoe UI', sans-serif; padding: 20px; display: flex; justify-content: center; }
                .container { display: grid; grid-template-columns: 1fr 1.5fr; gap: 20px; max-width: 1200px; width: 100%; }
                .card { background: var(--card); padding: 25px; border-radius: 12px; border: 1px solid #333; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
                h2 { margin-top: 0; color: white; border-bottom: 1px solid #333; padding-bottom: 10px; }
                label { display: block; margin-top: 15px; font-size: 0.85rem; color: #888; font-weight: bold; text-transform: uppercase; }
                input, textarea, select { width: 100%; background: var(--input); border: 1px solid #444; color: white; padding: 12px; border-radius: 6px; margin-top: 5px; font-size: 1rem; box-sizing: border-box; }
                input:focus, textarea:focus { border-color: var(--accent); outline: none; }
                .btn-link { display: inline-block; background: var(--accent); color: #000; padding: 8px 15px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 0.9rem; margin-bottom: 20px; }
                .btn-link:hover { opacity: 0.9; }
                .actions { margin-top: 30px; display: flex; gap: 15px; }
                button { flex: 1; padding: 15px; border: none; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: transform 0.1s; }
                button:active { transform: scale(0.98); }
                .approve { background: #4caf50; color: white; }
                .reject { background: #f44336; color: white; }
                .info-row { display: flex; gap: 15px; }
                .counter { text-align: right; color: #666; font-size: 0.8rem; margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="card">
                    <h2>🔍 Scout Info</h2>
                    <p style="font-size: 0.9rem; opacity: 0.7;">Found via: ${c.source_query || "Web Search"}</p>
                    <a href="${c.website_url}" target="_blank" class="btn-link">🔗 Open Website</a>
                    
                    <label>Raw Description</label>
                    <div style="background:#111; padding:15px; border-radius:6px; font-size:0.9rem; line-height:1.5;">
                        ${c.description_long || c.description_short || "No description found."}
                    </div>

                    <label>Suggested Name</label>
                    <div style="font-size: 1.2rem; font-weight: bold; color: white;">${c.name}</div>
                </div>

                <div class="card">
                    <form action="/decide" method="POST">
                        <h2>✏️ Editor</h2>
                        <input type="hidden" name="id" value="${c.id || c.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}">
                        <input type="hidden" name="website_url" value="${c.website_url}">

                        <label>Tool Name</label>
                        <input type="text" name="name" value="${c.name}">

                        <label>Short Pitch (1 Sentence)</label>
                        <input type="text" name="description_short" value="${c.description_short || ''}" placeholder="e.g. AI-powered rendering for Revit">

                        <label>Detailed Description</label>
                        <textarea name="description_long" rows="4">${c.description_long || ''}</textarea>

                        <div class="info-row">
                            <div style="flex:1">
                                <label>Pricing</label>
                                <select name="pricing_model">
                                    <option value="Freemium" ${c.pricing_model === 'Freemium' ? 'selected' : ''}>Freemium</option>
                                    <option value="Paid" ${c.pricing_model === 'Paid' ? 'selected' : ''}>Paid</option>
                                    <option value="Enterprise" ${c.pricing_model === 'Enterprise' ? 'selected' : ''}>Enterprise</option>
                                    <option value="Free" ${c.pricing_model === 'Free' ? 'selected' : ''}>Free</option>
                                </select>
                            </div>
                            <div style="flex:1">
                                <label>Monthly Cost ($)</label>
                                <input type="number" name="price_base_monthly" value="${c.price_base_monthly || 0}">
                            </div>
                        </div>

                        <label style="color: var(--accent);">➤ Assign to Workflow (Required)</label>
                        <select name="workflow_target" required style="border: 1px solid var(--accent);">
                            ${taskOptions}
                        </select>

                        <div class="actions">
                            <button type="submit" name="decision" value="approve" class="approve">✅ Approve & Save</button>
                            <button type="submit" name="decision" value="reject" class="reject">❌ Reject / Blacklist</button>
                        </div>
                        <div class="counter">${candidates.length} candidates remaining</div>
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
    const oldCandidate = candidates.shift(); // Remove from queue

    if (decision === 'approve') {
        const [pIdx, tIdx] = req.body.workflow_target.split(',').map(Number);
        
        const approvedItem = {
            id: req.body.id,
            name: req.body.name,
            website_url: req.body.website_url,
            provider: req.body.provider || "Unknown",
            description_short: req.body.description_short,
            description_long: req.body.description_long,
            pricing_model: req.body.pricing_model,
            price_base_monthly: parseFloat(req.body.price_base_monthly) || 0,
            primary_function: "Architecture AI", 
            company_size_fit: ["Studio", "Firm"],
            benchmark_rating: 7,
            pros: [],
            cons: [],
            // INTERNAL USE ONLY (Merge script uses this, then deletes it)
            workflow_target: { phaseIndex: pIdx, taskIndex: tIdx }
        };

        whitelist.push(approvedItem);
        fs.writeFileSync('whitelist.json', JSON.stringify(whitelist, null, 2));
        console.log(`✅ Approved: ${approvedItem.name}`);
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