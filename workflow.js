// workflow.js
module.exports = [
    {
      title: "1. Pre-Design",
      desc: "Strategic Definition & Discovery",
      tasks: [
        { title: "Client Intake & Programming", desc: "Visioning workshops, user-needs surveys, and developing room data sheets.", ai_refs: ["microsoft_copilot", "digital_blue_foam", "crosby_studios", "reimagine_home"] },
        { title: "Site & Regulatory Analysis", desc: "Topographic review, solar/climate analysis, and zoning audits.", ai_refs: ["testfit", "upcodes_copilot", "autodesk_forma", "polycam", "archistar", "aurivus"] },
        { title: "Environmental Benchmarking", desc: "Early stage carbon and climate data analysis.", ai_refs: ["cove_tool", "one_click_lca"] }
      ]
    },
    {
      title: "2. Schematic Design",
      desc: "Concept Formulation & Form",
      tasks: [
        { title: "Parti & Concept Generation", desc: "Creating guiding organizational principles, sketches, and mood boards.", ai_refs: ["stable_diffusion", "midjourney", "adobe_firefly", "lookx"] },
        { title: "Computational Optimization", desc: "Using evolutionary solvers to find optimal form logic.", ai_refs: ["hypar", "wallacei", "finch_3d"] },
        { title: "Massing & Spatial Studies", desc: "Drafting preliminary single-line plans and testing building scale.", ai_refs: ["snaptrude", "planfinder", "rayon"] },
        { title: "Visualization & VR", desc: "Producing renderings and VR walkthroughs.", ai_refs: ["krea_ai", "veras", "enscape", "d5_render", "arkio"] }
      ]
    },
    {
      title: "3. Design Development",
      desc: "Technical Refinement & Systems",
      tasks: [
        { title: "Federated Modeling", desc: "Integrating Structural and MEP models.", ai_refs: ["skema", "bricscad_bim", "augmenta"] },
        { title: "System Analysis", desc: "Energy, Carbon and Lighting performance validation.", ai_refs: ["cove_tool", "one_click_lca"] },
        { title: "Envelope & Interior Detailing", desc: "Refining wall sections, interior elevations, millwork, and waterproofing.", ai_refs: ["kaedim", "adobe_substance_3d", "stylib", "homestyler"] },
        { title: "Specifications", desc: "Selecting specific products and creating Outline Specifications.", ai_refs: ["specright", "deltek_specpoint"] }
      ]
    },
    {
      title: "4. Construction Docs",
      desc: "Technical Execution & Permitting",
      tasks: [
        { title: "Model Auditing & Clash", desc: "Checking the model for geometric conflicts and data integrity.", ai_refs: ["solibri", "navisworks"] },
        { title: "Production Drafting", desc: "Creating fully dimensioned and annotated working drawings.", ai_refs: ["swapp", "glyph", "vectorworks_ai"] },
        { title: "The Project Manual", desc: "Writing technical specifications using CSI MasterFormat.", ai_refs: ["pype_autospecs", "document_crunch"] },
        { title: "QA/QC & Permitting", desc: "Internal redline reviews and submission to Authorities.", ai_refs: ["bluebeam_revu"] }
      ]
    },
    {
      title: "5. Bidding & Negotiation",
      desc: "Procurement & Contracts",
      tasks: [
        { title: "Bid Management", desc: "Issuing bid sets and managing bidder RFIs.", ai_refs: ["downtobid", "smartbid", "procore"] },
        { title: "Bid Leveling & Analysis", desc: "Analyzing contractor bids for comparison.", ai_refs: ["alice_technologies", "togal_ai", "pelles_ai"] },
        { title: "Value Engineering (VE)", desc: "Identifying cost-saving alternatives.", ai_refs: ["join_build", "opencost"] }
      ]
    },
    {
      title: "6. Construction Admin",
      desc: "Construction Realization",
      tasks: [
        { title: "Site Observation", desc: "Regular site visits to verify work.", ai_refs: ["disperse", "openspace", "plangrid"] },
        { title: "Predictive Risk", desc: "Analyzing site data to prevent accidents.", ai_refs: ["newmetrix"] },
        { title: "Submittals & RFIs", desc: "Reviewing contractor samples and drawings.", ai_refs: ["newforma_konekt", "part3"] },
        { title: "Project Closeout", desc: "Punch List and Completion.", ai_refs: ["trunk_tools", "civils_ai"] }
      ]
    }
];