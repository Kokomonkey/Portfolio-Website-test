import { X, Trash2, Zap, Grid2x2 } from 'lucide-react';
import { NODE_TYPE_OPTIONS } from '../nodes/NodeTypes';

const DELIVERABLE_TYPES = ['doc', 'render', 'drawing', 'dataset', 'signoff', 'report', 'model'];
const RISK_LEVELS = ['none', 'medium', 'critical'];


const AI_TYPES = [
  'LLM (text/script generation)',
  'Generative image / render',
  'Parametric / computational',
  'Automation / scripting',
  'Data extraction / structuring',
];

const NODE_STATES = [
  { value: 'current',     label: 'Current',     color: '#6b7280' },
  { value: 'accelerated', label: 'Accelerated',  color: '#22c55e' },
  { value: 'eliminated',  label: 'Eliminated',   color: '#ef4444' },
  { value: 'automated',   label: 'Automated',    color: '#8b5cf6' },
  { value: 'reordered',   label: 'Reordered',    color: '#f59e0b' },
];

export function PropertiesPanel({ node, onUpdate, onDelete, onClose, onDrillDown }) {
  if (!node) return null;
  const d = node.data;
  const currentState = d.state || 'current';
  const hasChild = !!d.childFlow;

  const field = (label, key, placeholder = '', textarea = false) => (
    <div style={{ marginBottom: 12 }}>
      <label style={labelStyle}>{label}</label>
      {textarea ? (
        <textarea
          value={d[key] || ''}
          placeholder={placeholder}
          onChange={(e) => onUpdate(node.id, { [key]: e.target.value })}
          rows={3}
          style={inputStyle}
        />
      ) : (
        <input
          type="text"
          value={d[key] || ''}
          placeholder={placeholder}
          onChange={(e) => onUpdate(node.id, { [key]: e.target.value })}
          style={inputStyle}
        />
      )}
    </div>
  );

  return (
    <div style={panelStyle}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#f0f0f0' }}>Node Properties</h3>
        <button onClick={onClose} style={iconBtnStyle}><X size={14} /></button>
      </div>

      {/* Node type */}
      <div style={{ marginBottom: 14 }}>
        <label style={labelStyle}>Node Type</label>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {NODE_TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onUpdate(node.id, {}, opt.value)}
              style={{
                padding: '4px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer',
                border: `1.5px solid ${node.type === opt.value ? opt.color : '#2d3148'}`,
                background: node.type === opt.value ? `${opt.color}22` : 'transparent',
                color: node.type === opt.value ? opt.color : '#6b7280',
                fontWeight: node.type === opt.value ? 600 : 400,
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {field('Title', 'label', 'Step name...')}
      {field('Owner / Role', 'owner', 'e.g. Senior Architect')}
      {field('Time Estimate', 'timeEstimate', 'e.g. ~8hrs, 2 days')}
      {field('Tool Used', 'tool', 'e.g. Revit, Rhino, Email')}
      {field('Data Handling', 'dataHandling', 'e.g. GDPR — anonymised...')}
      {field('Notes', 'notes', 'Optional context...', true)}

      {/* Artifacts */}
      <div style={{ borderTop: '1px solid #2d3148', paddingTop: 14, marginTop: 4 }}>
        <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Artifacts
        </div>
        {field('Input artifact', 'input', 'e.g. Approved brief')}
        {field('Output artifact', 'output', 'e.g. Design package')}
        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Deliverable Type</label>
          <select
            value={d.deliverableType || ''}
            onChange={(e) => onUpdate(node.id, { deliverableType: e.target.value || null })}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="">— none —</option>
            {DELIVERABLE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* RACI */}
      <div style={{ borderTop: '1px solid #2d3148', paddingTop: 14, marginTop: 4 }}>
        <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          RACI
        </div>
        {['responsible', 'accountable', 'consulted', 'informed'].map(role => (
          <div key={role} style={{ marginBottom: 10 }}>
            <label style={labelStyle}>{role.charAt(0).toUpperCase()}{role.slice(1)}</label>
            <input
              type="text"
              value={role === 'accountable'
                ? (d.raci?.accountable || '')
                : (d.raci?.[role]?.join(', ') || '')}
              placeholder={role === 'accountable' ? 'Single person' : 'Comma-separated names'}
              onChange={(e) => {
                const val = e.target.value;
                const updated = { ...(d.raci || {}) };
                if (role === 'accountable') {
                  updated.accountable = val || null;
                } else {
                  updated[role] = val ? val.split(',').map(s => s.trim()).filter(Boolean) : [];
                }
                onUpdate(node.id, { raci: updated });
              }}
              style={inputStyle}
            />
          </div>
        ))}
      </div>

      {/* Flags */}
      <div style={{ borderTop: '1px solid #2d3148', paddingTop: 14, marginTop: 4, marginBottom: 4 }}>
        <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Flags
        </div>
        {/* Client touchpoint toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: '#9ca3af' }}>Client touchpoint</span>
          <button
            onClick={() => onUpdate(node.id, { clientTouch: !d.clientTouch })}
            style={{
              width: 36, height: 20, borderRadius: 10, border: 'none',
              background: d.clientTouch ? '#0ea5e9' : '#374151',
              cursor: 'pointer', position: 'relative', transition: 'background 0.2s', padding: 0,
            }}
          >
            <span style={{
              position: 'absolute', top: 2, left: d.clientTouch ? 18 : 2,
              width: 16, height: 16, borderRadius: '50%',
              background: '#fff', transition: 'left 0.2s',
            }} />
          </button>
        </div>
        {/* Risk level */}
        <div style={{ marginBottom: 4 }}>
          <label style={labelStyle}>Risk Level</label>
          <div style={{ display: 'flex', gap: 5 }}>
            {RISK_LEVELS.map(r => {
              const color = r === 'critical' ? '#ef4444' : r === 'medium' ? '#f59e0b' : '#6b7280';
              const current = d.riskLevel || 'none';
              return (
                <button
                  key={r}
                  onClick={() => onUpdate(node.id, { riskLevel: r === 'none' ? null : r })}
                  style={{
                    padding: '4px 9px', borderRadius: 6, fontSize: 10, cursor: 'pointer',
                    border: `1.5px solid ${current === r ? color : '#2d3148'}`,
                    background: current === r ? `${color}22` : 'transparent',
                    color: current === r ? color : '#6b7280',
                    fontWeight: current === r ? 600 : 400,
                    textTransform: 'capitalize',
                  }}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step State */}
      <div style={{ borderTop: '1px solid #2d3148', paddingTop: 16, marginTop: 4, marginBottom: 12 }}>
        <label style={labelStyle}>Step State (To-Be)</label>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {NODE_STATES.map((s) => (
            <button
              key={s.value}
              onClick={() => onUpdate(node.id, { state: s.value })}
              style={{
                padding: '4px 9px', borderRadius: 6, fontSize: 10, cursor: 'pointer',
                border: `1.5px solid ${currentState === s.value ? s.color : '#2d3148'}`,
                background: currentState === s.value ? `${s.color}22` : 'transparent',
                color: currentState === s.value ? s.color : '#6b7280',
                fontWeight: currentState === s.value ? 600 : 400,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* After-AI time — only shown when accelerated */}
      {currentState === 'accelerated' && (
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>After AI Time</label>
          <input
            type="text"
            value={d.timeAfterAI || ''}
            placeholder="e.g. 30min, 2hrs"
            onChange={(e) => onUpdate(node.id, { timeAfterAI: e.target.value })}
            style={{ ...inputStyle, borderColor: '#22c55e55' }}
          />
        </div>
      )}

      {/* AI Opportunity */}
      <div style={{ borderTop: '1px solid #2d3148', paddingTop: 16, marginTop: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Zap size={14} color={d.aiFlag ? '#f59e0b' : '#4b5563'} fill={d.aiFlag ? '#f59e0b' : 'none'} />
            <span style={{ fontSize: 13, color: d.aiFlag ? '#f59e0b' : '#9ca3af', fontWeight: 500 }}>
              AI Opportunity
            </span>
          </div>
          <button
            onClick={() => onUpdate(node.id, {
              aiFlag: !d.aiFlag,
              aiType: !d.aiFlag ? (d.aiType || AI_TYPES[0]) : null,
            })}
            style={{
              width: 36, height: 20, borderRadius: 10, border: 'none',
              background: d.aiFlag ? '#f59e0b' : '#374151',
              cursor: 'pointer', position: 'relative', transition: 'background 0.2s', padding: 0,
            }}
          >
            <span style={{
              position: 'absolute', top: 2, left: d.aiFlag ? 18 : 2,
              width: 16, height: 16, borderRadius: '50%',
              background: '#fff', transition: 'left 0.2s',
            }} />
          </button>
        </div>

        {d.aiFlag && (
          <div>
            <label style={labelStyle}>Opportunity Type</label>
            <select
              value={d.aiType || AI_TYPES[0]}
              onChange={(e) => onUpdate(node.id, { aiType: e.target.value })}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              {AI_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* Drill into child */}
      {hasChild && (
        <button
          onClick={onDrillDown}
          style={{
            marginTop: 16, width: '100%', padding: '8px',
            border: '1px solid #4338ca55', borderRadius: 8,
            background: '#4338ca11', color: '#818cf8', fontSize: 13, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          <Grid2x2 size={13} />
          Open Sub-workflow
        </button>
      )}

      {/* Delete */}
      <button
        onClick={() => { onDelete(node.id); onClose(); }}
        style={{
          marginTop: 10, width: '100%', padding: '8px',
          border: '1px solid #ef444455', borderRadius: 8,
          background: 'transparent', color: '#ef4444', fontSize: 13, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}
      >
        <Trash2 size={13} />
        Delete Node
      </button>
    </div>
  );
}

const panelStyle = {
  width: 280,
  background: '#161b2e',
  borderLeft: '1px solid #2d3148',
  padding: '20px 16px',
  overflowY: 'auto',
  flexShrink: 0,
};

const inputStyle = {
  width: '100%', padding: '7px 10px', borderRadius: 6,
  border: '1px solid #2d3148', background: '#0f1117',
  color: '#f0f0f0', fontSize: 13, outline: 'none',
  resize: 'vertical', fontFamily: 'inherit',
};

const labelStyle = {
  display: 'block', fontSize: 11, color: '#9ca3af',
  marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em',
};

const iconBtnStyle = {
  background: 'transparent', border: 'none', color: '#6b7280',
  cursor: 'pointer', padding: 4, borderRadius: 4,
  display: 'flex', alignItems: 'center',
};
