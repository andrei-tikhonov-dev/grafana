import { css, cx } from '@emotion/css';
import * as React from 'react';

import { theme3, roundedBordersStyles } from '../../theme';

const cardStyles = css`
  background: ${theme3.shadcn.card};
  color: ${theme3.shadcn.cardForeground};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  box-shadow: ${theme3.tailwind.shadowSm};
  ${roundedBordersStyles}
`;

const cardHeaderStyles = css`
  container-type: inline-size;
  container-name: card-header;
  display: grid;
  grid-auto-rows: min-content;
  grid-template-rows: auto auto;
  align-items: start;
  gap: 0.375rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  &:has([data-slot='card-action']) {
    grid-template-columns: 1fr auto;
  }

  .border-b & {
    padding-bottom: 1.5rem;
  }
`;

const cardTitleStyles = css`
  line-height: 1;
  font-weight: ${theme3.tailwind.fontWeightSemibold};
`;

const cardDescriptionStyles = css`
  color: ${theme3.shadcn.mutedForeground};
  font-size: ${theme3.tailwind.textSm};
  line-height: ${theme3.tailwind.textSmLineHeight};
`;

const cardActionStyles = css`
  grid-column-start: 2;
  grid-row: span 2 / span 2;
  grid-row-start: 1;
  align-self: start;
  justify-self: end;
`;

const cardContentStyles = css`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const cardFooterStyles = css`
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  .border-t & {
    padding-top: 1.5rem;
  }
`;

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card" className={cx(cardStyles, className)} {...props} />;
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-header" className={cx(cardHeaderStyles, className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-title" className={cx(cardTitleStyles, className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-description" className={cx(cardDescriptionStyles, className)} {...props} />;
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-action" className={cx(cardActionStyles, className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cx(cardContentStyles, className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={cx(cardFooterStyles, className)} {...props} />;
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
