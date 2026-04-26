import { BaseNode } from './BaseNode';

const CONFIGS = {
  task:       { borderColor: '#3b82f6', bgColor: '#ffffff', headerBg: '#eff6ff', labelColor: '#1d4ed8' },
  handoff:    { borderColor: '#f97316', bgColor: '#ffffff', headerBg: '#fff7ed', labelColor: '#c2410c' },
  review:     { borderColor: '#8b5cf6', bgColor: '#ffffff', headerBg: '#f5f3ff', labelColor: '#6d28d9' },
  output:     { borderColor: '#22c55e', bgColor: '#ffffff', headerBg: '#f0fdf4', labelColor: '#15803d' },
  bottleneck: { borderColor: '#ef4444', bgColor: '#ffffff', headerBg: '#fef2f2', labelColor: '#b91c1c' },
};

function makeNodeComponent(type) {
  return function NodeComponent(props) {
    const { data } = props;
    const onDrillDown = data?._onDrillDown;
    return (
      <BaseNode
        {...props}
        typeConfig={CONFIGS[type]}
        onDrillDown={onDrillDown}
      />
    );
  };
}

export const TaskNode = makeNodeComponent('task');
export const HandoffNode = makeNodeComponent('handoff');
export const ReviewNode = makeNodeComponent('review');
export const OutputNode = makeNodeComponent('output');
export const BottleneckNode = makeNodeComponent('bottleneck');

export const nodeTypes = {
  task: TaskNode,
  handoff: HandoffNode,
  review: ReviewNode,
  output: OutputNode,
  bottleneck: BottleneckNode,
};

export const NODE_TYPE_OPTIONS = [
  { value: 'task',       label: 'Task',       color: '#3b82f6' },
  { value: 'handoff',    label: 'Handoff',    color: '#f97316' },
  { value: 'review',     label: 'Review',     color: '#8b5cf6' },
  { value: 'output',     label: 'Output',     color: '#22c55e' },
  { value: 'bottleneck', label: 'Bottleneck', color: '#ef4444' },
];
