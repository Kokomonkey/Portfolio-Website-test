import { useState, useCallback } from 'react';
import { useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import { defaultNodes, defaultEdges } from '../utils/defaultData';

export function useFlowState() {
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [firmName, setFirmName] = useState('Architecture Firm');
  const [projectLabel, setProjectLabel] = useState('Planning Application');
  const [aiOnlyMode, setAiOnlyMode] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: false }, eds)),
    [setEdges]
  );

  const addNode = useCallback((type = 'task', position = { x: 300, y: 300 }) => {
    const id = `node-${Date.now()}`;
    const newNode = {
      id,
      type,
      position,
      data: {
        label: 'New Step',
        owner: '',
        timeEstimate: '',
        tool: '',
        notes: '',
        aiFlag: false,
        aiType: null,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setSelectedNode(id);
    return id;
  }, [setNodes]);

  const updateNodeData = useCallback((id, updates) => {
    setNodes((nds) =>
      nds.map((n) => n.id === id ? { ...n, data: { ...n.data, ...updates } } : n)
    );
    setSelectedNode((prev) => prev);
  }, [setNodes]);

  const deleteNode = useCallback((id) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    setSelectedNode((prev) => (prev === id ? null : prev));
  }, [setNodes, setEdges]);

  const deleteEdge = useCallback((id) => {
    setEdges((eds) => eds.filter((e) => e.id !== id));
  }, [setEdges]);

  const loadDiagram = useCallback((data) => {
    if (data.nodes) setNodes(data.nodes);
    if (data.edges) setEdges(data.edges);
    if (data.firmName) setFirmName(data.firmName);
    if (data.projectLabel) setProjectLabel(data.projectLabel);
  }, [setNodes, setEdges]);

  const getSelectedNodeData = useCallback(() => {
    if (!selectedNode) return null;
    return nodes.find((n) => n.id === selectedNode) || null;
  }, [nodes, selectedNode]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNodeData,
    deleteNode,
    deleteEdge,
    selectedNode,
    setSelectedNode,
    getSelectedNodeData,
    firmName,
    setFirmName,
    projectLabel,
    setProjectLabel,
    aiOnlyMode,
    setAiOnlyMode,
    setNodes,
    setEdges,
  };
}
