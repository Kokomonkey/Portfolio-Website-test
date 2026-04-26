import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, Image, FileText, Zap, ZapOff, Plus, ChevronRight, ArrowLeft } from 'lucide-react';
import { NODE_TYPE_OPTIONS } from '../nodes/NodeTypes';

export function TopBar({
  firmName, setFirmName,
  projectLabel, setProjectLabel,
  aiOnlyMode, setAiOnlyMode,
  toBeMode, setToBeMode,
  onAddNode, onExportJSON, onImportJSON, onExportPNG, onExportSummaryPDF,
  navStack, onNavigateTo, onNavigateBack,
  isAtRoot,
}) {
  const importRef = useRef(null);

  return (
    <div style={barStyle}>
      {/* Left: logo + breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}
        >
          <div style={{
            width: 28, height: 28,
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={14} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.02em' }}>
            FlowScan
          </span>
        </motion.div>

        <div style={{ width: 1, height: 24, background: '#2d3148', flexShrink: 0 }} />

        {/* Back button when drilled in */}
        {!isAtRoot && (
          <button onClick={onNavigateBack} style={backBtnStyle} title="Go back">
            <ArrowLeft size={14} />
          </button>
        )}

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0, overflow: 'hidden' }}>
          {navStack.map((crumb, i) => (
            <motion.span
              key={crumb.nodeId}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            >
              {i > 0 && <ChevronRight size={12} color="#4b5563" />}
              <span
                onClick={() => onNavigateTo(i)}
                style={{
                  fontSize: 13,
                  fontWeight: i === navStack.length - 1 ? 600 : 400,
                  color: i === navStack.length - 1 ? '#f0f0f0' : '#9ca3af',
                  cursor: i < navStack.length - 1 ? 'pointer' : 'default',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 160,
                }}
              >
                {crumb.label}
              </span>
            </motion.span>
          ))}
        </nav>

        {/* Firm / phase inputs — only at root */}
        {isAtRoot && (
          <>
            <div style={{ width: 1, height: 24, background: '#2d3148', flexShrink: 0 }} />
            <input
              type="text" value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              placeholder="Firm name..."
              style={inputStyle}
            />
            <input
              type="text" value={projectLabel}
              onChange={(e) => setProjectLabel(e.target.value)}
              placeholder="Phase / project..."
              style={{ ...inputStyle, width: 160 }}
            />
          </>
        )}
      </div>

      {/* Center: add node buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        {NODE_TYPE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onAddNode(opt.value)}
            title={`Add ${opt.label} node`}
            style={{
              padding: '5px 11px', borderRadius: 6, fontSize: 11, fontWeight: 500,
              border: `1.5px solid ${opt.color}44`,
              background: `${opt.color}11`, color: opt.color,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
            }}
          >
            <Plus size={10} />{opt.label}
          </button>
        ))}
      </div>

      {/* Right: controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {/* As-Is / To-Be toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 8, background: '#1e2130', border: '1px solid #2d3148' }}>
          <span style={{ fontSize: 11, color: !toBeMode ? '#f0f0f0' : '#6b7280', fontWeight: !toBeMode ? 600 : 400, cursor: 'pointer' }} onClick={() => setToBeMode(false)}>
            As-Is
          </span>
          <button
            onClick={() => setToBeMode(!toBeMode)}
            style={{
              width: 36, height: 18, borderRadius: 9, border: 'none',
              background: toBeMode ? '#6366f1' : '#374151',
              cursor: 'pointer', position: 'relative', transition: 'background 0.25s', padding: 0,
            }}
          >
            <span style={{
              position: 'absolute', top: 2, left: toBeMode ? 18 : 2,
              width: 14, height: 14, borderRadius: '50%',
              background: '#fff', transition: 'left 0.25s',
            }} />
          </button>
          <span style={{ fontSize: 11, color: toBeMode ? '#f0f0f0' : '#6b7280', fontWeight: toBeMode ? 600 : 400, cursor: 'pointer' }} onClick={() => setToBeMode(true)}>
            To-Be
          </span>
        </div>

        <div style={{ width: 1, height: 20, background: '#2d3148' }} />

        <button
          onClick={() => setAiOnlyMode(!aiOnlyMode)}
          style={{
            ...actionBtnStyle,
            background: aiOnlyMode ? '#f59e0b22' : 'transparent',
            border: `1.5px solid ${aiOnlyMode ? '#f59e0b' : '#2d3148'}`,
            color: aiOnlyMode ? '#f59e0b' : '#9ca3af',
          }}
        >
          {aiOnlyMode ? <Zap size={13} fill="#f59e0b" /> : <ZapOff size={13} />}
          <span style={{ fontSize: 11 }}>AI Only</span>
        </button>

        <div style={{ width: 1, height: 20, background: '#2d3148' }} />

        <button onClick={onExportJSON} style={actionBtnStyle}><Download size={13} /><span style={{ fontSize: 11 }}>JSON</span></button>
        <button onClick={() => importRef.current?.click()} style={actionBtnStyle}><Upload size={13} /><span style={{ fontSize: 11 }}>Import</span></button>
        <input ref={importRef} type="file" accept=".json" style={{ display: 'none' }}
          onChange={(e) => { if (e.target.files[0]) onImportJSON(e.target.files[0]); e.target.value = ''; }} />
        <button onClick={onExportPNG} style={actionBtnStyle}><Image size={13} /><span style={{ fontSize: 11 }}>PNG</span></button>
        <button
          onClick={onExportSummaryPDF}
          style={{ ...actionBtnStyle, border: '1.5px solid #6366f144', color: '#818cf8', background: '#6366f111' }}
          title="Export AI savings summary as PDF"
        >
          <FileText size={13} /><span style={{ fontSize: 11 }}>Summary PDF</span>
        </button>
      </div>
    </div>
  );
}

const barStyle = {
  height: 56, background: '#161b2e', borderBottom: '1px solid #2d3148',
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '0 16px', flexShrink: 0, gap: 12, overflowX: 'auto',
};

const inputStyle = {
  width: 180, padding: '6px 10px', borderRadius: 6,
  border: '1px solid #2d3148', background: '#0f1117',
  color: '#f0f0f0', fontSize: 13, outline: 'none', fontFamily: 'inherit',
};

const actionBtnStyle = {
  padding: '5px 10px', borderRadius: 6, border: '1.5px solid #2d3148',
  background: 'transparent', color: '#9ca3af', fontSize: 12,
  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
};

const backBtnStyle = {
  padding: '5px 8px', borderRadius: 6, border: '1px solid #2d3148',
  background: 'transparent', color: '#9ca3af', cursor: 'pointer',
  display: 'flex', alignItems: 'center', flexShrink: 0,
};
