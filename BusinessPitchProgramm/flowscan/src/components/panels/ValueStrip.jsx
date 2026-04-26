import { useState } from 'react';
import { X, TrendingDown } from 'lucide-react';
import { parseHours, formatHours } from '../../utils/timeParser';

function computeSavings(nodes) {
  let asIs = 0, toBe = 0;
  nodes.forEach(n => {
    const h = parseHours(n.data?.timeEstimate);
    if (!h) return;
    asIs += h;
    if (n.data?.state === 'eliminated') return;
    const eff = (n.data?.state === 'accelerated' && n.data?.timeAfterAI)
      ? n.data.timeAfterAI : n.data?.timeEstimate;
    const oh = parseHours(eff);
    if (oh) toBe += oh;
  });
  return { asIs, toBe, saved: asIs - toBe };
}

export function ValueStrip({ nodes, toBeMode }) {
  const [dismissed, setDismissed] = useState(false);
  if (!toBeMode || dismissed) return null;

  const { asIs, toBe, saved } = computeSavings(nodes);
  if (saved <= 0 || asIs === 0) return null;

  const daysSaved = (saved / 8).toFixed(1);
  const pct = Math.round((saved / asIs) * 100);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      padding: '7px 16px',
      background: 'linear-gradient(90deg, #14532d, #166534)',
      borderBottom: '1px solid #16a34a55',
      fontSize: 12, color: '#bbf7d0', fontWeight: 500,
      position: 'relative', flexShrink: 0,
    }}>
      <TrendingDown size={14} color="#4ade80" />
      <span>
        This workflow saves{' '}
        <strong style={{ color: '#4ade80' }}>~{daysSaved} working days</strong>
        {' '}— from{' '}
        <span style={{ color: '#86efac' }}>{formatHours(asIs)}</span>
        {' '}down to{' '}
        <span style={{ color: '#4ade80' }}>{formatHours(toBe)}</span>
        {' '}
        <span style={{ fontSize: 11, opacity: 0.75 }}>({pct}% reduction)</span>
      </span>
      <button
        onClick={() => setDismissed(true)}
        style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          background: 'transparent', border: 'none', color: '#4ade80',
          cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center',
        }}
      >
        <X size={12} />
      </button>
    </div>
  );
}
