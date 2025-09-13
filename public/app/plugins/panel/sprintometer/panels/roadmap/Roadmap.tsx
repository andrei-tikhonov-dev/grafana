import { css, cx } from '@emotion/css';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { theme } from '../../theme';
import { TPanelOptions } from '../../types';

import DemoBasic from './components/DemoBasic';

interface CumulativeFlowDiagramProps extends PanelProps<TPanelOptions> {}

const styles = {
  wrapper: css`
    overflow: hidden;
  `,
  container: css`
    padding: 10px;
    flex: 1 1 auto;
    font-family: ${theme.typography.fontFamily};
    gap: 20px;
    display: flex;
    flex-direction: column;
    min-width: 998px;
  `,
  content: css`
    flex: 1 1 auto;
  `,
  filters: css`
    flex: 0 0 auto;
    display: flex;
    gap: 10px;
  `,
  summaryContainer: css`
    flex: 0 0 auto;
    display: flex;
    gap: 10px;
    width: 100%;
  `,
  input: css`
    width: 300px;
  `,
};

export const Roadmap: React.FC<CumulativeFlowDiagramProps> = ({
  width,
  height,
  data: panelData,
  options,
  onOptionsChange,
}) => {
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
      <div
        className={cx(
          styles.container,
          css`
            height: ${height}px;
          `
        )}
      >
        <DemoBasic darkMode={false} />
      </div>
    </div>
  );
};
