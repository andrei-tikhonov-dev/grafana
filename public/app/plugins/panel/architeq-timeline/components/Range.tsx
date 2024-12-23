import { css } from '@emotion/css';
import React, { useState } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Button, RangeSlider, useStyles2 } from '@grafana/ui';

import { RangeType } from '../types';
import { setVariables } from '../utils';

const getStyles = (theme: GrafanaTheme2) => {
  return {
    container: css`
      display: flex;
      gap: 5px;
      margin-bottom: 24px;
      flex-direction: column;
      align-items: center;
      background-color: ${theme.colors.background.canvas};
      border-radius: 8px;
      padding: 16px;
    `,
    range: css`
      padding: 16px 14px 0 0;
      width: 90%;
      margin: auto;
    `,
    footer: css`
      display: flex;
      gap: 12px;
      align-items: center;
      height: 32px;
    `,
  };
};

type Props = RangeType;

export const Range: React.FC<Props> = ({ options = [], lastId, firstId }) => {
  const styles = useStyles2(getStyles);
  const startIndex = firstId ? options.findIndex((option) => option.id === firstId) : 0;
  const endIndex = lastId ? options.findIndex((option) => option.id === lastId) : options.length - 1;

  const [range, setRange] = useState<number[]>([Math.max(startIndex, 0), Math.min(endIndex, options.length - 1)]);

  if (!options?.length) {
    return null;
  }

  const rangeName = `${options[range[0]]?.name} - ${options[range[1]]?.name}`;
  const handleChange = (value: number[]) => {
    setRange(value);
  };

  const handleSet = () => {
    setVariables({ startId: options[range[0]]?.id, endId: options[range[1]]?.id });
  };

  const isDifferentFromInitial = range[0] !== startIndex || range[1] !== endIndex;

  return (
    <div className={styles.container}>
      <div className={styles.range}>
        <RangeSlider
          tooltipAlwaysVisible={false}
          min={0}
          max={options.length - 1}
          step={1}
          value={range}
          onChange={handleChange}
          formatTooltipResult={() => ' '}
        />
      </div>
      <div className={styles.footer}>
        {rangeName}
        {isDifferentFromInitial && (
          <Button size="sm" onClick={handleSet}>
            Set range
          </Button>
        )}
      </div>
    </div>
  );
};
