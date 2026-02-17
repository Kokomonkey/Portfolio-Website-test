const fs = require('fs');

const WHITELIST_PATH = './whitelist.json';
const DATABASE_PATH = './database.js';
const WORKFLOW_PATH = './workflow.js';

const whitelist = fs.existsSync(WHITELIST_PATH) ? JSON.parse(fs.readFileSync(WHITELIST_PATH)) : [];

// 1. UPDATE DATABASE.JS
console.log("🔄 Merging Whitelist into Database...");
const newDatabase = whitelist.map(item => ({
    id: item.id,
    name: item.name,
    provider: item.provider,
    website_url: item.website_url,
    logo_url: item.logo_url,
    image_url_1: item.image_url_1 || "", // 🆕 Ensure these map
    image_url_2: item.image_url_2 || "", // 🆕 Ensure these map
    
    description_short: item.description_short,
    description_long: item.description_long, // 🆕 Ensure these map
    
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
// Load existing workflow to preserve structure, but inject new IDs
let workflow = [];
try {
    const wfRaw = fs.readFileSync(WORKFLOW_PATH, 'utf8');
    workflow = JSON.parse(wfRaw.replace('window.workflowData =', '').replace(';', '').trim());
} catch(e) { console.log("⚠️ Could not load workflow structure, starting fresh."); }

whitelist.forEach(tool => {
    if (tool.workflow_target) {
        const { phaseIndex, taskIndex } = tool.workflow_target;
        if (workflow[phaseIndex] && workflow[phaseIndex].tasks[taskIndex]) {
            const task = workflow[phaseIndex].tasks[taskIndex];
            if (!task.ai_refs) task.ai_refs = [];
            
            // Only add if not already there
            if (!task.ai_refs.includes(tool.id)) {
                task.ai_refs.push(tool.id);
            }
        }
    }
});

const wfContent = `window.workflowData = ${JSON.stringify(workflow, null, 4)};`;
fs.writeFileSync(WORKFLOW_PATH, wfContent);
console.log(`✅ workflow.js updated with new tool references.`);