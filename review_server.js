const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public')); // serves css/html if needed

// Load Data
let candidates = fs.existsSync('candidates.json') ? JSON.parse(fs.readFileSync('candidates.json')) : [];
let workflow = require('../workflow.js');
let whitelist = fs.existsSync('whitelist.json') ? JSON.parse(fs.readFileSync('whitelist.json')) : [];
let blacklist = fs.existsSync('blacklist.json') ? JSON.parse(fs.readFileSync('blacklist.json')) : [];

// HTML Interface
app.get('/', (req, res) => {
    if (candidates.length === 0) return res.send("<h1>No candidates left! Run 'node scout.js' or 'node merge.js'</h1>");
    
    const current = candidates[0];
    
    // Generate Task Dropdown options from Workflow Data
    let taskOptions = '';
    workflow.forEach((phase, pIdx) => {
        phase.tasks.forEach((task, tIdx) => {
            taskOptions += `<option value="${pIdx},${tIdx}">${phase.title} -> ${task.title}</option>`;
        });
    });

    res.send(`
        <html>
        <body style="font-family:sans-serif; padding:40px; background:#f0f0f0;">
            <div style="background:white; padding:30px; border-radius:10px; max-width:600px; margin:0 auto;">
                <h2 style="margin-top:0;">Candidate: ${current.name}</h2>
                <p><strong>URL:</strong> <a href="${current.website_url}" target="_blank">${current.website_url}</a></p>
                <p>${current.description_short}</p>
                
                <hr>
                
                <form action="/decide" method="POST">
                    <label><strong>Assign to Workflow Task:</strong></label><br>
                    <select name="taskIndices" style="width:100%; padding:10px; margin-top:5px;">
                        ${taskOptions}
                    </select>
                    
                    <br><br>
                    
                    <button type="submit" name="decision" value="approve" style="background:green; color:white; padding:15px 30px; border:none; font-size:16px; cursor:pointer;">✅ Approve & Whitelist</button>
                    <button type="submit" name="decision" value="reject" style="background:red; color:white; padding:15px 30px; border:none; font-size:16px; cursor:pointer; margin-left:10px;">❌ Reject</button>
                </form>
                
                <p style="color:#666; font-size:12px; margin-top:20px;">Remaining candidates: ${candidates.length}</p>
            </div>
        </body>
        </html>
    `);
});

// Handle Decision
app.post('/decide', (req, res) => {
    const decision = req.body.decision;
    const current = candidates.shift(); // Remove from queue
    
    if (decision === 'approve') {
        const [pIdx, tIdx] = req.body.taskIndices.split(',').map(Number);
        
        // Add workflow mapping info to the object temporarily
        current.workflow_target = { phaseIndex: pIdx, taskIndex: tIdx };
        
        whitelist.push(current);
        fs.writeFileSync('whitelist.json', JSON.stringify(whitelist, null, 2));
    } else {
        blacklist.push(current.website_url);
        fs.writeFileSync('blacklist.json', JSON.stringify(blacklist, null, 2));
    }

    // Save updated candidates
    fs.writeFileSync('candidates.json', JSON.stringify(candidates, null, 2));
    res.redirect('/');
});

app.listen(3000, () => console.log('Review Server running at http://localhost:3000'));