import { css, cx } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2, LinkButton } from '@grafana/ui';

import { InfoLineType } from '../../types';

import { InfoIcon } from './InfoIcon';
import { InfoLink } from './InfoLink';

type Props = InfoLineType & {
  className?: string;
  valueClassName?: string;
  fullLink?: boolean;
};

const getStyles = (theme: GrafanaTheme2) => ({
  infoItem: css`
    display: flex;
    gap: 5px;
    align-items: center;
  `,
});

export const InfoLine: React.FC<Props> = ({
  status,
  value,
  valueClassName,
  name,
  icon,
  link,
  button,
  newTab = false,
  className,
  fullLink,
}) => {
  const styles = useStyles2(getStyles);

  const linkTarget = newTab ? '_blank' : '_self';
  const linkRel = newTab ? 'noopener noreferrer' : undefined;

  const handleClick = () => {
    if (!link || !fullLink) {
      return;
    }
    if (newTab) {
      window.open(link, '_blank');
    } else {
      window.location.href = link;
    }
  };

  const renderContent = () => {
    if (button && value && !fullLink) {
      return (
        <LinkButton size="sm" variant="primary" fill="outline" href={link} target={linkTarget} rel={linkRel}>
          {value}
        </LinkButton>
      );
    }

    if (link && value && !fullLink) {
      return (
        <InfoLink href={link} target={linkTarget} rel={linkRel}>
          {String(value)}
        </InfoLink>
      );
    }

    return <div className={valueClassName}>{value}</div>;
  };

  return (
    <div className={cx(styles.infoItem, className)} onClick={handleClick}>
      {icon && <InfoIcon icon={icon} status={status} />}
      <strong>{name}</strong>
      {renderContent()}
    </div>
  );
};
