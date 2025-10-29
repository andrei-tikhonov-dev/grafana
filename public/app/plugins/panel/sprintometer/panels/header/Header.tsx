import { css, cx } from '@emotion/css';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { UiIcon, UiText, UiTypography } from '../../components/ui';
import { UiZeroState } from '../../components/ui/zero-state/UiZeroState';
import { theme } from '../../theme';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { Timeline } from './components/Timeline';
import { sprintTimeline } from './mocks/timeline';
import { HeaderCustomDataInterface } from './types';

interface Props extends PanelProps<TPanelOptions> {}

const styles = {
  wrapper: css`
    padding: 10px;
    font-family: ${theme.typography.fontFamily};
    display: flex;
    flex-direction: column;
  `,
  content: css`
    flex: 1 1 auto;
    padding-right: 16px;
    padding-top: 16px;
    overflow-y: auto;
  `,
  headerInfo: css`
    display: flex;
    gap: 24px;
  `,
  headerInfoItem: css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
};

const initialData: HeaderCustomDataInterface = {};

export const Header: React.FC<Props> = ({ width, height, data }) => {
  const { zeroState, ...customData } = getGrafanaCustomData<HeaderCustomDataInterface>(data, initialData);
  console.log(customData);

  if (zeroState) {
    return <UiZeroState {...zeroState} />;
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <UiTypography variant="panelTitle">Current sprint</UiTypography>
      <div className={styles.headerInfo}>
        <UiText className={styles.headerInfoItem}>
          <UiIcon name="Group" />
          <strong>Team:</strong>
          <span>KIB</span>
        </UiText>
        <UiText className={styles.headerInfoItem}>
          <UiIcon name="CalendarMonth" />
          <strong>Period:</strong>
          <span>2 Apr - 14 Apr, 2025</span>
        </UiText>
      </div>

      <div className={styles.content}>
        <Timeline weeks={sprintTimeline.weeks} currentDate={sprintTimeline.currentDate} />
      </div>
    </div>
  );
};
