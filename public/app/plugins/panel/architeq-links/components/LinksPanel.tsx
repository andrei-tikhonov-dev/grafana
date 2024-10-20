import { css, cx } from '@emotion/css';
import React from 'react';

import { PanelProps } from '@grafana/data';
import { PanelDataErrorView } from '@grafana/runtime';
import { useStyles2 } from '@grafana/ui';

import { LinkCardDataType, SimpleOptions } from '../types';

import { LinkCardRow } from './LinkCardRow';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      overflow: auto;
    `,
    header: css`
      margin-bottom: 24px;
    `,
    rowContainer: css`
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding-bottom: 12px;
    `,
  };
};

export const LinksPanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const styles = useStyles2(getStyles);

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  const dataFrame = data.series[0];
  const linkCardData = dataFrame.meta?.custom as LinkCardDataType;
  const { header, description, rows } = linkCardData;
  const hasHeader = header || description;

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
      {hasHeader && (
        <div className={styles.header}>
          {linkCardData.header && <h2>{linkCardData.header}</h2>}
          {linkCardData.description && <p>{linkCardData.description}</p>}
        </div>
      )}
      <div className={styles.rowContainer}>
        {rows?.map((rowData) => <LinkCardRow key={rowData.title} {...rowData} />)}
      </div>
    </div>
  );
};
