import { css, cx } from '@emotion/css';
import { Ban, ChevronDown, Circle, Construction, TramFront } from 'lucide-react';
import React, { useState } from 'react';

import { ScrollArea, ScrollBar } from '../../../components/shadcn/scroll-area';
import { UiEllipsis, UiHorizontalGroup, UiMarkdown, UiTypography } from '../../../components/ui';
import { statusStyles, theme3 } from '../../../theme';
import { ESprintometerStatus, MSprintometerStatusData } from '../../../types';

export interface SprintometerStatusCardProps extends MSprintometerStatusData {
  height?: number;
  className?: string;
}

const containerStyles = css`
  transition: all 0.2s ease;
`;

const headerStyles = css`
  padding: ${theme3.tailwind.spacing4};
`;

const detailsContainerStyles = css`
  overflow: hidden;
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease,
    margin-top 0.3s ease;
`;

const detailsContainerOpenStyles = css`
  opacity: 1;
  padding: ${theme3.tailwind.spacing4};
`;

const detailsContainerClosedStyles = css`
  max-height: 0;
  opacity: 0;
  margin-top: 0;
`;

const scrollAreaStyles = css`
  width: 100%;
`;

const chevronStyles = css`
  transition: transform 0.3s ease;
  flex-shrink: 0;
`;

const chevronRotatedStyles = css`
  transform: rotate(180deg);
`;

const innerGroupStyles = css`
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

const statusStylesMap: Record<ESprintometerStatus, ReturnType<typeof css>> = {
  [ESprintometerStatus.Default]: statusStyles.default,
  [ESprintometerStatus.OnTrack]: statusStyles.onTrack,
  [ESprintometerStatus.NeedsAttention]: statusStyles.needsAttention,
  [ESprintometerStatus.HighRisk]: statusStyles.highRisk,
};

const statusIconsMap: Record<ESprintometerStatus, React.ComponentType<any>> = {
  [ESprintometerStatus.Default]: Circle,
  [ESprintometerStatus.OnTrack]: TramFront,
  [ESprintometerStatus.NeedsAttention]: Construction,
  [ESprintometerStatus.HighRisk]: Ban,
};

/**
 * StatusCard component.
 * Displays the sprintometer status with expandable details.
 */
export const StatusCard: React.FC<SprintometerStatusCardProps> = ({
  status,
  name,
  summary,
  className,
  details,
  height = 300,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusStyle = statusStylesMap[status];
  const StatusIcon = statusIconsMap[status];
  const hasDetails = Boolean(details);

  const handleToggle = () => {
    if (hasDetails) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={cx(containerStyles, statusStyle, className)}>
      <UiHorizontalGroup
        justify="space-between"
        className={cx(
          headerStyles,
          css`
            cursor: ${hasDetails ? 'pointer' : 'default'};
          `
        )}
        onClick={handleToggle}
      >
        <UiHorizontalGroup justify="start" gap="sm" className={innerGroupStyles}>
          <StatusIcon />
          <UiTypography as="div" variant="bodyBold" color="inherit">
            <UiEllipsis>{name}</UiEllipsis>
          </UiTypography>
          <UiEllipsis style={{ minWidth: 0, flex: 1 }}>{summary}</UiEllipsis>
        </UiHorizontalGroup>
        {hasDetails && <ChevronDown size={20} className={cx(chevronStyles, isExpanded && chevronRotatedStyles)} />}
      </UiHorizontalGroup>

      {hasDetails && (
        <div
          className={cx(detailsContainerStyles, isExpanded ? detailsContainerOpenStyles : detailsContainerClosedStyles)}
        >
          <ScrollArea
            className={cx(
              scrollAreaStyles,
              css`
                max-height: ${height}px;
              `
            )}
          >
            <UiMarkdown content={details} />
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      )}
    </div>
  );
};
