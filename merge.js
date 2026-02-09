const fs = require('fs');
const path = require('path');

// 1. READ FILES
const dbPath = path.join(__dirname, 'database.js');
let dbContent = fs.readFileSync(dbPath, 'utf8');
let workflow = require('workflow.js');
let whitelist = fs.existsSync('whitelist.json') ? JSON.parse(fs.readFileSync('whitelist.json')) : [];

if (whitelist.length === 0) {
    console.log("Nothing to merge! Whitelist is empty.");
    process.exit();
}

// 2. PARSE CURRENT DATABASE.JS (Extract Array)
const cleanedContent = dbContent.replace(/window\.aiDatabase\s*=\s*/, '').replace(/;\s*$/, '');
// We need to be careful with eval, but for this local build tool it's acceptable
let currentDB = eval(cleanedContent); 

// 3. MERGE PROCESS
whitelist.forEach(newItem => {
    // A. Add to Database
    // Remove the workflow_target property we added in review (it doesn't belong in DB)
    const target = newItem.workflow_target;
    delete newItem.workflow_target;
    
    // Check for duplicates by ID
    if (!currentDB.find(x => x.id === newItem.id)) {
        currentDB.push(newItem);
        console.log(`➕ Added to Database: ${newItem.name}`);
    }

    // B. Add to Workflow
    if (target) {
        const task = workflow[target.phaseIndex].tasks[target.taskIndex];
        if (!task.ai_refs.includes(newItem.id)) {
            task.ai_refs.push(newItem.id);
            console.log(`🔗 Linked to Task: ${task.title}`);
        }
    }
});

// 4. WRITE FILES BACK

// Write database.js
const newDbContent = `window.aiDatabase = ${JSON.stringify(currentDB, null, 4)};`;
fs.writeFileSync(dbPath, newDbContent);

// Write workflow.js
const newWorkflowContent = `module.exports = ${JSON.stringify(workflow, null, 4)};`;
fs.writeFileSync('workflow.js', newWorkflowContent);

// Clear Whitelist
fs.writeFileSync('whitelist.json', '[]');

console.log("💾 Data files updated.");

// 5. TRIGGER SITE REGENERATION
console.log("🔨 Rebuilding static pages...");
require('./generate_site.js'); // Assuming this runs your generator logic