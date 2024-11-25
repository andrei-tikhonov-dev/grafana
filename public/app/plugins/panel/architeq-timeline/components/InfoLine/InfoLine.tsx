import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2, LinkButton } from '@grafana/ui';

import { InfoLineType } from '../../types';

import { InfoIcon } from './InfoIcon';
import { InfoLink } from './InfoLink';

type Props = InfoLineType & {
  newTab?: boolean;
};

const getStyles = (theme: GrafanaTheme2) => ({
  infoItem: css`
    display: flex;
    gap: 5px;
    align-items: center;
  `,
});

export const InfoLine: React.FC<Props> = ({ status, value, name, icon, link, button, newTab = false }) => {
  const styles = useStyles2(getStyles);

  const linkTarget = newTab ? '_blank' : '_self';
  const linkRel = newTab ? 'noopener noreferrer' : undefined;

  const renderContent = () => {
    if (button && value) {
      return (
        <LinkButton size="sm" variant="primary" fill="outline" href={link} target={linkTarget} rel={linkRel}>
          {value}
        </LinkButton>
      );
    }

    if (link && value) {
      return (
        <InfoLink href={link} target={linkTarget} rel={linkRel}>
          {String(value)}
        </InfoLink>
      );
    }

    return value;
  };

  return (
    <div className={styles.infoItem}>
      {icon && <InfoIcon icon={icon} status={status} />}
      <strong>{name}</strong>
      {renderContent()}
    </div>
  );
};
