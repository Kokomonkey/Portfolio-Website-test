// ── Phase config ──────────────────────────────────────────────
// colMin/colMax define hard horizontal lock bounds for drag clamping.
// 2-wide phases: 2×240 + 20gap + 2×30margin = 560px
// 3-wide phases: 3×240 + 2×20gap + 2×30margin = 840px
export const rootPhases = [
  { id: 'stage1', label: 'STAGE 1', sublabel: 'Acquisition & Brief',     color: '#3b82f6', colMin: 0,    colMax: 560  },
  { id: 'stage2', label: 'STAGE 2', sublabel: 'Analysis & Strategy',     color: '#10b981', colMin: 560,  colMax: 1120 },
  { id: 'stage3', label: 'STAGE 3', sublabel: 'Concept & Planning',      color: '#f59e0b', colMin: 1120, colMax: 1680 },
  { id: 'stage4', label: 'STAGE 4', sublabel: 'Production & Submission', color: '#8b5cf6', colMin: 1680, colMax: 2520 },
];

// ── Child-flow phase configs ───────────────────────────────────
const briefChildPhases = [
  { id: 'brief', label: 'BRIEF CAPTURE', sublabel: 'Kickoff workflow', color: '#3b82f6' },
];
const siteChildPhases = [
  { id: 'site', label: 'SITE ANALYSIS', sublabel: 'Context workflow', color: '#10b981' },
];
const massChildPhases = [
  { id: 'massing', label: 'MASSING', sublabel: 'Concept workflow', color: '#f59e0b' },
];
const wsChildPhases = [
  { id: 'ws', label: 'STATEMENTS', sublabel: 'Submission workflow', color: '#8b5cf6' },
];

// ── Helper: sequential edges for a child flow ─────────────────
const seq = (ids) => ids.slice(0, -1).map((id, i) => ({
  id: `e${id}-${ids[i + 1]}`, source: id, target: ids[i + 1], animated: false,
}));

// ── Child flows ────────────────────────────────────────────────
// 6 nodes → 3-wide grid (3 cols × 2 rows), col stride=260, row stride=220
const briefChildFlow = {
  nodes: [
    { id: 'aa1', type: 'task', position: { x: 30,  y: 0   }, data: {
      label: 'Pre-meeting briefing pack',
      raci: { responsible: ['Project Architect'] },
      timeEstimate: '2h', timeAfterAI: '10min', state: 'accelerated', aiFlag: true, aiType: 'LLM (text/script generation)',
      tool: 'LLM + Notion', input: 'RFP PDF + client background', output: 'Meeting agenda + briefing pack',
      deliverableType: 'doc',
    }},
    { id: 'aa2', type: 'task', position: { x: 290, y: 0   }, data: {
      label: 'Kickoff meeting',
      raci: { responsible: ['Project Architect'], accountable: 'Director', consulted: ['Client'] },
      timeEstimate: '2h', state: 'current', clientTouch: true,
      tool: 'Zoom / In-person', input: 'Briefing pack + attendees', output: 'Meeting recording + raw notes',
    }},
    { id: 'aa3', type: 'task', position: { x: 550, y: 0   }, data: {
      label: 'Transcribe & diarise',
      raci: { responsible: ['Project Architect'] },
      timeEstimate: '3h', timeAfterAI: '5min', state: 'accelerated', aiFlag: true, aiType: 'LLM (text/script generation)',
      tool: 'Whisper + speaker diarisation', dataHandling: 'Recording stored internally — deleted after transcription',
      input: 'Meeting recording', output: 'Timestamped transcript + speaker labels',
      deliverableType: 'doc',
    }},
    { id: 'aa4', type: 'task', position: { x: 30,  y: 220 }, data: {
      label: 'Extract constraints & deliverables',
      raci: { responsible: ['Project Architect'] },
      timeEstimate: '4h', timeAfterAI: '15min', state: 'accelerated', aiFlag: true, aiType: 'LLM (text/script generation)',
      tool: 'Claude + RFP cross-reference', input: 'Transcript + RFP PDF', output: 'Constraints / deliverables / deadlines list',
      deliverableType: 'dataset',
    }},
    { id: 'aa5', type: 'task', position: { x: 290, y: 220 }, data: {
      label: 'Draft structured brief',
      raci: { responsible: ['Project Architect'] },
      timeEstimate: '4h', timeAfterAI: '30min', state: 'accelerated', aiFlag: true, aiType: 'LLM (text/script generation)',
      tool: 'LLM + Notion template', input: 'Extracted requirements', output: 'Draft brief document',
      deliverableType: 'doc',
    }},
    { id: 'aa6', type: 'review', position: { x: 550, y: 220 }, data: {
      label: 'Client brief sign-off',
      raci: { responsible: ['Client'], accountable: 'Director' },
      timeEstimate: '2h', state: 'current', clientTouch: true, riskLevel: 'critical',
      tool: 'Email / DocuSign', input: 'Draft brief', output: 'Approved brief',
      deliverableType: 'signoff',
    }},
  ],
  edges: seq(['aa1','aa2','aa3','aa4','aa5','aa6']),
};

// 6 nodes → 3-wide grid
const siteChildFlow = {
  nodes: [
    { id: 'sa1', type: 'task', position: { x: 30,  y: 0   }, data: {
      label: 'Pull GIS / LiDAR data',
      raci: { responsible: ['BIM Manager'] },
      timeEstimate: '4h', timeAfterAI: '10min', state: 'accelerated', aiFlag: true, aiType: 'Automation / scripting',
      tool: 'Scripted API — OS / Digimap', dataHandling: 'OS data — licensed',
      input: 'Site address + grid ref', output: 'Raw GIS, LiDAR, Ordnance data',
      deliverableType: 'dataset',
    }},
    { id: 'sa2', type: 'task', position: { x: 290, y: 0   }, data: {
      label: 'Auto-generate context mesh',
      raci: { responsible: ['BIM Manager'] },
      timeEstimate: '16h', timeAfterAI: '1h', state: 'accelerated', aiFlag: true, aiType: 'Parametric / computational',
      tool: 'Grasshopper / Raven', input: 'GIS + LiDAR data', output: 'Context mesh + surrounding massing model',
      deliverableType: 'model',
    }},
    { id: 'sa3', type: 'task', position: { x: 550, y: 0   }, data: {
      label: 'Heritage + tree + flood overlay',
      raci: { responsible: ['BIM Manager'] },
      timeEstimate: '4h', timeAfterAI: '20min', state: 'accelerated', aiFlag: true, aiType: 'Automation / scripting',
      tool: 'Scripted GIS overlay', input: 'Context mesh', output: 'Constraint overlay + risk flags',
      deliverableType: 'drawing', riskLevel: 'medium',
    }},
    { id: 'sa4', type: 'task', position: { x: 30,  y: 220 }, data: {
      label: 'Daylight / sunlight / wind baseline',
      raci: { responsible: ['BIM Manager'] },
      timeEstimate: '8h', timeAfterAI: '1h', state: 'accelerated', aiFlag: true, aiType: 'Parametric / computational',
      tool: 'Ladybug + Honeybee', input: 'Context model', output: 'Environmental performance baseline',
      deliverableType: 'report',
    }},
    { id: 'sa5', type: 'task', position: { x: 290, y: 220 }, data: {
      label: 'Carbon & embodied baseline',
      raci: { responsible: ['BIM Manager'] },
      timeEstimate: '6h', timeAfterAI: '1h', state: 'accelerated', aiFlag: true, aiType: 'Parametric / computational',
      tool: 'Parametric LCA script', input: 'Massing model + materials', output: 'Embodied carbon baseline report',
      deliverableType: 'report',
    }},
    { id: 'sa6', type: 'output', position: { x: 550, y: 220 }, data: {
      label: 'Package context report',
      raci: { responsible: ['Senior Architect'] },
      timeEstimate: '4h', timeAfterAI: '30min', state: 'accelerated', aiFlag: true, aiType: 'LLM (text/script generation)',
      tool: 'LLM narrative + InDesign', input: 'All analysis outputs', output: 'Client-ready context report',
      deliverableType: 'report', clientTouch: true,
    }},
  ],
  edges: seq(['sa1','sa2','sa3','sa4','sa5','sa6']),
};

// 5 nodes → 3-wide grid (3+2 rows)
const massChildFlow = {
  nodes: [
    { id: 'cd1', type: 'task', position: { x: 30,  y: 0   }, data: {
      label: 'Define parametric constraints',
      raci: { responsible: ['Senior Architect'] },
      timeEstimate: '4h', state: 'current',
      tool: 'Grasshopper + brief review', input: 'Planning policy + brief', output: 'Constraint parameters (setbacks, plot ratios)',
    }},
    { id: 'cd2', type: 'task', position: { x: 290, y: 0   }, data: {
      label: 'Generate 50+ massing options',
      raci: { responsible: ['Senior Architect'] },
      timeEstimate: '2d', timeAfterAI: '4h', state: 'accelerated', aiFlag: true, aiType: 'Parametric / computational',
      tool: 'Galapagos / Wallacei', input: 'Parametric constraints', output: '50+ massing candidates',
      deliverableType: 'model',
    }},
    { id: 'cd3', type: 'task', position: { x: 550, y: 0   }, data: {
      label: 'Auto-score on daylight / carbon / cost',
      raci: { responsible: ['BIM Manager'] },
      timeEstimate: '1d', timeAfterAI: '1h', state: 'accelerated', aiFlag: true, aiType: 'Parametric / computational',
      tool: 'Parametric + scoring script', input: '50+ massing candidates', output: 'Ranked options with metrics',
      deliverableType: 'dataset',
    }},
    { id: 'cd4', type: 'review', position: { x: 30,  y: 220 }, data: {
      label: 'Human curation — 3–5 options',
      raci: { responsible: ['Senior Architect'], accountable: 'Director' },
      timeEstimate: '4h', state: 'current',
      input: 'Ranked massing options', output: '3–5 shortlisted design directions',
      deliverableType: 'doc',
    }},
    { id: 'cd5', type: 'output', position: { x: 290, y: 220 }, data: {
      label: 'Generate facade variations',
      raci: { responsible: ['Tech Architect'] },
      timeEstimate: '1d', timeAfterAI: '2h', state: 'accelerated', aiFlag: true, aiType: 'Generative image / render',
      tool: 'SDXL / Midjourney img2img', input: 'Shortlisted options', output: 'Facade variation images per option',
      deliverableType: 'render',
    }},
  ],
  edges: seq(['cd1','cd2','cd3','cd4','cd5']),
};

// 5 nodes → 3-wide grid (3+2 rows)
const wsChildFlow = {
  nodes: [
    { id: 'ws1', type: 'task', position: { x: 30,  y: 0   }, data: {
      label: 'Assemble source corpus',
      raci: { responsible: ['Project Architect'] },
      timeEstimate: '4h', timeAfterAI: '30min', state: 'accelerated', aiFlag: true, aiType: 'Automation / scripting',
      tool: 'Script + Notion', dataHandling: 'Policy corpus — anonymised before LLM',
      input: 'Brief + policy + precedents + model extracts', output: 'Tagged source corpus',
      deliverableType: 'dataset',
    }},
    { id: 'ws2', type: 'task', position: { x: 290, y: 0   }, data: {
      label: 'LLM draft each statement',
      raci: { responsible: ['Project Architect'] },
      timeEstimate: '1w', timeAfterAI: '2h', state: 'accelerated', aiFlag: true, aiType: 'LLM (text/script generation)',
      tool: 'Claude + RAG over corpus', dataHandling: 'Policy data only — no personal data',
      input: 'Source corpus + statement templates', output: 'Draft D&A + Planning + Heritage statements',
      deliverableType: 'doc',
    }},
    { id: 'ws3', type: 'review', position: { x: 550, y: 0   }, data: {
      label: 'Human edit & fact-check',
      raci: { responsible: ['Project Architect'], accountable: 'Director' },
      timeEstimate: '2d', timeAfterAI: '1d', state: 'accelerated',
      tool: 'Word + track changes', input: 'LLM draft statements', output: 'Reviewed + approved statements',
      deliverableType: 'doc',
    }},
    { id: 'ws4', type: 'task', position: { x: 30,  y: 220 }, data: {
      label: 'Image selection & captions',
      raci: { responsible: ['Project Architect'] },
      timeEstimate: '1d', timeAfterAI: '2h', state: 'accelerated', aiFlag: true, aiType: 'LLM (text/script generation)',
      tool: 'LLM caption generation', input: 'Renders + photos + drawings', output: 'Selected images with captions',
      deliverableType: 'render',
    }},
    { id: 'ws5', type: 'output', position: { x: 290, y: 220 }, data: {
      label: 'InDesign auto-layout',
      raci: { responsible: ['Project Architect'] },
      timeEstimate: '1d', timeAfterAI: '2h', state: 'accelerated', aiFlag: true, aiType: 'Automation / scripting',
      tool: 'InDesign + auto-flow script', input: 'Text + images', output: 'Final planning submission PDFs',
      deliverableType: 'doc',
    }},
  ],
  edges: seq(['ws1','ws2','ws3','ws4','ws5']),
};

// ── Root nodes ─────────────────────────────────────────────────
// Layout: 2-wide phases (4 nodes) = col0 x+30, col1 x+290, row stride 220
//         3-wide phases (6 nodes) = col0 x+30, col1 x+290, col2 x+550
export const defaultNodes = [
  // ── STAGE 1 — Acquisition & Brief (colMin=0) ──
  { id: 'n1', type: 'task', position: { x: 30,  y: 0   }, data: {
    label: 'Lead intake',
    phase: 'stage1',
    raci: { responsible: ['BD Associate'], accountable: 'Partner' },
    timeEstimate: '2h', timeAfterAI: '20min', state: 'accelerated', aiFlag: true, aiType: 'LLM (text/script generation)',
    tool: 'HubSpot + LLM scoring', dataHandling: 'GDPR — lead data pseudonymised',
    input: 'Initial enquiry / referral', output: 'Qualified lead record',
    deliverableType: 'dataset', clientTouch: true,
  }},
  { id: 'n2', type: 'task', position: { x: 290, y: 0   }, data: {
    label: 'Tender / competition scan',
    phase: 'stage1',
    raci: { responsible: ['BD Associate'], accountable: 'Partner' },
    timeEstimate: 'Ongoing', state: 'automated', aiFlag: true, aiType: 'Automation / scripting',
    tool: 'Scraper + LLM filter', dataHandling: 'Public procurement data only',
    input: 'Public portals', output: 'Shortlisted opportunities',
    deliverableType: 'report',
  }},
  { id: 'n3', type: 'task', position: { x: 30,  y: 220 }, data: {
    label: 'Fit & fee proposal',
    phase: 'stage1',
    raci: { responsible: ['Project Architect'], accountable: 'Partner', informed: ['Client'] },
    timeEstimate: '2d', timeAfterAI: '4h', state: 'accelerated', aiFlag: true, aiType: 'LLM (text/script generation)',
    tool: 'LLM draft → InDesign polish',
    input: 'Brief doc + lead qualification', output: 'Signed proposal + fee schedule',
    deliverableType: 'doc', clientTouch: true, riskLevel: 'medium',
  }},
  { id: 'n4', type: 'task', position: { x: 290, y: 220 }, data: {
    label: 'Kickoff & brief capture',
    phase: 'stage1',
    raci: { responsible: ['Project Architect'], accountable: 'Director', consulted: ['Client'] },
    timeEstimate: '1d', timeAfterAI: '1.5h', state: 'accelerated', aiFlag: true, aiType: 'LLM (text/script generation)',
    tool: 'Whisper + Claude + Notion', dataHandling: 'Meeting recording — client consent required',
    input: 'Meeting audio + RFP PDF', output: 'Structured brief doc',
    deliverableType: 'doc', clientTouch: true, riskLevel: 'medium',
    childFlow: briefChildFlow, childPhases: briefChildPhases,
  }},

  // ── STAGE 2 — Analysis & Strategy (colMin=560) ──
  { id: 'n5', type: 'task', position: { x: 590, y: 0   }, data: {
    label: 'Site / context analysis',
    phase: 'stage2',
    raci: { responsible: ['BIM Manager'], accountable: 'Senior Architect', consulted: ['Project Architect'] },
    timeEstimate: '3d', timeAfterAI: '4h', state: 'accelerated', aiFlag: true, aiType: 'Parametric / computational',
    tool: 'Grasshopper / Raven + Ladybug', dataHandling: 'OS / LiDAR data — licensed',
    input: 'Site address + survey data', output: 'Context model + environmental baseline',
    deliverableType: 'model', riskLevel: 'medium',
    childFlow: siteChildFlow, childPhases: siteChildPhases,
  }},
  { id: 'n6', type: 'task', position: { x: 850, y: 0   }, data: {
    label: 'Planning policy scan',
    phase: 'stage2',
    raci: { responsible: ['Project Architect'], consulted: ['Planning Consultant'] },
    timeEstimate: '2d', timeAfterAI: '2h', state: 'accelerated', aiFlag: true, aiType: 'LLM (text/script generation)',
    tool: 'LLM over local plan PDFs', dataHandling: 'Public planning documents only',
    input: 'Site + use class', output: 'Applicable policy summary + risks',
    deliverableType: 'report',
  }},
  { id: 'n7', type: 'task', position: { x: 590, y: 220 }, data: {
    label: 'Stakeholder & constraints map',
    phase: 'stage2',
    raci: { responsible: ['Project Architect'] },
    timeEstimate: '1d', timeAfterAI: '2h', state: 'accelerated', aiFlag: true, aiType: 'LLM (text/script generation)',
    tool: 'Miro + LLM clustering', dataHandling: 'Stakeholder names — internal only',
    input: 'Brief + site analysis + policy', output: 'RACI + constraint register',
    deliverableType: 'dataset',
  }},
  { id: 'n8', type: 'task', position: { x: 850, y: 220 }, data: {
    label: 'Plan of attack',
    phase: 'stage2',
    raci: { responsible: ['Project Architect'], accountable: 'Director' },
    timeEstimate: '1d', timeAfterAI: '4h', state: 'accelerated', aiFlag: true, aiType: 'Automation / scripting',
    tool: 'Notion + AI scheduler',
    input: 'Site analysis + policy + brief', output: 'WBS + Gantt + fee allocation',
    deliverableType: 'doc',
  }},

  // ── STAGE 3 — Concept & Planning (colMin=1120) ──
  { id: 'n9', type: 'task', position: { x: 1150, y: 0   }, data: {
    label: 'Massing & option studies',
    phase: 'stage3',
    raci: { responsible: ['Senior Architect'] },
    timeEstimate: '1w', timeAfterAI: '2d', state: 'accelerated', aiFlag: true, aiType: 'Parametric / computational',
    tool: 'Rhino + Grasshopper', dataHandling: 'Parametric model — confidential',
    input: 'Brief + context model + policy', output: '3–5 massing options with metrics',
    deliverableType: 'model', riskLevel: 'medium',
    childFlow: massChildFlow, childPhases: massChildPhases,
  }},
  { id: 'n10', type: 'task', position: { x: 1410, y: 0   }, data: {
    label: 'Concept visualisation',
    phase: 'stage3',
    raci: { responsible: ['Tech Architect'] },
    timeEstimate: '4d', timeAfterAI: '1d', state: 'accelerated', aiFlag: true, aiType: 'Generative image / render',
    tool: 'D5 + SDXL / Midjourney',
    input: 'Favoured massing option', output: 'Client-ready renders',
    deliverableType: 'render', clientTouch: true,
  }},
  { id: 'n11', type: 'task', position: { x: 1150, y: 220 }, data: {
    label: 'Pre-application pack',
    phase: 'stage3',
    raci: { responsible: ['Project Architect'], consulted: ['Planning Consultant'] },
    timeEstimate: '3d', timeAfterAI: '1d', state: 'accelerated', aiFlag: true, aiType: 'LLM (text/script generation)',
    tool: 'InDesign + LLM narrative',
    input: 'Concept design + renders', output: 'Pre-app submission PDF',
    deliverableType: 'doc', riskLevel: 'medium',
  }},
  { id: 'n12', type: 'review', position: { x: 1410, y: 220 }, data: {
    label: 'Client review & sign-off gate',
    phase: 'stage3',
    raci: { accountable: 'Director', responsible: ['Client'] },
    timeEstimate: '6h', timeAfterAI: '4h 10min', state: 'accelerated', aiFlag: true, aiType: 'LLM (Action extraction)',
    tool: 'InDesign + Whisper', dataHandling: 'Meeting recording — client consent',
    input: 'Concept pack + renders', output: 'Approved direction + action items',
    deliverableType: 'signoff', clientTouch: true, riskLevel: 'critical',
  }},

  // ── STAGE 4 — Production & Submission (colMin=1680) ──
  { id: 'n13', type: 'task', position: { x: 1710, y: 0   }, data: {
    label: 'Developed design & BIM production',
    phase: 'stage4',
    raci: { responsible: ['BIM Modeler'], accountable: 'Tech Architect' },
    timeEstimate: '2w', timeAfterAI: '4d', state: 'accelerated', aiFlag: true, aiType: 'Automation / scripting',
    tool: 'Revit + Dynamo + pyRevit', dataHandling: 'BIM model — access controlled',
    input: 'Approved concept + brief', output: 'Coordinated Revit model',
    deliverableType: 'model', riskLevel: 'medium',
  }},
  { id: 'n14', type: 'task', position: { x: 1970, y: 0   }, data: {
    label: 'Planning drawing set',
    phase: 'stage4',
    raci: { responsible: ['Tech Architect'] },
    timeEstimate: '1w', timeAfterAI: '2d', state: 'accelerated', aiFlag: true, aiType: 'Automation / scripting',
    tool: 'Revit + plugin auto-sheets',
    input: 'BIM model', output: 'GAs, elevations, sections, details',
    deliverableType: 'drawing',
  }},
  { id: 'n15', type: 'task', position: { x: 2230, y: 0   }, data: {
    label: 'Written statements pack',
    phase: 'stage4',
    raci: { responsible: ['Project Architect'], consulted: ['Planning Consultant'] },
    timeEstimate: '1w', timeAfterAI: '1d', state: 'accelerated', aiFlag: true, aiType: 'LLM (text/script generation)',
    tool: 'LLM over policy corpus', dataHandling: 'Policy corpus — anonymised before LLM',
    input: 'Design + policy scan + precedents', output: 'D&A + Planning + Heritage statements',
    deliverableType: 'doc',
    childFlow: wsChildFlow, childPhases: wsChildPhases,
  }},
  { id: 'n16', type: 'handoff', position: { x: 1710, y: 220 }, data: {
    label: 'Consultant coordination',
    phase: 'stage4',
    raci: { responsible: ['Project Architect', 'Consultants'] },
    timeEstimate: '1w', timeAfterAI: '3d', state: 'accelerated', aiFlag: true, aiType: 'Automation / scripting',
    tool: 'PM tool + shared model', dataHandling: 'Model shared via secure cloud',
    input: 'Coordinated model', output: 'Signed-off transport, daylight, MEP & ecology reports',
    deliverableType: 'signoff',
  }},
  { id: 'n17', type: 'review', position: { x: 1970, y: 220 }, data: {
    label: 'Client sign-off gate',
    phase: 'stage4',
    raci: { accountable: 'Director', responsible: ['Client'] },
    timeEstimate: '2h', state: 'current',
    tool: 'Email / DocuSign',
    input: 'Full planning pack', output: 'Approval to submit',
    deliverableType: 'signoff', clientTouch: true, riskLevel: 'critical',
  }},
  { id: 'n18', type: 'output', position: { x: 2230, y: 220 }, data: {
    label: 'Submission & response management',
    phase: 'stage4',
    raci: { responsible: ['Admin'], accountable: 'Project Architect' },
    timeEstimate: '1d', timeAfterAI: '2h', state: 'accelerated', aiFlag: true, aiType: 'Automation / scripting',
    tool: 'Portal + LLM comment triage', dataHandling: 'Planning portal — public submission',
    input: 'Validated pack', output: 'Confirmed submission + LPA comment log',
    deliverableType: 'report', clientTouch: true,
  }},
];

// ── Root edges ─────────────────────────────────────────────────
export const defaultEdges = [
  // Stage 1 internal
  { id: 'e1-3',   source: 'n1',  target: 'n3',  animated: false },
  { id: 'e2-3',   source: 'n2',  target: 'n3',  animated: false },
  { id: 'e3-4',   source: 'n3',  target: 'n4',  animated: false },
  // Stage 1 → 2
  { id: 'e4-5',   source: 'n4',  target: 'n5',  animated: false },
  { id: 'e4-6',   source: 'n4',  target: 'n6',  animated: false },
  // Stage 2 internal
  { id: 'e5-7',   source: 'n5',  target: 'n7',  animated: false },
  { id: 'e6-7',   source: 'n6',  target: 'n7',  animated: false },
  { id: 'e7-8',   source: 'n7',  target: 'n8',  animated: false },
  // Stage 2 → 3
  { id: 'e8-9',   source: 'n8',  target: 'n9',  animated: false },
  // Stage 3 internal
  { id: 'e9-10',  source: 'n9',  target: 'n10', animated: false },
  { id: 'e9-11',  source: 'n9',  target: 'n11', animated: false },
  { id: 'e10-12', source: 'n10', target: 'n12', animated: false },
  { id: 'e11-12', source: 'n11', target: 'n12', animated: false },
  // Stage 3 → 4
  { id: 'e12-13', source: 'n12', target: 'n13', animated: false },
  // Stage 4 internal
  { id: 'e13-14', source: 'n13', target: 'n14', animated: false },
  { id: 'e13-15', source: 'n13', target: 'n15', animated: false },
  { id: 'e13-16', source: 'n13', target: 'n16', animated: false },
  { id: 'e14-17', source: 'n14', target: 'n17', animated: false },
  { id: 'e15-17', source: 'n15', target: 'n17', animated: false },
  { id: 'e16-17', source: 'n16', target: 'n17', animated: false },
  { id: 'e17-18', source: 'n17', target: 'n18', animated: false },
];
