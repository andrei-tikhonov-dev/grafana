import { css, cx } from '@emotion/css';
import React from 'react';

import { theme3 } from '../../../theme';

export interface TextProps {
  children?: React.ReactNode;
  className?: string;
  url: string;
}

const styles = {
  link: css`
    color: ${theme3.custom.colorLink};
  `,
};

export const UiLink: React.FC<TextProps> = ({ url, children, className }) => {
  return (
    <a className={cx(styles.link, className)} href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};
