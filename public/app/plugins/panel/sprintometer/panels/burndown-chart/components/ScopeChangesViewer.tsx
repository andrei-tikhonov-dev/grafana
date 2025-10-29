import { css } from '@emotion/css';
import { MinusSquare, PlusSquare, CircleOff, Shuffle } from 'lucide-react';
import React, { useState } from 'react';

import { Drawer } from '@grafana/ui';

import { UiButton, UiCard, UiHorizontalGroup, UiLink, UiTypography, UiVerticalGroup } from '../../../components/ui';
import { theme3 } from '../../../theme';
import { formatFullDate } from '../../../utils/dateTime';
import { toObjectKey } from '../../../utils/helpers';
import { MDayData } from '../types';

interface Props {
  daysData: MDayData[];
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'added':
      return (
        <PlusSquare
          className={css`
            color: ${theme3.custom.colorPrimary};
          `}
        />
      );
    case 'removed':
      return (
        <MinusSquare
          className={css`
            color: ${theme3.custom.colorSecondary};
          `}
        />
      );
    default:
      return <CircleOff />;
  }
};

export const ScopeChangesViewer: React.FC<Props> = ({ daysData }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const daysWithChanges = daysData.filter((day) => day.scopeChanges.length > 0);
  const totalChanges = daysData.reduce((total, day) => total + day.scopeChanges.length, 0);

  if (totalChanges === 0) {
    return null;
  }

  return (
    <>
      <UiButton onClick={openDrawer}>
        <Shuffle />
        Scope changes ({totalChanges})
      </UiButton>

      {isDrawerOpen && (
        <Drawer title="Sprint scope changes" subtitle={`Total changes: ${totalChanges}`} onClose={closeDrawer}>
          <UiVerticalGroup
            gap="md"
            align="start"
            className={css`
              padding: ${theme3.tailwind.spacing4};
            `}
          >
            {daysWithChanges.map((day) => (
              <UiCard
                key={day.date}
                className={css`
                  width: 100%;
                `}
              >
                <UiVerticalGroup align="start" gap="sm" key={day.date}>
                  <UiTypography variant="h4">{formatFullDate(day.date)}</UiTypography>
                  <UiVerticalGroup align="start" gap="sm">
                    {day.scopeChanges.map((change, index) => (
                      <UiTypography key={`${change.issueKey}-${index}`}>
                        <UiVerticalGroup align="start" gap="xs">
                          <UiHorizontalGroup gap="sm">
                            <StatusIcon status={toObjectKey(change.status)} />
                            <UiLink url={change.url}>{change.issueKey}</UiLink>
                          </UiHorizontalGroup>
                          {change.summary}
                        </UiVerticalGroup>
                      </UiTypography>
                    ))}
                  </UiVerticalGroup>
                </UiVerticalGroup>
              </UiCard>
            ))}
          </UiVerticalGroup>
        </Drawer>
      )}
    </>
  );
};
