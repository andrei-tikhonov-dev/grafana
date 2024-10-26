import { css } from '@emotion/css';
import cn from 'classnames';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Icon, Tag, useStyles2 } from '@grafana/ui';

import { LinkCardType } from '../../types';
import { ColoredIcon } from '../ColoredIcon';
import { InfoLine } from '../InfoLine';

const getStyles = (theme: GrafanaTheme2) => {
  return {
    container: css`
      border-radius: 8px;
      border: 1px solid ${theme.colors.warning.text};
      padding: 16px;
      width: 350px;
      min-width: 350px;
      position: relative;
      cursor: pointer;
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
      &:hover {
        background-color: ${theme.colors.warning.transparent};
        box-shadow: ${theme.shadows.z2};
        transform: translate(-1px, -3px);
      }
    `,
    containerDisabled: css`
      position: relative;
      border-radius: 8px;
      border: 1px solid ${theme.colors.border.medium};
      padding: 16px;
      width: 350px;
      min-width: 350px;
    `,
    title: css`
      margin-bottom: 12px;
    `,
    linkIcon: css`
      color: ${theme.colors.warning.text};
      position: absolute;
      right: 12px;
    `,
    comingSoon: css`
      color: ${theme.colors.secondary.text};
      position: absolute;
      right: 8px;
      top: 8px;
    `,
    body: css`
      display: flex;
      gap: 12px;
      align-items: center;
      margin-bottom: 12px;
    `,
    value: css`
      display: flex;
      gap: 4px;
      font-size: 48px;
      font-weight: 700;
      align-items: flex-start;
      line-height: 48px;
    `,
    unit: css`
      font-size: 14px;
      line-height: 22px;
      font-weight: 400;
    `,
    infoItems: css``,
    disabled: css`
      opacity: 0.5;
    `,
  };
};

interface Props extends LinkCardType {}

export const LinkCard = ({ title, url, icon, unit, value, newTab, info, isComingSoon }: Props) => {
  const styles = useStyles2(getStyles);
  const shouldShowBody = icon || unit || value !== undefined;

  const Content = (
    <>
      {url && (
        <div className={styles.linkIcon}>
          <Icon name="link" size="lg" />
        </div>
      )}
      {isComingSoon && (
        <div className={styles.comingSoon}>
          <Tag name="coming soon" />
        </div>
      )}
      {shouldShowBody && (
        <div className={styles.body}>
          {icon && <ColoredIcon alt={title} path={icon} />}
          {value !== undefined && (
            <div className={styles.value}>
              {value}
              {unit && <div className={styles.unit}>{unit}</div>}
            </div>
          )}
        </div>
      )}
      {title && <h4 className={styles.title}>{title}</h4>}
      {info && (
        <div className={styles.infoItems}>
          {info.map((infoItem) => (
            <InfoLine key={infoItem.name} {...infoItem} />
          ))}
        </div>
      )}
    </>
  );

  return url ? (
    <a
      href={url}
      target={newTab ? '_blank' : '_self'}
      rel={newTab ? 'noopener noreferrer' : undefined}
      className={cn(styles.container, { [styles.disabled]: isComingSoon })}
    >
      {Content}
    </a>
  ) : (
    <div className={cn(styles.containerDisabled, { [styles.disabled]: isComingSoon })}>{Content}</div>
  );
};
