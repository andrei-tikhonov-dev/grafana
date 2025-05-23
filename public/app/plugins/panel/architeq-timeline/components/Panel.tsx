import { css, cx } from '@emotion/css';
import { StatusLine } from 'architeq-library';
import React from 'react';

import { GrafanaTheme2, PanelProps } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';

import { RequestMethod } from '../constants';
import { useRequest } from '../hooks/useRequest';
import { PanelOptions, PanelDataType, UpdateButtonPayload } from '../types';
import { formatDate } from '../utils';

import { BreadCrumbs } from './BreadCrumbs';
import { Goals } from './Goals';
import { InfoBlock } from './InfoBlock';
import { InfoLine } from './InfoLine';
import { ProgressBar } from './ProgressBar';
import { Range } from './Range';
import { Select } from './Select';
import { TimeLine } from './TimeLine';
import { UpdateButton } from './UpdateButton';

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

export const Panel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const styles = useStyles2(getStyles);
  const panelData = data.series[0]?.meta?.custom as PanelDataType;
  const {
    title,
    from,
    till,
    lastUpdated,
    weeks,
    progress,
    goals,
    select,
    info,
    breadCrumbs,
    team,
    name,
    infoTimeline,
    range,
    statuses = [],
    externalSprintId,
    externalBoardId,
  } = panelData;

  const { updateRequest } = useRequest({
    update: {
      url: options.updateUrl,
      method: RequestMethod.POST,
    },
  });

  const canUpdate = externalSprintId && externalBoardId;

  const handleUpdate = async () => {
    if (!canUpdate) {
      return;
    }
    const payload: UpdateButtonPayload = { externalSprintId, externalBoardId };
    return updateRequest(payload);
  };

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
      {options.updateUrl && (
        <UpdateButton onUpdate={handleUpdate} canUpdate={Boolean(canUpdate)} lastUpdated={lastUpdated} />
      )}
      {breadCrumbs && <BreadCrumbs items={breadCrumbs} />}
      <h1 className={styles.header}>
        {options.header} {name || title} {select && <Select options={select.options} label={select.label} />}
      </h1>
      {<Range options={range?.options} lastId={range?.lastId} firstId={range?.firstId} />}
      <div className={styles.info}>
        {info?.map((infoItem) => (
          <InfoLine key={infoItem.name} {...infoItem} />
        ))}
        {team && <InfoLine value={team} name="Team:" icon="fa6/FaUsersLine" />}
        {from && <InfoLine value={formatDate(from)} name="Start:" icon="fa6/FaCalendarDays" />}
        {till && <InfoLine value={formatDate(till)} name="End:" icon="fa6/FaCalendarDays" />}
      </div>
      {goals && <Goals data={goals} title={options.goalsTitle} updateUrl={options.goalsUpdateUrl} />}

      {weeks && (
        <div className={styles.timeline}>
          <TimeLine weeks={weeks} />
        </div>
      )}

      {infoTimeline?.map((info) => (
        <div key={info.name} className={styles.infoTimeline}>
          <InfoBlock {...info} key={info.name} />
        </div>
      ))}

      {progress && <ProgressBar {...progress} />}

      {statuses.length > 0 && (
        <footer className={styles.footer}>
          {statuses.map((status) => (
            <StatusLine key={status.title} {...status} />
          ))}
        </footer>
      )}
    </div>
  );
};
