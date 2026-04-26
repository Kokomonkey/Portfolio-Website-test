# FlowScan — What's New

## Node data model extension

Every node now supports a richer data model:

- **Input / Output artifacts** — IN and OUT rows displayed below the tool line, with a deliverable-type icon (doc, render, drawing, dataset, signoff, report, model)
- **RACI roles** — R/A/C/I chips replace the plain owner row when `raci` data is present; hover reveals full names
- **Client touchpoint** — blue person icon in the node header when `clientTouch: true`
- **Risk level** — `critical` nodes pulse with a red animated halo; `medium` nodes carry a static amber ring
- **Data-handling tooltip** — hover the tool row to see the data-handling note (e.g. GDPR status)
- **Time pill** — accelerated nodes show `[As-Is] → [To-Be] −X%` inline

## Value strip

A dismissible green banner above the canvas (To-Be mode only) shows total time saved across the workflow: *"This workflow saves ~N working days — from X down to Y (Z% reduction)."*

## Properties panel

All new fields are editable in the side panel: Input, Output, Deliverable Type, Data Handling, RACI (four sub-fields), Client Touchpoint toggle, Risk Level selector.

## Visual / structural

- Phase swim-lane columns auto-size from node positions (no hardcoded widths)
- Child workflows use a dark background (`#16192a`) with sharp-cornered nodes (`border-radius: 2px`)
- Loading bar intro screen replaces the staggered node-appear animation
- `nodeParts.jsx` extracted from `BaseNode.jsx` to keep components under 350 lines
