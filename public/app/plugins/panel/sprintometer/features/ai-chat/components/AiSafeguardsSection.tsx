import { css } from '@emotion/css';
import { ShieldCheck } from 'lucide-react';
import React from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../components/shadcn/accordion';
import { UiMarkdown } from '../../../components/ui';
import { theme3 } from '../../../theme';

interface Props {
  markdown: string;
}

const styles = {
  trigger: css`
    display: flex;
    align-items: center;
    gap: ${theme3.tailwind.spacing2};
    font-size: ${theme3.tailwind.textSm};
    color: ${theme3.shadcn.mutedForeground};
  `,
  icon: css`
    flex-shrink: 0;
  `,
};

export const AiSafeguardsSection: React.FC<Props> = ({ markdown }) => (
  <Accordion type="single" collapsible>
    <AccordionItem value="safeguards">
      <AccordionTrigger>
        <span className={styles.trigger}>
          <ShieldCheck size={16} className={styles.icon} />
          AI Safeguards
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <UiMarkdown content={markdown} />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
