import { css, cx } from '@emotion/css';
import React from 'react';

import { theme } from '../../../../theme';
import { UiIcon } from '../../icon/UiIcon';
import { UiTooltip } from '../../tooltip/UiTooltip';

import { DefaultCell } from './DefaultCell';
import { CellProps } from './types';

const baseStatusStyle = css`
  display: inline-block;
  border: 1px solid;
  border-radius: ${theme.shape.radius.default};
  padding: 2px 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const styles = {
  container: css`
    cursor: pointer;
    display: flex;
    align-items: center;
    white-space: nowrap;
  `,
  current: cx(
    baseStatusStyle,
    css`
      border-color: ${theme.colors.semantic.warning};
      color: ${theme.colors.semantic.warning};
      font-size: ${theme.typography.bodySmall.fontSize};
      max-width: 80px;
    `
  ),
  previous: cx(
    baseStatusStyle,
    css`
      text-decoration: line-through;
      font-size: 8px;
      max-width: 40px;
    `
  ),
};

export const JiraChangesHistoryCell: React.FC<CellProps> = ({ value }) => {
  if (value.previous === undefined || value.previous === null) {
    return <DefaultCell value={value.current} />;
  }

  return (
    <UiTooltip
      content={
        <>
          <div>Now: {value.current}</div>
          <div>Before: {value.previous}</div>
        </>
      }
    >
      <div className={styles.container}>
        <span className={styles.previous}>{value.previous}</span>
        <UiIcon name="ArrowForward" />
        <span className={styles.current}>{value.current}</span>
      </div>
    </UiTooltip>
  );
};
