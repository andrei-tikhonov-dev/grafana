import { css } from '@emotion/css';
import React from 'react';

const filterContainerStyles = css`
  display: flex;
  gap: 2px;
  margin-bottom: 20px;
  max-width: 800px;
`;

interface FilterContainerProps {
  children: React.ReactNode;
}

export const HeaderContainer: React.FC<FilterContainerProps> = ({ children }) => {
  return <div className={filterContainerStyles}>{children}</div>;
};
