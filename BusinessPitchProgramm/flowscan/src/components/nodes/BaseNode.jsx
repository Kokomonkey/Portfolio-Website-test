import { Handle, Position } from '@xyflow/react';
import { Zap, Wrench, Grid2x2, ChevronRight, UserRound } from 'lucide-react';
import { useFlowContext } from '../../context/FlowContext';
import { parseHours, formatHours } from '../../utils/timeParser';
import { TimePill, InputOutputRows, RaciChips } from './nodeParts';

const STATE_CONFIG = {
  current:     { border: null,      borderStyle: 'solid',  badge: null,  opacity: 1    },
  accelerated: { border: '#22c55e', borderStyle: 'solid',  badge: '⚡',  opacity: 1    },
  eliminated:  { border: '#6b7280', borderStyle: 'solid',  badge: null,  opacity: 0.45 },
  automated:   { border: '#8b5cf6', borderStyle: 'solid',  badge: '🤖', opacity: 1    },
  reordered:   { border: '#f59e0b', borderStyle: 'dashed', badge: '↕',  opacity: 1    },
};

function getChildSummary(childFlow) {
  if (!childFlow?.nodes?.length) return null;
  const nodes = childFlow.nodes;
  let originalH = 0, optimizedH = 0;
  nodes.forEach(n => {
    const h = parseHours(n.data?.timeEstimate);
    if (h) originalH += h;
    if (n.data?.state === 'eliminated') return;
    const eff = (n.data?.state === 'accelerated' && n.data?.timeAfterAI) ? n.data.timeAfterAI : n.data?.timeEstimate;
    const oh = parseHours(eff);
    if (oh) optimizedH += oh;
  });
  return {
    steps: nodes.length,
    original:  originalH  > 0 ? formatHours(originalH)  : null,
    optimized: optimizedH > 0 ? formatHours(optimizedH) : null,
  };
}

export function BaseNode({ data, selected, typeConfig, onDrillDown }) {
  const { toBeMode, isAtRoot } = useFlowContext();
  const { borderColor, bgColor, headerBg, labelColor } = typeConfig;

  const state      = data.state || 'current';
  const isAi       = data.aiFlag;
  const dimmed     = data._dimmed || false;
  const mountDelay = data._mountDelay || 0;
  const riskLevel  = data.riskLevel;

  let activeBorder      = borderColor;
  let activeBorderStyle = 'solid';
  let stateBadge        = null;
  let stateOpacity      = 1;

  if (toBeMode && state !== 'current') {
    const cfg = STATE_CONFIG[state] || STATE_CONFIG.current;
    activeBorder      = cfg.border || borderColor;
    activeBorderStyle = cfg.borderStyle;
    stateBadge        = cfg.badge;
    stateOpacity      = cfg.opacity;
  } else if (!toBeMode && isAi) {
    activeBorder = '#f59e0b';
  }

  const finalOpacity  = dimmed ? 0.2 : stateOpacity;
  const isEliminated  = toBeMode && state === 'eliminated';
  const isAccelerated = toBeMode && state === 'accelerated';
  const hasChild      = !!data.childFlow;
  const childSummary  = hasChild ? getChildSummary(data.childFlow) : null;
  const radius        = isAtRoot ? 10 : 2;

  const stateBarColor = state === 'accelerated' ? '#22c55e' :
                        state === 'automated'   ? '#8b5cf6' :
                        state === 'reordered'   ? '#f59e0b' : '#6b7280';

  // Medium risk adds a static amber box-shadow ring
  const riskShadow = (!toBeMode || state !== 'eliminated') && riskLevel === 'medium'
    ? ', 0 0 0 2px rgba(245,158,11,0.55)'
    : '';

  const riskClass = riskLevel === 'critical' ? ' flow-node--critical'
                  : riskLevel === 'medium'   ? ' flow-node--medium'
                  : '';

  return (
    <div
      className={`flow-node${riskClass}`}
      style={{
        border: `2px ${activeBorderStyle} ${activeBorder}`,
        borderRadius: radius,
        background: bgColor,
        minWidth: 200, maxWidth: 240,
        boxShadow: selected
          ? `0 0 0 3px rgba(99,102,241,0.5), 0 4px 16px rgba(0,0,0,0.2)${riskShadow}`
          : `0 2px 8px rgba(0,0,0,0.12)${riskShadow}`,
        opacity: finalOpacity,
        transition: 'opacity 0.3s, border-color 0.3s, box-shadow 0.15s',
        position: 'relative',
        userSelect: 'none',
        animationName: mountDelay > 0 ? 'nodeAppear' : undefined,
        animationDuration: '0.35s',
        animationTimingFunction: 'ease',
        animationFillMode: 'both',
        animationDelay: mountDelay > 0 ? `${mountDelay}s` : undefined,
      }}
    >
      <Handle type="target" position={Position.Left}
        style={{ background: activeBorder, width: 10, height: 10, border: '2px solid #fff' }} />

      {/* Eliminated diagonal strikethrough */}
      {isEliminated && (
        <div style={{
          position: 'absolute', inset: 0, borderRadius: radius,
          background: 'linear-gradient(to bottom right, transparent calc(50% - 1px), #6b728066 calc(50% - 1px), #6b728066 calc(50% + 1px), transparent calc(50% + 1px))',
          pointerEvents: 'none', zIndex: 10,
        }} />
      )}

      {/* Header */}
      <div style={{
        background: headerBg, borderRadius: `${radius - 2}px ${radius - 2}px 0 0`,
        padding: '8px 10px', display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between', gap: 6,
      }}>
        <span style={{
          fontSize: 13, fontWeight: 600, color: labelColor, lineHeight: 1.3, flex: 1,
          textDecoration: isEliminated ? 'line-through' : 'none',
        }}>
          {data.label || 'Untitled'}
        </span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0, marginTop: 1 }}>
          {/* Client touchpoint marker (Step 5) */}
          {data.clientTouch && (
            <span title="Client involved at this step">
              <UserRound size={12} color="#0ea5e9" strokeWidth={2.5} />
            </span>
          )}
          {!toBeMode && isAi && (
            <span title={data.aiType || 'AI Opportunity'}>
              <Zap size={13} fill="#f59e0b" color="#f59e0b" />
            </span>
          )}
          {toBeMode && stateBadge && (
            <span style={{ fontSize: 13, lineHeight: 1 }}>{stateBadge}</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '7px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>

        {/* RACI chips / owner row (Step 4) */}
        <RaciChips raci={data.raci} fallbackOwner={data.owner} />

        {/* Time pill (Step 2) */}
        {data.timeEstimate && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <TimePill
              timeEstimate={data.timeEstimate}
              timeAfterAI={data.timeAfterAI}
              isAccelerated={isAccelerated}
            />
          </div>
        )}

        {/* Tool row — with data-handling tooltip (Step 7) */}
        {data.tool && (
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#6b7280' }}
            title={data.dataHandling || undefined}
          >
            <Wrench size={10} />
            <span>{data.tool}</span>
            {data.dataHandling && (
              <span style={{ fontSize: 9, color: '#d1d5db', marginLeft: 2 }}>ⓘ</span>
            )}
          </div>
        )}

        {/* IN / OUT artifact rows (Step 3) */}
        <InputOutputRows
          input={data.input}
          output={data.output}
          deliverableType={data.deliverableType}
        />

        {/* Child flow drill-down badge */}
        {hasChild && childSummary && (
          <div
            onClick={onDrillDown}
            title="Double-click node to drill in"
            style={{
              marginTop: 4, padding: '4px 7px', background: '#f0f4ff',
              borderRadius: 6, border: '1px solid #c7d2fe',
              display: 'flex', alignItems: 'center', gap: 5,
              cursor: 'pointer', fontSize: 10, color: '#4338ca', fontWeight: 500,
            }}
          >
            <Grid2x2 size={10} />
            <span>{childSummary.steps} steps</span>
            {childSummary.original && childSummary.optimized && (
              <span style={{ color: '#6b7280', fontWeight: 400 }}>
                {' · '}{childSummary.original}
                {childSummary.original !== childSummary.optimized && (
                  <span style={{ color: '#22c55e' }}>{' → '}{childSummary.optimized}</span>
                )}
              </span>
            )}
            <ChevronRight size={9} style={{ marginLeft: 'auto' }} />
          </div>
        )}
      </div>

      {/* Footer bar */}
      {!toBeMode && isAi && data.aiType && (
        <div style={{
          background: 'rgba(245,158,11,0.12)', borderTop: '1px solid rgba(245,158,11,0.3)',
          borderRadius: `0 0 ${radius - 2}px ${radius - 2}px`, padding: '4px 10px',
          fontSize: 10, color: '#d97706', fontWeight: 500,
        }}>
          {data.aiType}
        </div>
      )}

      {toBeMode && state !== 'current' && (
        <div style={{
          background: `${stateBarColor}14`, borderTop: `1px solid ${stateBarColor}33`,
          borderRadius: `0 0 ${radius - 2}px ${radius - 2}px`, padding: '4px 10px',
          fontSize: 10, color: stateBarColor, fontWeight: 500, textTransform: 'capitalize',
        }}>
          {state}
        </div>
      )}

      <Handle type="source" position={Position.Right}
        style={{ background: activeBorder, width: 10, height: 10, border: '2px solid #fff' }} />
    </div>
  );
}
