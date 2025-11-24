import { cx, css } from '@emotion/css';
import React from 'react';

import { typographyStyles, theme3 } from '../../../theme';

type TypographyVariant =
  | 'dashboardTitle'
  | 'panelTitle'
  | 'title'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h4Bold'
  | 'h5'
  | 'h5Bold'
  | 'h6'
  | 'body'
  | 'bodyBold'
  | 'code'
  | 'bodySmall';

type TypographyColor =
  | 'inherit'
  | 'default'
  | 'light'
  | 'primary'
  | 'secondary'
  | 'onTrack'
  | 'needsAttention'
  | 'highRisk';

type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'code';

const defaultTagMap: Record<TypographyVariant, TypographyTag> = {
  dashboardTitle: 'h1',
  panelTitle: 'h2',
  title: 'h3',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h4Bold: 'h4',
  h5: 'h5',
  h5Bold: 'h5',
  h6: 'h6',
  body: 'p',
  bodyBold: 'p',
  code: 'code',
  bodySmall: 'p',
};

const colorStyles: Record<TypographyColor, string> = {
  inherit: css`
    color: inherit;
  `,
  default: css`
    color: ${theme3.custom.colorFont};
  `,
  light: css`
    color: ${theme3.custom.colorFontLight};
  `,
  primary: css`
    color: ${theme3.custom.colorPrimary};
  `,
  secondary: css`
    color: ${theme3.custom.colorSecondary};
  `,
  onTrack: css`
    color: ${theme3.custom.colorStatusOnTrack};
  `,
  needsAttention: css`
    color: ${theme3.custom.colorStatusNeedsAttention};
  `,
  highRisk: css`
    color: ${theme3.custom.colorStatusHighRisk};
  `,
};

type TypographyOwnProps<T extends React.ElementType> = {
  variant?: TypographyVariant;
  color?: TypographyColor;
  as?: T;
};

export type TypographyProps<T extends React.ElementType = 'p'> = TypographyOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyOwnProps<T>>;

export const UiTypography = <T extends React.ElementType = 'p'>({
  variant = 'body',
  color = 'default',
  as,
  className,
  children,
  ref,
  ...rest
}: TypographyProps<T> & {
  ref?: React.ComponentPropsWithRef<T>['ref'];
}) => {
  const Component = (as || defaultTagMap[variant]) as React.ElementType;

  const combinedClassName = cx(typographyStyles[variant], colorStyles[color], className);

  return (
    <Component ref={ref} className={combinedClassName} {...rest}>
      {children}
    </Component>
  );
};

UiTypography.displayName = 'UiTypography';
