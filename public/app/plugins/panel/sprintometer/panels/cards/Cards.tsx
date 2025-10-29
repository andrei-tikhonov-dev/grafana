import { css, cx } from '@emotion/css';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { UiTypography } from '../../components/ui';
import { theme } from '../../theme';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { CardsCustomDataInterface } from './types';

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
    overflow-y: auto;
  `,
};

const initialData: CardsCustomDataInterface = {};

export const Cards: React.FC<Props> = ({ width, height, data }) => {
  const customData = getGrafanaCustomData<CardsCustomDataInterface>(data, initialData);
  console.log(customData);

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
      <div className={styles.content}></div>
    </div>
  );
};
