import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Icon, Tooltip, useStyles2 } from '@grafana/ui';

import { LinkDataType } from '../../types';

const getStyles = (theme: GrafanaTheme2) => {
  return {
    container: css`
      background-color: ${theme.colors.background.canvas};
      border-radius: 8px;
      padding: 16px;
      min-width: 250px;
      cursor: pointer;
      flex: 1;
      &:hover {
        background-color: ${theme.colors.warning.transparent};
        box-shadow: ${theme.shadows.z2};
      }
    `,
    containerDisabled: css`
      background-color: ${theme.colors.background.canvas};
      border-radius: 8px;
      padding: 16px;
      min-width: 250px;
    `,
    title: css`
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 22px;
    `,
    body: css`
      display: flex;
      gap: 12px;
      min-height: 100px;
      align-items: flex-start;
    `,
    icon: css`
      width: 80px;
    `,
    value: css`
      display: flex;
      gap: 4px;
      font-size: 32px;
      font-weight: 700;
      align-items: baseline;
    `,
    unit: css`
      font-size: 14px;
      font-weight: 400;
    `,
    description: css`
      font-size: 12px;
    `,
    status: css`
      font-size: 12px;
      font-weight: 700;
    `,
  };
};

type Props = {
  data: LinkDataType;
};

export const LinkCard = ({ data }: Props) => {
  const styles = useStyles2(getStyles);

  const Content = (
    <>
      <div className={styles.title}>{data.title}</div>
      <div className={styles.body}>
        <img className={styles.icon} src={data.icon} alt={data.title} />
        <div>
          {data.value !== undefined && (
            <div className={styles.value}>
              {data.value}

              <span className={styles.unit}>{data.unit}</span>
            </div>
          )}
          <div className={styles.description}>
            {data.description}{' '}
            {data.tooltip && (
              <Tooltip content={<div dangerouslySetInnerHTML={{ __html: data.tooltip }} />}>
                <Icon name="question-circle" />
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return data.disabled ? (
    <div className={styles.containerDisabled}>{Content}</div>
  ) : (
    <a
      href={data.url}
      target={data.newTab ? '_blank' : '_self'}
      rel={data.newTab ? 'noopener noreferrer' : undefined}
      className={styles.container}
    >
      {Content}
    </a>
  );
};
