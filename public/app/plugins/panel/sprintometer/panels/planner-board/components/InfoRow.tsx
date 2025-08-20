import { css } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme/theme';

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
}

const infoRowStyles = css`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 32px;
`;

const infoLabelStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 140px;
  font-size: ${theme3.tailwind.textSm};
  color: ${theme3.shadcn.mutedForeground};
`;

const infoValueStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export function InfoRow({ icon, label, value, className }: InfoRowProps) {
  return (
    <div className={infoRowStyles}>
      <div className={infoLabelStyles}>
        {icon}
        <span>{label}</span>
      </div>
      <div className={infoValueStyles}>{value}</div>
    </div>
  );
}
