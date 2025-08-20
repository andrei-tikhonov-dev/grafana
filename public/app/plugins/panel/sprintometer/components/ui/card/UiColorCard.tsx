import { css, cx } from '@emotion/css';
import * as React from 'react';

import { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent } from '../../shadcn/card';

interface UiColorCardProps extends React.ComponentProps<'div'> {
  color?: string;
}

function UiColorCard({ color, className, ...props }: UiColorCardProps) {
  const colorStyles = color
    ? css`
        border-color: ${color};
        background: color-mix(in srgb, ${color} 30%, white 70%);
      `
    : '';

  return <Card className={cx(colorStyles, className)} {...props} />;
}

export {
  UiColorCard,
  CardHeader as UiCardHeader,
  CardFooter as UiCardFooter,
  CardTitle as UiCardTitle,
  CardAction as UiCardAction,
  CardDescription as UiCardDescription,
  CardContent as UiCardContent,
};
