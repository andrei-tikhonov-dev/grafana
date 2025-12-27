import { css, cx } from '@emotion/css';
import { Sparkles } from 'lucide-react';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { Separator } from '../../components/shadcn/separator';
import { UiBreadcrumbs, UiButton, UiCard, UiHorizontalGroup, UiTypography, UiVerticalGroup } from '../../components/ui';
import { useAiChatDrawer } from '../../features/ai-chat';
import { useGrafanaVariables } from '../../hooks/useGrafanaVariables';
import { panelContainerStyles } from '../../theme';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { DashboardInfo } from './components/DashboardInfo';
import { EventsGroup } from './components/EventsGroup';
import { IntervalSelector } from './components/IntervalSelector';
import { OrganizationUnit } from './components/OrganizationUnit';
import { Progress } from './components/Progress';
import { StatusCard } from './components/StatusCard';
import { Timeline } from './components/Timeline';
import { UpdateButton } from './components/UpdateButton';
import { MHeaderCustomData } from './types';

interface Props extends PanelProps<TPanelOptions> {}

const initialData: MHeaderCustomData = {
  title: '',
};

const containerStyles = (height: number) => css`
  height: ${height}px;
  overflow-y: auto;
`;

const titleStyles = css`
  margin: 0;
`;

const eventsContainerStyles = css`
  width: 100%;
`;

const CONTAINER_PADDINGS = 70;

/**
 * Header panel component.
 * Displays dashboard information, status, metrics, and timeline.
 */
export const Header: React.FC<Props> = ({ width, height, data, options }) => {
  const {
    title,
    status,
    breadcrumbs,
    update,
    info,
    organizationUnit,
    progress,
    interval,
    timeline,
    eventsUpcoming,
    eventsToday,
  } = getGrafanaCustomData<MHeaderCustomData>(data, initialData);

  const hasActions = true;
  const hasMetrics = interval || progress || organizationUnit;
  const hasEvents = eventsToday || eventsUpcoming;
  const hasTimelineSection = timeline || hasEvents;
  const grafanaVariables = useGrafanaVariables(['team', 'project']);

  // AI Chat Drawer
  const { openGeneral, openAutoSummary, drawer } = useAiChatDrawer({
    teamId: grafanaVariables.team as string,
    project: grafanaVariables.project as string,
    dashboard: options.header?.dashboard,
    metric: options.header?.metric,
    startScreen: {
      title: 'Your sprint, explained instantly',
      subtitle: 'Choose a question to get data-driven insights',
      prompts: [
        'Check the pulse of your sprint and spot problems early',
        'Understand how your team is doing & where improvement is possible',
        'Predict outcomes and understand "what-ifs"',
        'Learn from historical data and uncover recurring patterns',
      ],
    },
  });

  return (
    <UiVerticalGroup align="stretch" className={cx(panelContainerStyles, containerStyles(height))}>
      {breadcrumbs && (
        <>
          <UiBreadcrumbs items={breadcrumbs} />
          <Separator />
        </>
      )}

      <UiHorizontalGroup justify="space-between">
        <UiHorizontalGroup align="center">
          <UiTypography className={titleStyles} variant="dashboardTitle">
            {title}
          </UiTypography>
          {info && <DashboardInfo {...info} />}
        </UiHorizontalGroup>

        {hasActions && (
          <UiHorizontalGroup>
            {update && <UpdateButton {...update} />}
            <UiButton onClick={openGeneral} variant="ai">
              <Sparkles />
              AI helper
            </UiButton>
          </UiHorizontalGroup>
        )}
      </UiHorizontalGroup>

      {status && <StatusCard {...status} onAnalyze={openAutoSummary} />}

      {hasMetrics && (
        <UiHorizontalGroup gap="lg" justify="start" align="center">
          {interval && <IntervalSelector {...interval} />}
          {progress && <Progress {...progress} />}
          {organizationUnit && <OrganizationUnit {...organizationUnit} />}
        </UiHorizontalGroup>
      )}

      {hasTimelineSection && (
        <UiCard>
          <UiVerticalGroup align="start" gap="lg">
            {timeline && <Timeline days={timeline} width={width - CONTAINER_PADDINGS} />}

            {hasEvents && (
              <UiHorizontalGroup justify="space-between" align="start" gap="lg" className={eventsContainerStyles}>
                {eventsToday && <EventsGroup title="What's happening today" events={eventsToday} />}
                {eventsUpcoming && <EventsGroup title="Coming up" events={eventsUpcoming} />}
              </UiHorizontalGroup>
            )}
          </UiVerticalGroup>
        </UiCard>
      )}

      {/* AI Chat Drawer */}
      {drawer}
    </UiVerticalGroup>
  );
};
