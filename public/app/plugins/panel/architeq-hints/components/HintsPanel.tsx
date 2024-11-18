import { css, cx } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2, PanelProps } from '@grafana/data';
import { PanelDataErrorView } from '@grafana/runtime';
import { useStyles2, useTheme2 } from '@grafana/ui';

import { HintsCustomMetaResponse, PanelOptions } from '../types';

import { HintBlock } from './Hints';
import { InfoLine } from './InfoLine';

interface Props extends PanelProps<PanelOptions> {}

const getStyles = (theme: GrafanaTheme2) => {
  return {
    wrapper: css`
      overflow: auto;
    `,
    header: css`
      font-size: 1.7rem;
    `,
    description: css``,
  };
};

export const HintsPanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  // @ts-ignore
  const theme = useTheme2();
  const styles = useStyles2(getStyles);

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  const dataFrame = data.series[0];
  // @ts-ignore
  const { hints, header, description } = dataFrame.meta?.custom as HintsCustomMetaResponse;

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
      {header && <InfoLine {...header} className={styles.header} />}
      {description && <p className={styles.description}>{description}</p>}
      {hints?.map((hint) => <HintBlock {...hint} />)}
    </div>
  );
};
