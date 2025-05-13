import { css } from '@emotion/css';
import React from 'react';

import { Ellipsis, Icon, JiraTypeIcon } from '../../../components/ui';
import { Link } from '../../../components/ui/link/Link';
import { theme } from '../../../theme';
import { formatRelativeDate } from '../../../utils/dateTime';

const styles = {
  oneLineCell: css`
    display: flex;
    align-items: center;
    white-space: nowrap;
  `,
  status: css`
    display: inline-block;
    border: 1px solid ${theme.colors.semantic.info};
    color: ${theme.colors.semantic.info};
    border-radius: ${theme.shape.radius.default};
    font-size: ${theme.typography.bodySmall.fontSize};
    padding: 2px 4px;
    white-space: nowrap;
  `,
  sprint: css`
    font-size: ${theme.typography.bodySmall.fontSize};
    white-space: nowrap;
  `,
};

export const SimilarTasksCellContent = ({ data, type }: { data: any; type: string }) => {
  if (data === undefined || data === null) {
    return <span>-</span>;
  }

  switch (type) {
    case 'link':
      return (
        <Link url={data.url}>
          <Ellipsis>{data.text}</Ellipsis>
        </Link>
      );

    case 'hasChanges':
      return data ? (
        <span style={{ color: theme.colors.semantic.warning }}>
          <Icon name="Warning" size="md" />
        </span>
      ) : null;

    case 'issueTypeIcon':
      return <JiraTypeIcon name={data} />;

    case 'issueStatus':
      return (
        <div className={styles.oneLineCell}>
          <span className={styles.status}>{data.current}</span>
          {data.previous && (
            <>
              <Icon name="ArrowForward" />
              <span className={styles.status}>{data.previous}</span>
            </>
          )}
        </div>
      );

    case 'user':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/*<img src={data.avatar} alt={data.name} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />*/}
          <Ellipsis>{data.name}</Ellipsis>
        </div>
      );

    case 'priority':
      return <Ellipsis>{data}</Ellipsis>;

    case 'date':
      return <Ellipsis>{formatRelativeDate(data)}</Ellipsis>;

    case 'sprint':
      return (
        <div className={styles.oneLineCell}>
          <span className={styles.sprint}>{data.current}</span>
          {data.previous && (
            <>
              <Icon name="ArrowForward" />
              <span className={styles.sprint}>{data.previous}</span>
            </>
          )}
        </div>
      );

    default:
      return <Ellipsis>{typeof data === 'object' ? JSON.stringify(data) : data}</Ellipsis>;
  }
};
