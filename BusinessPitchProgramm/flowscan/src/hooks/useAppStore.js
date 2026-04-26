import { useState, useCallback, useRef } from 'react';
import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import { defaultNodes, defaultEdges, rootPhases } from '../utils/defaultData';

function mergeHistoryToRoot(flowHistory) {
  let h = [...flowHistory];
  while (h.length > 1) {
    const child = h[h.length - 1];
    const parent = h[h.length - 2];
    const updatedNodes = parent.nodes.map(n =>
      n.id === child.nodeId
        ? { ...n, data: { ...n.data, childFlow: { nodes: child.nodes, edges: child.edges } } }
        : n
    );
    h = [...h.slice(0, -2), { ...parent, nodes: updatedNodes }];
  }
  return h[0];
}

export function useAppStore() {
  const [flowHistory, setFlowHistory] = useState([
    { nodes: defaultNodes, edges: defaultEdges, nodeId: 'root', label: 'Planning Application', phases: rootPhases },
  ]);
  const [firmName, setFirmName] = useState('Architecture Firm');
  const [projectLabel, setProjectLabel] = useState('Planning Application');
  const [aiOnlyMode, setAiOnlyMode] = useState(false);
  const [toBeMode, setToBeMode] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const currentFlow = flowHistory[flowHistory.length - 1];
  const nodes = currentFlow.nodes;
  const edges = currentFlow.edges;
  const currentPhases = currentFlow.phases || [];

  // Always-fresh ref for phase bounds — used inside onNodesChange without stale closure issues
  const phaseMapRef = useRef({});
  phaseMapRef.current = Object.fromEntries(
    currentPhases
      .filter(p => p.colMin !== undefined && p.colMax !== undefined)
      .map(p => [p.id, p])
  );

  const setCurrentNodes = useCallback((updater) => {
    setFlowHistory(h => {
      const level = h.length - 1;
      const cur = h[level];
      const next = typeof updater === 'function' ? updater(cur.nodes) : updater;
      return [...h.slice(0, level), { ...cur, nodes: next }];
    });
  }, []);

  const setCurrentEdges = useCallback((updater) => {
    setFlowHistory(h => {
      const level = h.length - 1;
      const cur = h[level];
      const next = typeof updater === 'function' ? updater(cur.edges) : updater;
      return [...h.slice(0, level), { ...cur, edges: next }];
    });
  }, []);

  const onNodesChange = useCallback((changes) => {
    const phaseMap = phaseMapRef.current;
    setCurrentNodes(nds => {
      const clamped = changes.map(change => {
        if (change.type !== 'position' || !change.position) return change;
        const node = nds.find(n => n.id === change.id);
        const phase = node?.data?.phase ? phaseMap[node.data.phase] : null;
        if (!phase) return change;
        const clampedX = Math.max(phase.colMin, Math.min(phase.colMax - 240, change.position.x));
        return { ...change, position: { ...change.position, x: clampedX } };
      });
      return applyNodeChanges(clamped, nds);
    });
  }, [setCurrentNodes]);

  const onEdgesChange = useCallback((changes) => {
    setCurrentEdges(eds => applyEdgeChanges(changes, eds));
  }, [setCurrentEdges]);

  const onConnect = useCallback((params) => {
    setCurrentEdges(eds => addEdge({ ...params, animated: false }, eds));
  }, [setCurrentEdges]);

  const drillInto = useCallback((node) => {
    const childFlow = node.data.childFlow || { nodes: [], edges: [] };
    const childPhases = node.data.childPhases || [];
    setSelectedNode(null);
    setFlowHistory(h => [...h, {
      nodes: childFlow.nodes,
      edges: childFlow.edges,
      nodeId: node.id,
      label: node.data.label,
      phases: childPhases,
    }]);
  }, []);

  const navigateBack = useCallback(() => {
    setFlowHistory(h => {
      if (h.length <= 1) return h;
      const child = h[h.length - 1];
      const parent = h[h.length - 2];
      const updatedNodes = parent.nodes.map(n =>
        n.id === child.nodeId
          ? { ...n, data: { ...n.data, childFlow: { nodes: child.nodes, edges: child.edges } } }
          : n
      );
      return [...h.slice(0, -2), { ...parent, nodes: updatedNodes }];
    });
    setSelectedNode(null);
  }, []);

  const navigateTo = useCallback((targetLevel) => {
    setFlowHistory(h => {
      if (targetLevel >= h.length - 1) return h;
      let history = [...h];
      while (history.length > targetLevel + 1) {
        const child = history[history.length - 1];
        const parent = history[history.length - 2];
        const updatedNodes = parent.nodes.map(n =>
          n.id === child.nodeId
            ? { ...n, data: { ...n.data, childFlow: { nodes: child.nodes, edges: child.edges } } }
            : n
        );
        history = [...history.slice(0, -2), { ...parent, nodes: updatedNodes }];
      }
      return history;
    });
    setSelectedNode(null);
  }, []);

  const addNode = useCallback((type = 'task', position = { x: 300, y: 300 }) => {
    const id = `node-${Date.now()}`;
    const newNode = {
      id, type, position,
      data: {
        label: 'New Step', owner: '', timeEstimate: '', timeAfterAI: '',
        tool: '', notes: '', aiFlag: false, aiType: null,
        state: 'current', childFlow: null, _mountDelay: 0,
      },
    };
    setCurrentNodes(nds => [...nds, newNode]);
    setSelectedNode(id);
    return id;
  }, [setCurrentNodes]);

  const updateNodeData = useCallback((id, updates) => {
    setCurrentNodes(nds =>
      nds.map(n => n.id === id ? { ...n, data: { ...n.data, ...updates } } : n)
    );
  }, [setCurrentNodes]);

  const updateNodeType = useCallback((id, newType) => {
    setCurrentNodes(nds => nds.map(n => n.id === id ? { ...n, type: newType } : n));
  }, [setCurrentNodes]);

  const deleteNode = useCallback((id) => {
    setCurrentNodes(nds => nds.filter(n => n.id !== id));
    setCurrentEdges(eds => eds.filter(e => e.source !== id && e.target !== id));
    setSelectedNode(prev => prev === id ? null : prev);
  }, [setCurrentNodes, setCurrentEdges]);

  const deleteEdge = useCallback((id) => {
    setCurrentEdges(eds => eds.filter(e => e.id !== id));
  }, [setCurrentEdges]);

  const getSelectedNodeData = useCallback(() => {
    if (!selectedNode) return null;
    return nodes.find(n => n.id === selectedNode) || null;
  }, [nodes, selectedNode]);

  const loadDiagram = useCallback((data) => {
    setFlowHistory([{
      nodes: data.nodes || [],
      edges: data.edges || [],
      nodeId: 'root',
      label: data.projectLabel || 'Workflow',
    }]);
    if (data.firmName) setFirmName(data.firmName);
    if (data.projectLabel) setProjectLabel(data.projectLabel);
    setSelectedNode(null);
  }, []);

  const getRootFlowForExport = useCallback(() => {
    return mergeHistoryToRoot(flowHistory);
  }, [flowHistory]);

  const isAtRoot = flowHistory.length === 1;

  const navStack = flowHistory.map((f, i) => ({
    nodeId: f.nodeId,
    label: i === 0 ? projectLabel : f.label,
    level: i,
  }));

  return {
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
  };
}
