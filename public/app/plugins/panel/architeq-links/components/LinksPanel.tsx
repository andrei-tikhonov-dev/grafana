import { css, cx } from '@emotion/css';
import React from 'react';

import { PanelProps } from '@grafana/data';
import { PanelDataErrorView } from '@grafana/runtime';
import { useStyles2 } from '@grafana/ui';

import { LinkDataType, SimpleOptions } from '../types';

import { LinkCard } from './LinkCard';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      display: flex;
      flex-direction: column;
    `,
    linksContainer: css`
      display: flex;
      align-items: flex-start;
      gap: 12px;
      overflow: auto;
      padding: 4px;
    `,
  };
};

export const LinksPanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const styles = useStyles2(getStyles);

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  const dataFrame = data.series[0];
  const values: LinkDataType[] = dataFrame.fields[0].values;

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
      {options.header && <h3>{options.header}</h3>}
      <div className={styles.linksContainer}>
        {values.map((data) => (
          <LinkCard data={data} key={data.title} />
        ))}
      </div>
    </div>
  );
};
