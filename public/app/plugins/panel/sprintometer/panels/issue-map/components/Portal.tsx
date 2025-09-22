import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
  id: string;
}

export const Portal: React.FC<PortalProps> = ({ children, id }) => {
  const elementId = `portal-${id}`;
  let portalRoot = document.getElementById(elementId);

  if (!portalRoot) {
    portalRoot = document.createElement(elementId);
    portalRoot.id = elementId;
    document.body.appendChild(portalRoot);
  }

  return ReactDOM.createPortal(children, portalRoot);
};
