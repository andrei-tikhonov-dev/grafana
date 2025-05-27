import { css } from '@emotion/css';
import React, { useState } from 'react';

import { Button, Drawer } from '@grafana/ui';

import { UiIcon, UiLink } from '../../../components/ui';
import { theme } from '../../../theme';
import { formatDate } from '../../../utils/dateTime';
import { toObjectKey } from '../../../utils/helpers';
import { BurndownDayData } from '../types';

interface Props {
  daysData: BurndownDayData[];
}

const styles = {
  drawer: css`
    padding: 20px;
  `,
  dateHeader: css`
    font-size: ${theme.typography.h4.fontSize};
    font-weight: ${theme.typography.h4.fontWeight};
    margin: 20px 0 12px;
    border-bottom: 1px solid ${theme.colors.border.weak};
    padding-bottom: 8px;
  `,
  changesList: css`
    margin-bottom: 16px;
  `,
  changeItem: css`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  `,
  status: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    margin-right: 8px;
  `,
  statusAdded: css`
    background-color: #feedcc;
    color: #b57215;
  `,
  statusRemoved: css`
    background-color: #f7ced3;
    color: #b12650;
  `,
  statusOther: css`
    background-color: #dacefe;
    color: #391ab3;
  `,
  separator: css`
    margin: 0 8px;
    color: ${theme.colors.border.medium};
  `,
  summary: css`
    flex: 1;
    word-break: break-word;
  `,
  noChanges: css`
    color: ${theme.colors.semantic.textLite};
    font-style: italic;
    margin-top: 20px;
  `,
  buttonWrapper: css``,
};

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'added':
      return (
        <span className={`${styles.status} ${styles.statusAdded}`}>
          <UiIcon name="Add2" />
        </span>
      );
    case 'removed':
      return (
        <span className={`${styles.status} ${styles.statusRemoved}`}>
          <UiIcon name="FolderClose" />
        </span>
      );
    default:
      return (
        <span className={`${styles.status} ${styles.statusOther}`}>
          <UiIcon name="CheckCircle" />
        </span>
      );
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
      <div className={styles.buttonWrapper}>
        <Button onClick={openDrawer} variant="secondary" icon="exchange-alt">
          Scope changes ({totalChanges})
        </Button>
      </div>

      {isDrawerOpen && (
        <Drawer title="Sprint scope changes" subtitle={`Total changes: ${totalChanges}`} onClose={closeDrawer}>
          <div className={styles.drawer}>
            {daysWithChanges.map((day) => (
              <div key={day.date}>
                <h3 className={styles.dateHeader}>{formatDate(day.date)}</h3>
                <div className={styles.changesList}>
                  {day.scopeChanges.map((change, index) => (
                    <div key={`${change.issueKey}-${index}`} className={styles.changeItem}>
                      <StatusIcon status={toObjectKey(change.status)} />
                      <UiLink url={change.url}>{change.issueKey}</UiLink>
                      <span className={styles.separator}>-</span>
                      <span className={styles.summary}>{change.summary}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Drawer>
      )}
    </>
  );
};
