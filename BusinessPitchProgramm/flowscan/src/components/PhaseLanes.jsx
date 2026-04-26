import { useViewport } from '@xyflow/react';

const NODE_WIDTH_EST = 240;
const LANE_PADDING_H = 28;
const LANE_TOP = -80;
const LANE_HEIGHT = 1450; // covers y=0..1100 nodes + ~180px height + padding

function computeLayouts(phases, nodes) {
  const bounds = {};
  nodes.forEach(n => {
    const p = n.data?.phase;
    if (!p) return;
    if (!bounds[p]) bounds[p] = { minX: Infinity, maxX: -Infinity };
    bounds[p].minX = Math.min(bounds[p].minX, n.position.x);
    bounds[p].maxX = Math.max(bounds[p].maxX, n.position.x + NODE_WIDTH_EST);
  });

  return phases
    .filter(p => bounds[p.id])
    .map(p => ({
      ...p,
      x: bounds[p.id].minX - LANE_PADDING_H,
      width: (bounds[p.id].maxX - bounds[p.id].minX) + LANE_PADDING_H * 2,
    }));
}

export function PhaseLanes({ phases, nodes }) {
  const { x, y, zoom } = useViewport();

  if (!phases || phases.length === 0 || !nodes) return null;

  const layouts = computeLayouts(phases, nodes);
  if (layouts.length === 0) return null;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none', overflow: 'hidden', zIndex: 0,
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0,
        transform: `translate(${x}px, ${y}px) scale(${zoom})`,
        transformOrigin: '0 0',
      }}>
        {layouts.map((phase) => (
          <div
            key={phase.id}
            style={{
              position: 'absolute',
              left: phase.x,
              top: LANE_TOP,
              width: phase.width,
              height: LANE_HEIGHT,
              background: `${phase.color}08`,
              border: `1px solid ${phase.color}28`,
              borderRadius: 6,
              transition: 'left 0.4s ease, width 0.4s ease',
            }}
          >
            <div style={{
              padding: '8px 14px 10px',
              borderBottom: `1px solid ${phase.color}22`,
              background: `${phase.color}12`,
              borderRadius: '5px 5px 0 0',
            }}>
              <div style={{
                fontSize: 9, fontWeight: 800, color: phase.color,
                letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>
                {phase.label}
              </div>
              <div style={{
                fontSize: 11, color: '#6b7280', marginTop: 2, fontWeight: 500,
              }}>
                {phase.sublabel}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
