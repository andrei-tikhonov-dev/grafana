import { css } from '@emotion/css';
import { Info } from 'lucide-react';
import React from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../components/shadcn/dialog';
import { ScrollArea } from '../../../components/shadcn/scroll-area';
import { UiButton, UiMarkdown } from '../../../components/ui';
import { MPanelInfo } from '../types';

interface Props extends MPanelInfo {
  className?: string;
}

const scrollAreaStyles = css`
  max-height: 60vh;
  padding-right: 1rem;
`;

const contentStyles = css`
  min-width: 80vw;
  padding-right: 1rem;
`;

/**
 * DashboardInfo component.
 * Displays a dialog with dashboard information.
 */
export const DashboardInfo: React.FC<Props> = ({
  content,
  title = 'Dashboard information',
  description,
  className,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <UiButton type="button" size="lg" variant="ghost" className={className} onClick={() => setOpen(true)}>
        <Info />
      </UiButton>

      <DialogContent className={contentStyles}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <ScrollArea className={scrollAreaStyles}>
          <UiMarkdown content={content} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

DashboardInfo.displayName = 'DashboardInfo';
