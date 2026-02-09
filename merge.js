const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DB_PATH = path.join(__dirname, 'database.js');
const WORKFLOW_PATH = path.join(__dirname, 'workflow.js');

// 1. LOAD EXISTING DATABASE SAFELY
let currentDB = [];
try {
    const dbContent = fs.readFileSync(DB_PATH, 'utf8');
    const sandbox = { window: {} };
    vm.createContext(sandbox);
    vm.runInContext(dbContent, sandbox);
    currentDB = sandbox.window.aiDatabase || [];
} catch (e) {
    console.log("Creating new database structure...");
}

// 2. LOAD EXISTING WORKFLOW SAFELY
let workflow = [];
try {
    const wfContent = fs.readFileSync(WORKFLOW_PATH, 'utf8');
    const sandbox = { window: {}, module: {} };
    vm.createContext(sandbox);
    vm.runInContext(wfContent, sandbox);
    workflow = sandbox.window.workflowData || sandbox.module.exports || [];
} catch (e) {
    console.log("❌ Error loading workflow.js. Ensure the file exists and isn't corrupted.");
}

// 3. CHECK FOR NEW DATA (WHITELIST)
if (fs.existsSync('whitelist.json')) {
    const whitelist = JSON.parse(fs.readFileSync('whitelist.json'));
    if (whitelist.length > 0) {
        console.log(`➕ Processing ${whitelist.length} new approved tools...`);
        
        whitelist.forEach(item => {
            if (!currentDB.find(x => x.id === item.id)) {
                const target = item.workflow_target;
                delete item.workflow_target; 
                currentDB.push(item);

                if (target && workflow[target.phaseIndex]) {
                    const task = workflow[target.phaseIndex].tasks[target.taskIndex];
                    if (!task.ai_refs.includes(item.id)) {
                        task.ai_refs.push(item.id);
                    }
                }
            }
        });
        // Clear whitelist after processing
        fs.writeFileSync('whitelist.json', '[]');
    }
}

// 4. SAVE HYBRID FILES (This is what fixes your "Empty Data" issue)
// This ensures the files always have the "window.x =" prefix for the browser
const dbFinal = `window.aiDatabase = ${JSON.stringify(currentDB, null, 4)};`;
fs.writeFileSync(DB_PATH, dbFinal);

const wfFinal = `window.workflowData = ${JSON.stringify(workflow, null, 4)}; \n\nif(typeof module !== 'undefined') module.exports = window.workflowData;`;
fs.writeFileSync(WORKFLOW_PATH, wfFinal);

console.log("✅ Files updated and synced for Browser + Node.js.");

// 5. AUTO-GENERATE PAGES
try {
    require('./generate_site.js');
    console.log("🚀 HTML Pages regenerated.");
} catch (e) {
    console.log("⚠️ Manual page generation required.");
}