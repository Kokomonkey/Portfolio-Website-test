const fs = require('fs');
const vm = require('vm'); // 🆕 Added vm module for safe loading

const WHITELIST_PATH = './whitelist.json';
const DATABASE_PATH = './database.js';
const WORKFLOW_PATH = './workflow.js';

const whitelist = fs.existsSync(WHITELIST_PATH) ? JSON.parse(fs.readFileSync(WHITELIST_PATH)) : [];

if (whitelist.length === 0) {
    console.log("⚠️ No new candidates in whitelist to merge.");
    process.exit(0);
}

// 1. UPDATE DATABASE.JS
console.log("🔄 Merging Whitelist into Database...");
const newDatabase = whitelist.map(item => ({
    id: item.id,
    name: item.name,
    provider: item.provider,
    website_url: item.website_url,
    logo_url: item.logo_url,
    image_url_1: item.image_url_1 || "",
    image_url_2: item.image_url_2 || "",
    
    description_short: item.description_short,
    description_long: item.description_long,
    
    primary_function: item.primary_function,
    integration_type: item.integration_type || "Service",
    
    input_type: item.input_type,
    output_type: item.output_type,
    
    pricing_model: item.pricing_model,
    price_base_monthly: item.price_base_monthly,
    usage_limit_per_month: item.usage_limit_per_month || -1,
    
    company_size_fit: item.company_size_fit || ["Studio", "Firm"],
    benchmark_rating: item.benchmark_rating || 5,
    
    pros: item.pros || [],
    cons: item.cons || [],
    
    efficiency_text: item.efficiency_text || "Standard efficiency.",
    workflow_text: item.workflow_text || "Standard workflow."
}));

const dbContent = `window.aiDatabase = ${JSON.stringify(newDatabase, null, 4)};`;
fs.writeFileSync(DATABASE_PATH, dbContent);
console.log(`✅ database.js updated with ${newDatabase.length} entries.`);

// 2. UPDATE WORKFLOW.JS
console.log("🔄 Updating Workflow references...");
let workflow = [];
try {
    const wfRaw = fs.readFileSync(WORKFLOW_PATH, 'utf8');
    
    // 🆕 Safely execute the file to extract the array, just like the review server
    const sandbox = { window: {}, module: {} };
    vm.createContext(sandbox);
    vm.runInContext(wfRaw, sandbox);
    
    workflow = sandbox.window.workflowData || sandbox.module.exports || [];
} catch(e) { 
    console.log("⚠️ Could not load workflow structure, starting fresh. Error:", e.message); 
}

let addedRefs = 0;

whitelist.forEach(tool => {
    if (tool.workflow_target) {
        const { phaseIndex, taskIndex } = tool.workflow_target;
        
        // Ensure the nested arrays exist before pushing
        if (workflow[phaseIndex] && workflow[phaseIndex].tasks[taskIndex]) {
            const task = workflow[phaseIndex].tasks[taskIndex];
            
            if (!task.ai_refs) task.ai_refs = [];
            
            // Only add if not already there
            if (!task.ai_refs.includes(tool.id)) {
                task.ai_refs.push(tool.id);
                addedRefs++;
            }
        } else {
            console.log(`⚠️ Could not find Phase ${phaseIndex}, Task ${taskIndex} for tool ${tool.id}`);
        }
    }
});

// 🆕 Re-attach the module.exports block so the review_server doesn't break on reload
const wfContent = `window.workflowData = ${JSON.stringify(workflow, null, 4)};\n\nif(typeof module !== 'undefined') module.exports = window.workflowData;`;

fs.writeFileSync(WORKFLOW_PATH, wfContent);
console.log(`✅ workflow.js updated successfully! Added ${addedRefs} new AI references.`);

