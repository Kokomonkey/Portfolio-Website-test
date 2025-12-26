/* --- Data: The AI Database --- */
// Corrected names and categorized based on architecture workflow
const aiTools = [
    // 1. Pre-Design & Analysis
    { name: "Autodesk Forma", id: "forma", role: "Site Analysis & Massing", cost: "Included in AEC", url: "https://www.autodesk.com/forma", category: "Pre-Design" },
    { name: "NotebookLM", id: "notebook", role: "Research & Document Analysis", cost: "Free", url: "https://notebooklm.google.com/", category: "Pre-Design" },
    { name: "Claude", id: "claude", role: "Logic & Coding Assistant", cost: "Free / $20", url: "https://claude.ai", category: "General" },
    
    // 2. Concept Design
    { name: "Midjourney", id: "midjourney", role: "Artistic Visualization", cost: "$10/mo", url: "https://www.midjourney.com", category: "Concept" },
    { name: "Stable Diffusion", id: "stablediff", role: "Local Image Gen", cost: "Free (Open Source)", url: "https://stability.ai", category: "Concept" },
    { name: "LookX AI", id: "lookx", role: "Archi-trained Image Gen", cost: "Freemium", url: "https://www.lookx.ai", category: "Concept" },
    { name: "Meshy", id: "meshy", role: "3D Gen from Text", cost: "Freemium", url: "https://www.meshy.ai", category: "Concept" },
    { name: "Flora", id: "flora", role: "Generative Design Logic", cost: "Unknown", url: "#", category: "Concept" },
    
    // 3. Design Development
    { name: "Rendair", id: "rendair", role: "Sketch to Render", cost: "$20/mo", url: "https://rendair.ai", category: "Development" },
    { name: "Veras", id: "veras", role: "BIM Rendering Plugin", cost: "$34/mo", url: "https://www.evolvelab.io/veras", category: "Development" },
    { name: "ArkoAI", id: "arko", role: "Cloud Rendering", cost: "$25/mo", url: "https://arko.ai", category: "Development" },
    { name: "PromeAI", id: "prome", role: "Design Variation", cost: "Freemium", url: "https://www.promeai.com", category: "Development" },
    
    // 4. Video & Presentation
    { name: "Runway", id: "runway", role: "Video Gen & Editing", cost: "$12/mo", url: "https://runwayml.com", category: "Presentation" },
    { name: "Sora", id: "sora", role: "Realistic Video", cost: "TBD", url: "https://openai.com/sora", category: "Presentation" },
    { name: "Kling AI", id: "kling", role: "High-end Video Gen", cost: "Credits", url: "#", category: "Presentation" },
    { name: "Luma AI", id: "luma", role: "3D Splatting/Video", cost: "Freemium", url: "https://lumalabs.ai", category: "Presentation" },
    
    // 5. Utility / General / Coding
    { name: "Gemini", id: "gemini", role: "Multimodal Assistant", cost: "Free", url: "https://deepmind.google/technologies/gemini/", category: "General" },
    { name: "ChatGPT (DALL-E)", id: "dalle", role: "Image & Text", cost: "$20/mo", url: "https://chat.openai.com", category: "General" },
    { name: "Magnific AI", id: "mackific", role: "Upscaling & Detail", cost: "$39/mo", url: "https://magnific.ai", category: "Post-Production" },
    { name: "ComfyUI", id: "comyui", role: "Node-based SD", cost: "Free", url: "https://github.com/comfyanonymous/ComfyUI", category: "General" },
    { name: "Cursor", id: "cursor", role: "AI Code Editor", cost: "Free", url: "https://cursor.sh", category: "Coding" },
    { name: "Vercel", id: "vercel", role: "Web Deployment", cost: "Free", url: "https://vercel.com", category: "Coding" },
    
    // 6. Others / Unclear / Typo corrections
    { name: "Promethean AI", id: "pasrombea", role: "Asset Management", cost: "Free/Enterprise", url: "https://www.prometheanai.com/", category: "Asset" },
    { name: "Manus", id: "manus", role: "Automation Agent", cost: "Waitlist", url: "#", category: "General" },
    { name: "Weavy", id: "weavy", role: "In-app Collab", cost: "Dev Pricing", url: "https://www.weavy.com", category: "Coding" },
    { name: "Fenestra", id: "fenestra", role: "Optimization", cost: "Unknown", url: "#", category: "General" }
];

/* --- Workflow Steps Configuration --- */
const workflowSteps = [
    { 
        id: "step1", title: "Strategic Definition", num: "01", x: -400, y: 0, 
        desc: "Define the 'Why'. Client briefing, site constraints, and feasibility checks.",
        tools: ["notebook", "gemini", "claude"]
    },
    { 
        id: "step2", title: "Concept Design", num: "02", x: -150, y: -100, 
        desc: "Visual exploration. Sketching, massing models, and style definition.",
        tools: ["midjourney", "lookx", "stablediff", "meshy", "flora"]
    },
    { 
        id: "step3", title: "Design Development", num: "03", x: 150, y: -100, 
        desc: "Turning the idea into a building. Structural coordination and facade detailing.",
        tools: ["rendair", "veras", "arko", "prome", "forma"]
    },
    { 
        id: "step4", title: "Technical Design", num: "04", x: 400, y: 0, 
        desc: "The instruction manual. Construction drawings, schedules, and code compliance.",
        tools: ["forma", "cursor", "comyui"]
    },
    { 
        id: "step5", title: "Presentation & Marketing", num: "05", x: 150, y: 150, 
        desc: "Selling the vision. High-end renders, video walkthroughs, and VR.",
        tools: ["runway", "sora", "kling", "luma", "mackific"]
    }
];

/* --- Logic for Index.html (Workflow) --- */
const canvas = document.getElementById('workflow-canvas');
const panelTitle = document.getElementById('panel-title');
const panelDesc = document.getElementById('panel-desc');
const panelTools = document.getElementById('panel-tools');
const container = document.getElementById('canvas-container');

if (canvas) {
    // 1. Build the Nodes
    workflowSteps.forEach((step, index) => {
        const node = document.createElement('div');
        node.className = 'step-box';
        node.innerHTML = `<span class="step-number">Phase ${step.num}</span><h3>${step.title}</h3>`;
        node.style.left = step.x + 'px';
        node.style.top = step.y + 'px';
        
        // Hover Logic
        node.addEventListener('mouseenter', () => {
            canvas.classList.add('has-hover');
            updatePanel(step);
        });
        node.addEventListener('mouseleave', () => {
            canvas.classList.remove('has-hover');
        });

        canvas.appendChild(node);

        // Draw Lines (Simple connector to next step)
        if (index < workflowSteps.length - 1 && index !== 3) { // Custom logic for layout
            const next = workflowSteps[index + 1];
            // Only strictly linear for this demo logic, 
            // a real graph implementation would be more complex
        }
    });

    // 2. Populate Unused AIs
    const usedIDs = new Set(workflowSteps.flatMap(s => s.tools));
    const unusedContainer = document.getElementById('unused-ai-list');
    
    aiTools.forEach(ai => {
        if (!usedIDs.has(ai.id)) {
            const chip = createAIChip(ai);
            unusedContainer.appendChild(chip);
        }
    });

    // 3. Drag and Zoom Logic
    let state = { scale: 1, panning: false, pointX: 0, pointY: 0, startX: 0, startY: 0 };

    container.addEventListener('mousedown', (e) => {
        state.panning = true;
        state.startX = e.clientX - state.pointX;
        state.startY = e.clientY - state.pointY;
        container.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', () => {
        state.panning = false;
        container.style.cursor = 'grab';
    });

    document.addEventListener('mousemove', (e) => {
        if (!state.panning) return;
        e.preventDefault();
        state.pointX = e.clientX - state.startX;
        state.pointY = e.clientY - state.startY;
        updateTransform();
    });

    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const xs = (e.clientX - state.pointX) / state.scale;
        const ys = (e.clientY - state.pointY) / state.scale;
        const delta = -e.deltaY;
        
        (delta > 0) ? (state.scale *= 1.1) : (state.scale /= 1.1);
        state.pointX = e.clientX - xs * state.scale;
        state.pointY = e.clientY - ys * state.scale;
        updateTransform();
    });

    function updateTransform() {
        canvas.style.transform = `translate(${state.pointX}px, ${state.pointY}px) scale(${state.scale})`;
    }
    
    // Center initially
    state.pointX = container.offsetWidth / 2;
    state.pointY = container.offsetHeight / 2;
    updateTransform();
}

/* --- Helper Functions --- */

function updatePanel(step) {
    panelTitle.innerText = step.title;
    panelDesc.innerText = step.desc;
    panelTools.innerHTML = ''; // Clear previous

    step.tools.forEach(toolId => {
        const tool = aiTools.find(t => t.id === toolId);
        if (tool) {
            panelTools.appendChild(createAIChip(tool));
        }
    });
}

function createAIChip(tool) {
    const a = document.createElement('a');
    a.className = 'ai-chip';
    a.innerText = tool.name;
    a.href = tool.url;
    a.target = "_blank";
    
    // Add hover listener for the panel explanation if needed
    // In this simplified version, it just links out
    return a;
}

/* --- Logic for Table.html --- */
function populateTablePage() {
    const tbody = document.getElementById('ai-table-body');
    if (!tbody) return;

    aiTools.sort((a,b) => a.category.localeCompare(b.category)); // Sort by category

    aiTools.forEach(ai => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><div class="logo-placeholder">${ai.name.substring(0,2)}</div></td>
            <td><strong>${ai.name}</strong></td>
            <td>${ai.category}</td>
            <td>${ai.role}</td>
            <td>${ai.cost}</td>
        `;
        tbody.appendChild(tr);
    });
}