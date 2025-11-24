import { css, cx } from '@emotion/css';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { theme3 } from '../../theme';

const accordionItemStyles = css`
  border-bottom: ${theme3.custom.border};

  &:last-child {
    border-bottom: 0;
  }
`;

const accordionTriggerStyles = css`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  border-radius: ${theme3.tailwind.radiusSm};
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-align: left;
  transition: all 0.2s;
  outline: none;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &[data-state='open'] > svg {
    transform: rotate(180deg);
  }
`;

const accordionIconStyles = css`
  color: ${theme3.shadcn.mutedForeground};
  pointer-events: none;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  transform: translateY(0.125rem);
  transition: transform 0.2s;
`;

const accordionContentStyles = css`
  overflow: hidden;
  transition: all 0.2s ease-out;

  &[data-state='closed'] {
    max-height: 0;
    opacity: 0;
  }

  &[data-state='open'] {
    max-height: 1000px;
    opacity: 1;
  }
`;
const accordionContentInnerStyles = css`
  padding-top: 0;
  padding-bottom: 1rem;
`;

function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item data-slot="accordion-item" className={cx(accordionItemStyles, className)} {...props} />
  );
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header
      className={css`
        display: flex;
      `}
    >
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cx(accordionTriggerStyles, className)}
        {...props}
      >
        {children}
        <ChevronDownIcon className={accordionIconStyles} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content data-slot="accordion-content" className={accordionContentStyles} {...props}>
      <div className={cx(accordionContentInnerStyles, className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
