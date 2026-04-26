import { useCallback } from 'react';
import { toPng } from 'html-to-image';
import { getNodesBounds, getViewportForBounds } from '@xyflow/react';
import { parseHours, formatHours } from '../utils/timeParser';

const STAGE_LABELS = {
  stage1: 'STAGE 1 — Acquisition & Brief',
  stage2: 'STAGE 2 — Analysis & Strategy',
  stage3: 'STAGE 3 — Concept & Planning',
  stage4: 'STAGE 4 — Production & Submission',
};
const STAGE_COLORS = {
  stage1: '#3b82f6', stage2: '#10b981', stage3: '#f59e0b', stage4: '#8b5cf6',
};
const STAGE_ORDER = ['stage1', 'stage2', 'stage3', 'stage4'];

function buildSummaryHTML({ firmName, projectLabel, nodesByStage }) {
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const stageBlocks = STAGE_ORDER.map(stageId => {
    const stageNodes = nodesByStage[stageId] || [];
    if (!stageNodes.length) return '';
    const color = STAGE_COLORS[stageId];
    const label = STAGE_LABELS[stageId];

    const rows = stageNodes.map(n => {
      const d = n.data;
      const responsible = d.raci?.responsible?.join(', ') || d.owner || '—';
      const asIs = d.timeEstimate || '—';
      const isAcc = d.state === 'accelerated' && d.timeAfterAI;
      const toBe = isAcc ? d.timeAfterAI : '—';
      const hBefore = parseHours(d.timeEstimate);
      const hAfter = isAcc ? parseHours(d.timeAfterAI) : null;
      const pct = (hBefore && hAfter && hBefore > 0) ? Math.round((1 - hAfter / hBefore) * 100) : null;
      const stateLabel = d.state !== 'current' ? d.state : '';
      const risk = d.riskLevel || '';
      return `
        <tr>
          <td style="font-weight:600;color:#111">${d.label || '—'}</td>
          <td>${responsible}</td>
          <td style="text-align:center">${asIs}</td>
          <td style="text-align:center;color:${isAcc ? '#15803d' : '#6b7280'}">${toBe}</td>
          <td style="text-align:center;font-weight:700;color:#15803d">${pct !== null ? `-${pct}%` : '—'}</td>
          <td style="font-size:11px;color:#374151">${d.tool || '—'}</td>
          <td style="text-align:center;font-size:11px;color:${risk === 'critical' ? '#ef4444' : risk === 'medium' ? '#f59e0b' : '#9ca3af'}">${risk || '—'}</td>
          <td style="text-align:center;font-size:11px;color:#6366f1;text-transform:capitalize">${stateLabel || '—'}</td>
        </tr>`;
    }).join('');

    return `
      <tr><td colspan="8" style="padding:14px 10px 6px;background:${color}14;border-top:3px solid ${color}">
        <span style="font-size:12px;font-weight:800;color:${color};letter-spacing:.1em;text-transform:uppercase">${label}</span>
      </td></tr>
      <tr style="background:#f8f9fc;font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:.06em">
        <th style="padding:5px 10px;text-align:left;font-weight:600">Step</th>
        <th style="padding:5px 10px;text-align:left;font-weight:600">Owner (R)</th>
        <th style="padding:5px;text-align:center;font-weight:600">As-Is</th>
        <th style="padding:5px;text-align:center;font-weight:600">To-Be</th>
        <th style="padding:5px;text-align:center;font-weight:600">Saving</th>
        <th style="padding:5px 10px;text-align:left;font-weight:600">Tool</th>
        <th style="padding:5px;text-align:center;font-weight:600">Risk</th>
        <th style="padding:5px;text-align:center;font-weight:600">State</th>
      </tr>
      ${rows}`;
  }).join('');

  // compute total savings
  const allNodes = Object.values(nodesByStage).flat();
  let totalAsIs = 0, totalToBe = 0;
  allNodes.forEach(n => {
    const h = parseHours(n.data?.timeEstimate);
    if (!h) return;
    totalAsIs += h;
    if (n.data?.state === 'eliminated') return;
    const eff = (n.data?.state === 'accelerated' && n.data?.timeAfterAI) ? n.data.timeAfterAI : n.data?.timeEstimate;
    const oh = parseHours(eff);
    if (oh) totalToBe += oh;
  });
  const savedH = totalAsIs - totalToBe;
  const savedDays = (savedH / 8).toFixed(1);
  const pctTotal = totalAsIs > 0 ? Math.round((savedH / totalAsIs) * 100) : 0;

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>FlowScan Summary — ${firmName}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', system-ui, sans-serif; color: #111; background: #fff; padding: 32px; font-size: 13px; }
  h1 { font-size: 22px; font-weight: 800; color: #111; margin-bottom: 2px; }
  .meta { font-size: 12px; color: #6b7280; margin-bottom: 20px; }
  .savings { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 18px; margin-bottom: 24px; font-size: 13px; color: #166534; }
  .savings strong { font-size: 18px; }
  table { width: 100%; border-collapse: collapse; }
  td, th { padding: 7px 10px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
  tr:hover td { background: #f8faff; }
  @media print {
    body { padding: 16px; }
    .savings { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    td, th { padding: 5px 8px; }
  }
</style>
</head><body>
<h1>FlowScan — AI Opportunity Summary</h1>
<div class="meta">${firmName} &nbsp;·&nbsp; ${projectLabel} &nbsp;·&nbsp; Generated ${date}</div>
<div class="savings">
  Total savings (To-Be vs As-Is): <strong>~${savedDays} working days</strong>
  &nbsp;—&nbsp; from <b>${formatHours(totalAsIs)}</b> down to <b>${formatHours(totalToBe)}</b>
  &nbsp;<span style="font-size:13px;opacity:.75">(${pctTotal}% reduction)</span>
</div>
<table>
  ${stageBlocks}
</table>
<div style="margin-top:24px;font-size:10px;color:#9ca3af">Generated by FlowScan · ${date}</div>
</body></html>`;
}

function stripDisplayProps(node) {
  const { _dimmed, _mountDelay, _onDrillDown, ...rest } = node.data;
  return { ...node, data: rest };
}

export function useExport({ nodes, getRootFlowForExport, firmName, projectLabel, toBeMode }) {
  const exportJSON = useCallback(() => {
    const root = getRootFlowForExport();
    const data = {
      firmName,
      projectLabel,
      nodes: root.nodes.map(stripDisplayProps),
      edges: root.edges,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flowscan-${firmName.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [getRootFlowForExport, firmName, projectLabel]);

  const importJSON = useCallback((file, onLoad) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        onLoad(data);
      } catch {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  }, []);

  const exportPNG = useCallback(async () => {
    const nodesBounds = getNodesBounds(nodes);
    const padding = 80;
    const width = Math.max(nodesBounds.width + padding * 2, 400);
    const height = Math.max(nodesBounds.height + padding * 2, 300);
    const viewport = getViewportForBounds(nodesBounds, width, height, 0.5, 2, padding);

    const el = document.querySelector('.react-flow__viewport');
    if (!el) return;

    const dataUrl = await toPng(el, {
      backgroundColor: '#f8f9fc',
      width,
      height,
      style: {
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    });

    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `flowscan-${firmName.replace(/\s+/g, '-').toLowerCase()}.png`;
    a.click();
  }, [nodes, firmName]);

  const exportSummaryPDF = useCallback(() => {
    const root = getRootFlowForExport();
    const allNodes = root.nodes.map(stripDisplayProps);
    const nodesByStage = {};
    allNodes.forEach(n => {
      const s = n.data?.phase || 'other';
      if (!nodesByStage[s]) nodesByStage[s] = [];
      nodesByStage[s].push(n);
    });
    const html = buildSummaryHTML({ firmName, projectLabel, nodesByStage });
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 400);
  }, [getRootFlowForExport, firmName, projectLabel]);

  return { exportJSON, importJSON, exportPNG, exportSummaryPDF };
}
