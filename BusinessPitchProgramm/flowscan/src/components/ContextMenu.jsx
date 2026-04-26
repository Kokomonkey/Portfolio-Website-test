import { useEffect, useRef } from 'react';
import { Trash2, Copy, Zap } from 'lucide-react';

export function ContextMenu({ x, y, nodeId, edgeId, onDelete, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: y,
        left: x,
        background: '#1e2130',
        border: '1px solid #2d3148',
        borderRadius: 8,
        padding: '4px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        zIndex: 1000,
        minWidth: 140,
      }}
    >
      <MenuItem
        icon={<Trash2 size={13} />}
        label={nodeId ? 'Delete Node' : 'Delete Edge'}
        color="#ef4444"
        onClick={() => { onDelete(nodeId || edgeId); onClose(); }}
      />
    </div>
  );
}

function MenuItem({ icon, label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        padding: '7px 10px',
        background: 'transparent',
        border: 'none',
        borderRadius: 5,
        color: color || '#d1d5db',
        fontSize: 13,
        cursor: 'pointer',
        textAlign: 'left',
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = '#2d3148'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      {icon}
      {label}
    </button>
  );
}
