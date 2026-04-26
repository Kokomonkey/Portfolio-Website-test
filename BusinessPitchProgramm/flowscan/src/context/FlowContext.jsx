import { createContext, useContext } from 'react';

export const FlowContext = createContext({ toBeMode: false, aiOnlyMode: false, isAtRoot: true });

export function useFlowContext() {
  return useContext(FlowContext);
}
