import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Tooltip as GrafanaTooltip } from '@grafana/ui';
import { Portal } from './Portal';
import { useMousePosition } from '../hooks/useMousePosition';
import { useSankeyContext } from './SankeyContext';

const defaultStyle: React.CSSProperties = {
  pointerEvents: 'none',
  position: 'absolute',
  width: 0,
  height: 0,
  zIndex: 1,
};

const defaultTooltip = { show: false, content: '' };

interface TooltipContextType {
  showTooltip: (content: string) => void;
  hideTooltip: () => void;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('useTooltip must be used within a TooltipProvider');
  }
  return context;
};

export const TooltipProvider: React.FC<{ children: ReactNode; panelId: string }> = ({ children, panelId }) => {
  const [tooltip, setTooltip] = useState<{ show: boolean; content: string }>(defaultTooltip);
  const hideTooltip = () => setTooltip(defaultTooltip);
  const showTooltip = (content: string) => setTooltip({ show: true, content });
  const { mouseX, mouseY } = useMousePosition();
  const { unitLabel } = useSankeyContext();

  return (
    <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
      <Portal id={panelId}>
        <GrafanaTooltip
          key={`${mouseX}-${mouseY}`}
          content={`${tooltip.content} ${unitLabel}`}
          show={tooltip.show}
          placement="top"
        >
          <div
            style={{
              ...defaultStyle,
              left: `${mouseX}px`,
              top: `${mouseY - 5}px`,
            }}
          />
        </GrafanaTooltip>
      </Portal>
      {children}
    </TooltipContext.Provider>
  );
};
