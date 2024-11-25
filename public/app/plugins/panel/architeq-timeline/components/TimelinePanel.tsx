import { css, cx } from '@emotion/css';
import React from 'react';

import { dateTime, GrafanaTheme2, PanelProps } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';

import { PanelOptions, PanelDataType } from '../types';

import { BreadCrumbs } from './BreadCrumbs';
import { Goals } from './Goals';
import { InfoBlock } from './InfoBlock';
import { InfoLine } from './InfoLine/InfoLine';
import { ProgressBar } from './ProgressBar';
import { Select } from './Select';
import { SprintTimeline } from './SprintTimeline';

interface Props extends PanelProps<PanelOptions> {}

const getStyles = (theme: GrafanaTheme2) => {
  return {
    wrapper: css`
      position: relative;
      overflow: auto;
    `,
    header: css`
      display: flex;
      align-items: center;
      gap: 24px;
    `,
    info: css`
      display: flex;
      gap: 24px;
      margin-bottom: 24px;
    `,
    infoItem: css`
      display: flex;
      gap: 5px;
      align-items: center;
    `,
    timeline: css`
      margin-bottom: 24px;
    `,
    infoTimeline: css`
      margin-bottom: 24px;
    `,
    footer: css`
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;
    `,
  };
};

export const TimelinePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const styles = useStyles2(getStyles);
  const panelData = data.series[0]?.meta?.custom as PanelDataType;
  const {
    title,
    from,
    till,
    weeks,
    progress,
    goals,
    select,
    info,
    infoFooter,
    breadCrumbs,
    sprintOnTarget,
    team,
    name,
    infoStatus,
    completedIssues,
    totalIssues,
    infoTimeline,
  } = panelData;
  const descriptionIssues =
    completedIssues !== undefined && totalIssues !== undefined
      ? `${completedIssues} of ${totalIssues} issues have been completed`
      : '';

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
      {breadCrumbs && <BreadCrumbs items={breadCrumbs} />}
      <h1 className={styles.header}>
        {options.header} {name || title} {select && <Select options={select.options} label={select.label} />}
      </h1>

      <div className={styles.info}>
        {info?.map((infoItem) => <InfoLine key={infoItem.name} {...infoItem} />)}
        {team && <InfoLine value={team} name="Team:" icon="fa6/FaUsersLine" />}
        {from && <InfoLine value={dateTime(from).format('DD MMM, YYYY')} name="Start:" icon="fa6/FaCalendarDays" />}
        {till && <InfoLine value={dateTime(till).format('DD MMM, YYYY')} name="End:" icon="fa6/FaCalendarDays" />}
      </div>
      {goals && <Goals data={goals} title={options.goalsTitle} updateUrl={options.goalsUpdateUrl} />}

      {weeks && (
        <div className={styles.timeline}>
          <SprintTimeline weeks={weeks} />
        </div>
      )}

      {infoTimeline?.map((info) => (
        <div key={info.name} className={styles.infoTimeline}>
          <InfoBlock {...info} key={info.name} />
        </div>
      ))}

      {progress && <ProgressBar {...progress} />}

      <footer className={styles.footer}>
        {sprintOnTarget && <InfoBlock status={sprintOnTarget.status} value={sprintOnTarget.message} />}
        {infoFooter?.map((info) => <InfoBlock {...info} key={info.name} />)}
        {/* Deprecated */}
        {descriptionIssues && <InfoBlock value={descriptionIssues} />}
        {/* Deprecated */}
        {infoStatus && <InfoBlock value={infoStatus.message} status={infoStatus.status} />}
      </footer>
    </div>
  );
};
