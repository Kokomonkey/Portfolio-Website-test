import { useState } from 'react';
import { ChevronLeft, ChevronRight, Zap, BarChart2, TrendingDown } from 'lucide-react';
import { calculateSummary } from '../../utils/summaryCalculator';

const TYPE_COLORS = {
  'LLM (text/script generation)':  '#6366f1',
  'Generative image / render':      '#ec4899',
  'Parametric / computational':     '#14b8a6',
  'Automation / scripting':         '#f97316',
  'Data extraction / structuring':  '#8b5cf6',
};

export function SummaryPanel({ nodes, toBeMode }) {
  const [collapsed, setCollapsed] = useState(false);
  const s = calculateSummary(nodes, toBeMode);

  if (collapsed) {
    return (
      <div style={{ ...panelStyle, width: 40, padding: '16px 8px', alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button onClick={() => setCollapsed(false)} style={iconBtnStyle} title="Expand summary">
          <ChevronRight size={16} />
        </button>
        <BarChart2 size={16} color="#6366f1" />
      </div>
    );
  }

  const scoreColor = s.impactScore >= 50 ? '#22c55e' : s.impactScore >= 25 ? '#f59e0b' : '#6366f1';

  return (
    <div style={panelStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BarChart2 size={15} color="#6366f1" />
          <h3 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#f0f0f0' }}>Summary</h3>
        </div>
        <button onClick={() => setCollapsed(true)} style={iconBtnStyle} title="Collapse">
          <ChevronLeft size={14} />
        </button>
      </div>

      <Stat label="Total Steps" value={s.total} />
      <Stat label="AI Opportunities" value={s.aiCount} highlight />

      {toBeMode ? (
        /* To-Be mode: show before/after time savings */
        <div style={{ marginTop: 12 }}>
          <div style={{ borderTop: '1px solid #2d3148', paddingTop: 14, marginBottom: 12 }}>
            <p style={{ fontSize: 10, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 10px' }}>
              Time Analysis
            </p>
            {s.totalHours && <Stat label="As-Is Total" value={s.totalHours} />}
            {s.optimizedHours && <Stat label="To-Be Total" value={s.optimizedHours} highlight />}
            {s.timeSaved && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <TrendingDown size={12} color="#22c55e" />
                  <span style={{ fontSize: 12, color: '#9ca3af' }}>Time Saved</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#22c55e' }}>
                  {s.timeSaved} ({s.savingsPercent}%)
                </span>
              </div>
            )}
          </div>

          {/* AI Impact Score */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Impact</span>
              <span style={{ fontSize: 22, fontWeight: 700, color: '#22c55e' }}>{s.savingsPercent}%</span>
            </div>
            <div style={{ height: 7, background: '#1e2130', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: `${s.savingsPercent}%`, height: '100%', background: 'linear-gradient(90deg, #22c55e, #4ade80)', borderRadius: 4, transition: 'width 0.5s' }} />
            </div>
            <p style={{ fontSize: 10, color: '#6b7280', marginTop: 4 }}>efficiency gain from AI interventions</p>
          </div>
        </div>
      ) : (
        /* As-Is mode: standard display */
        <div>
          {s.totalHours && <Stat label="Total Est. Time" value={s.totalHours} />}
          {s.aiHours && <Stat label="Time in AI Nodes" value={s.aiHours} highlight />}

          <div style={{ marginTop: 16, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Impact Score</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: scoreColor }}>{s.impactScore}%</span>
            </div>
            <div style={{ height: 6, background: '#1e2130', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${s.impactScore}%`, height: '100%', background: scoreColor, borderRadius: 3, transition: 'width 0.4s' }} />
            </div>
            <p style={{ fontSize: 10, color: '#6b7280', marginTop: 4 }}>% of time in AI-flagged nodes</p>
          </div>
        </div>
      )}

      {/* Type breakdown */}
      {Object.keys(s.typeCounts).length > 0 && (
        <div style={{ borderTop: '1px solid #2d3148', paddingTop: 14 }}>
          <p style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10, margin: 0 }}>
            By Opportunity Type
          </p>
          {Object.entries(s.typeCounts).map(([type, count]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: TYPE_COLORS[type] || '#6366f1', flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: '#d1d5db', flex: 1 }}>{type}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#f0f0f0' }}>{count}×</span>
            </div>
          ))}
        </div>
      )}

      {s.aiCount === 0 && (
        <div style={{ marginTop: 16, padding: '12px', background: '#1e2130', borderRadius: 8, textAlign: 'center' }}>
          <Zap size={20} color="#374151" style={{ margin: '0 auto 6px' }} />
          <p style={{ fontSize: 11, color: '#6b7280', margin: 0 }}>No AI opportunities flagged yet</p>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, highlight }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <span style={{ fontSize: 12, color: '#9ca3af' }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: highlight ? '#f59e0b' : '#f0f0f0' }}>{value}</span>
    </div>
  );
}

const panelStyle = {
  width: 220,
  background: '#161b2e',
  borderRight: '1px solid #2d3148',
  padding: '20px 14px',
  overflowY: 'auto',
  flexShrink: 0,
};

const iconBtnStyle = {
  background: 'transparent', border: 'none', color: '#6b7280',
  cursor: 'pointer', padding: 4, borderRadius: 4,
  display: 'flex', alignItems: 'center',
};
