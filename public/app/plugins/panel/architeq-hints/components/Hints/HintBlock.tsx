import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';

import { InfoLineType } from '../../types';
import { InfoLine } from '../InfoLine';

type Props = {
  header: InfoLineType;
  items: InfoLineType[];
};

const getStyles = (theme: GrafanaTheme2) => ({
  hintBlock: css``,
  hintItem: css`
    padding: 12px;
    border-bottom: 1px solid ${theme.colors.border.medium};
    cursor: pointer;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background-color: ${theme.colors.background.secondary};
    }
  `,
  hintItemValue: css`
    &:hover {
      text-decoration: underline;
    }
  `,
  hintHeader: css`
    font-size: 1.2rem;
    padding: 12px 0;
  `,
  hintBlockContainer: css`
    border: 1px solid ${theme.colors.border.medium};
    margin-bottom: 12px;
  `,
});

export const HintBlock: React.FC<Props> = ({ header, items }) => {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.hintBlock}>
      {header && <InfoLine {...header} className={styles.hintHeader} />}
      <div className={styles.hintBlockContainer}>
        {items.map((item) => (
          <InfoLine
            key={item.value}
            {...item}
            className={styles.hintItem}
            valueClassName={styles.hintItemValue}
            fullLink
          />
        ))}
      </div>
    </div>
  );
};
