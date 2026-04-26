import {
  FileText, Image, Ruler, Database, CheckCircle2,
  FileBarChart, Box, ArrowRight,
} from 'lucide-react';
import { parseHours } from '../../utils/timeParser';

const DELIVERABLE_ICONS = {
  doc:     FileText,
  render:  Image,
  drawing: Ruler,
  dataset: Database,
  signoff: CheckCircle2,
  report:  FileBarChart,
  model:   Box,
};

const RACI_META = {
  R: { label: 'Responsible', color: '#3b82f6', bg: '#eff6ff' },
  A: { label: 'Accountable', color: '#f97316', bg: '#fff7ed' },
  C: { label: 'Consulted',   color: '#8b5cf6', bg: '#f5f3ff' },
  I: { label: 'Informed',    color: '#6b7280', bg: '#f9fafb' },
};

// ── Time pill: [As-Is] → [To-Be] −X% ─────────────────────────
export function TimePill({ timeEstimate, timeAfterAI, isAccelerated }) {
  if (!timeEstimate) return null;

  if (isAccelerated && timeAfterAI) {
    const before = parseHours(timeEstimate);
    const after  = parseHours(timeAfterAI);
    const pct    = (before && after && before > 0) ? Math.round((1 - after / before) * 100) : null;

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
        <span style={{ padding: '1px 5px', background: '#f3f4f6', borderRadius: 3, fontSize: 10, color: '#9ca3af', fontWeight: 500 }}>
          {timeEstimate}
        </span>
        <ArrowRight size={9} color="#22c55e" />
        <span style={{ padding: '1px 5px', background: '#dcfce7', borderRadius: 3, fontSize: 10, color: '#15803d', fontWeight: 700 }}>
          {timeAfterAI}
        </span>
        {pct !== null && pct > 0 && (
          <span style={{ padding: '1px 4px', background: '#22c55e', borderRadius: 3, fontSize: 9, color: '#fff', fontWeight: 800 }}>
            −{pct}%
          </span>
        )}
      </div>
    );
  }

  return <span style={{ fontSize: 11, color: '#6b7280' }}>{timeEstimate}</span>;
}

// ── IN / OUT artifact rows ─────────────────────────────────────
export function InputOutputRows({ input, output, deliverableType }) {
  if (!input && !output) return null;
  const Icon = DELIVERABLE_ICONS[deliverableType];

  const row = (tag, text, color, icon) => (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 5,
      borderLeft: `2px solid ${color}`, paddingLeft: 5,
    }}>
      <span style={{ fontSize: 8, fontWeight: 800, color, letterSpacing: '0.06em', marginTop: 1, flexShrink: 0 }}>
        {tag}
      </span>
      {icon && <icon.type {...icon.props} style={{ marginTop: 1, flexShrink: 0 }} />}
      <span style={{
        fontSize: 10, color: '#6b7280', lineHeight: 1.3,
        fontFamily: "'ui-monospace','SFMono-Regular',monospace",
      }}>
        {text}
      </span>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 5, paddingTop: 5, borderTop: '1px solid #f1f5f9' }}>
      {input  && row('IN',  input,  '#3b82f6', null)}
      {output && row('OUT', output, '#22c55e', Icon ? <Icon size={10} color="#22c55e" /> : null)}
    </div>
  );
}

// ── RACI chip row ──────────────────────────────────────────────
export function RaciChips({ raci, fallbackOwner }) {
  if (!raci) {
    if (!fallbackOwner) return null;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#6b7280', marginBottom: 2 }}>
        <span style={{ fontSize: 9, fontWeight: 700, color: '#3b82f6' }}>R</span>
        <span>{fallbackOwner}</span>
      </div>
    );
  }

  const entries = [
    { key: 'R', values: raci.responsible ?? [] },
    { key: 'A', values: raci.accountable ? [raci.accountable] : [] },
    { key: 'C', values: raci.consulted   ?? [] },
    { key: 'I', values: raci.informed    ?? [] },
  ].filter(e => e.values.length > 0);

  if (entries.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 3 }}>
      {entries.map(({ key, values }) => {
        const meta = RACI_META[key];
        return (
          <span
            key={key}
            title={`${meta.label}: ${values.join(', ')}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 2,
              padding: '1px 5px', borderRadius: 3,
              background: meta.bg, border: `1px solid ${meta.color}33`,
              fontSize: 10, color: '#4b5563', cursor: 'default',
            }}
          >
            <span style={{ fontWeight: 800, color: meta.color, fontSize: 9 }}>{key}</span>
            {values[0].slice(0, 14)}
          </span>
        );
      })}
    </div>
  );
}
