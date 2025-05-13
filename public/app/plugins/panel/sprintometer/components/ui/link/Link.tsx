import { css } from '@emotion/css';
import React from 'react';

import { theme } from '../../../theme';

export interface TextProps {
  children?: React.ReactNode;
  url: string;
}

const styles = {
  link: css`
    color: ${theme.colors.semantic.link};
  `,
};

export const Link: React.FC<TextProps> = ({ url, children }) => {
  return (
    <a className={styles.link} href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};
