import { useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';

import { nodeTypes } from './components/nodes/NodeTypes';
import { TopBar } from './components/toolbar/TopBar';
import { PropertiesPanel } from './components/panels/PropertiesPanel';
import { SummaryPanel } from './components/panels/SummaryPanel';
import { ContextMenu } from './components/ContextMenu';
import { PhaseLanes } from './components/PhaseLanes';
import { LoadingScreen } from './components/LoadingScreen';
import { ValueStrip } from './components/panels/ValueStrip';
import { useAppStore } from './hooks/useAppStore';
import { useExport } from './hooks/useExport';
import { FlowContext } from './context/FlowContext';

const canvasVariants = {
  enter: (dir) => ({
    opacity: 0,
    scale: dir === 'in' ? 1.04 : 0.96,
  }),
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: (dir) => ({
    opacity: 0,
    scale: dir === 'in' ? 0.96 : 1.04,
    transition: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function FlowApp() {
  const rf = useReactFlow();
  const store = useAppStore();
  const {
    nodes, edges, currentPhases,
    onNodesChange, onEdgesChange, onConnect,
    addNode, updateNodeData, updateNodeType,
    deleteNode, deleteEdge,
    selectedNode, setSelectedNode, getSelectedNodeData,
    firmName, setFirmName,
    projectLabel, setProjectLabel,
    aiOnlyMode, setAiOnlyMode,
    toBeMode, setToBeMode,
    loadDiagram, getRootFlowForExport,
    drillInto, navigateBack, navigateTo,
    navStack, isAtRoot,
    setCurrentNodes,
  } = store;

  const [contextMenu, setContextMenu] = useState(null);
  const [navDir, setNavDir] = useState('in');
  const [appReady, setAppReady] = useState(false);

  const { exportJSON, importJSON, exportPNG, exportSummaryPDF } = useExport({
    nodes,
    getRootFlowForExport,
    firmName,
    projectLabel,
    toBeMode,
  });

  const displayNodes = nodes.map((n) => ({
    ...n,
    data: {
      ...n.data,
      _dimmed: aiOnlyMode && !n.data.aiFlag,
      _onDrillDown: n.data.childFlow ? () => handleDrillInto(n) : undefined,
    },
    selected: n.id === selectedNode,
  }));

  const handleNodeClick = useCallback((_, node) => {
    setSelectedNode(node.id);
  }, [setSelectedNode]);

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
    setContextMenu(null);
  }, [setSelectedNode]);

  const handlePaneDoubleClick = useCallback((event) => {
    const position = rf.screenToFlowPosition({ x: event.clientX, y: event.clientY });
    addNode('task', position);
  }, [addNode, rf]);

  const handleDrillInto = useCallback((node) => {
    setNavDir('in');
    drillInto(node);
  }, [drillInto]);

  const handleNodeDoubleClick = useCallback((_, node) => {
    if (node.data.childFlow) {
      handleDrillInto(node);
    }
  }, [handleDrillInto]);

  const handleNavigateBack = useCallback(() => {
    setNavDir('out');
    navigateBack();
  }, [navigateBack]);

  const handleNavigateTo = useCallback((level) => {
    if (level < navStack.length - 1) {
      setNavDir('out');
      navigateTo(level);
    }
  }, [navigateTo, navStack.length]);

  const handleKeyDown = useCallback((event) => {
    if ((event.key === 'Delete' || event.key === 'Backspace') && selectedNode) {
      if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        deleteNode(selectedNode);
      }
    }
    if (event.key === 'Escape') {
      setSelectedNode(null);
      setContextMenu(null);
    }
  }, [selectedNode, deleteNode, setSelectedNode]);

  const handleNodeContextMenu = useCallback((e, node) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, nodeId: node.id });
  }, []);

  const handleEdgeContextMenu = useCallback((e, edge) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, edgeId: edge.id });
  }, []);

  const handleUpdateNodeData = useCallback((id, updates, newType) => {
    if (newType) {
      updateNodeType(id, newType);
    }
    if (Object.keys(updates).length > 0) {
      updateNodeData(id, updates);
    }
  }, [updateNodeData, updateNodeType]);

  const handleAddNode = useCallback((type) => {
    const vp = rf.getViewport();
    const x = (-vp.x + window.innerWidth / 2) / vp.zoom;
    const y = (-vp.y + window.innerHeight / 2) / vp.zoom;
    addNode(type, { x: x - 100, y: y - 60 });
  }, [addNode, rf]);

  const selectedNodeObj = getSelectedNodeData();

  const canvasBg = isAtRoot ? '#f8f9fc' : '#16192a';
  const dotColor = isAtRoot ? '#c5cad4' : '#2a2e45';
  const bgVariant = isAtRoot ? BackgroundVariant.Dots : BackgroundVariant.Lines;
  const bgGap = isAtRoot ? 20 : 32;

  return (
    <FlowContext.Provider value={{ toBeMode, aiOnlyMode, isAtRoot }}>
      {/* Loading screen — shown before app is ready */}
      <AnimatePresence>
        {!appReady && (
          <LoadingScreen onComplete={() => setAppReady(true)} />
        )}
      </AnimatePresence>

      <div
        style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0f1117' }}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <TopBar
          firmName={firmName} setFirmName={setFirmName}
          projectLabel={projectLabel} setProjectLabel={setProjectLabel}
          aiOnlyMode={aiOnlyMode} setAiOnlyMode={setAiOnlyMode}
          toBeMode={toBeMode} setToBeMode={setToBeMode}
          onAddNode={handleAddNode}
          onExportJSON={exportJSON}
          onImportJSON={(file) => importJSON(file, loadDiagram)}
          onExportPNG={exportPNG}
          onExportSummaryPDF={exportSummaryPDF}
          navStack={navStack}
          onNavigateTo={handleNavigateTo}
          onNavigateBack={handleNavigateBack}
          isAtRoot={isAtRoot}
        />

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <motion.div
            initial={{ x: -220, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.35, ease: 'easeOut' }}
            style={{ display: 'flex', flexShrink: 0 }}
          >
            <SummaryPanel nodes={nodes} toBeMode={toBeMode} />
          </motion.div>

          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <ValueStrip nodes={nodes} toBeMode={toBeMode} />

            {/* Canvas area */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            {/* Canvas label — root only */}
            {isAtRoot && (
              <div style={{
                position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
                zIndex: 10, textAlign: 'center', pointerEvents: 'none',
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{firmName}</div>
                {projectLabel && <div style={{ fontSize: 11, color: '#9ca3af' }}>{projectLabel}</div>}
              </div>
            )}

            <AnimatePresence mode="wait" custom={navDir}>
              <motion.div
                key={navStack.length}
                custom={navDir}
                variants={canvasVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ position: 'absolute', inset: 0 }}
              >
                <ReactFlow
                  key={`flow-${navStack.length}`}
                  nodes={displayNodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  nodeTypes={nodeTypes}
                  onNodeClick={handleNodeClick}
                  onPaneClick={handlePaneClick}
                  onPaneDoubleClick={handlePaneDoubleClick}
                  onNodeDoubleClick={handleNodeDoubleClick}
                  onNodeContextMenu={handleNodeContextMenu}
                  onEdgeContextMenu={handleEdgeContextMenu}
                  fitView
                  deleteKeyCode={null}
                  style={{ background: canvasBg }}
                  defaultEdgeOptions={{
                    style: { stroke: '#94a3b8', strokeWidth: 2 },
                    markerEnd: { type: 'arrowclosed', color: '#94a3b8' },
                  }}
                >
                  <PhaseLanes phases={currentPhases} nodes={nodes} />
                  <Background variant={bgVariant} gap={bgGap} size={1} color={dotColor} />
                  <Controls />
                  <MiniMap
                    nodeColor={(n) => {
                      const colors = { task: '#3b82f6', handoff: '#f97316', review: '#8b5cf6', output: '#22c55e', bottleneck: '#ef4444' };
                      return colors[n.type] || '#6b7280';
                    }}
                    maskColor="rgba(15,17,23,0.7)"
                  />
                </ReactFlow>
              </motion.div>
            </AnimatePresence>
            </div>{/* end canvas area */}
          </div>

          <AnimatePresence>
            {selectedNodeObj && (
              <motion.div
                initial={{ x: 280, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 280, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{ display: 'flex' }}
              >
                <PropertiesPanel
                  node={selectedNodeObj}
                  onUpdate={handleUpdateNodeData}
                  onDelete={deleteNode}
                  onClose={() => setSelectedNode(null)}
                  onDrillDown={selectedNodeObj.data.childFlow ? () => handleDrillInto(selectedNodeObj) : undefined}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {contextMenu && (
          <ContextMenu
            x={contextMenu.x} y={contextMenu.y}
            nodeId={contextMenu.nodeId} edgeId={contextMenu.edgeId}
            onDelete={contextMenu.nodeId ? deleteNode : deleteEdge}
            onClose={() => setContextMenu(null)}
          />
        )}
      </div>
    </FlowContext.Provider>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowApp />
    </ReactFlowProvider>
  );
}
