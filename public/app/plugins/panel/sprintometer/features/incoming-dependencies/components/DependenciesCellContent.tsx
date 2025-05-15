import React from 'react';

import { Ellipsis, Icon, JiraStatusCell, JiraTypeIcon } from '../../../components/ui';
import { Link } from '../../../components/ui/link/Link';
import { theme } from '../../../theme';
import { formatRelativeDate } from '../../../utils/dateTime';

export const DependenciesCellContent = ({ data, type, value }: { value: any; data: any; type: string }) => {
  if (value === undefined || value === null) {
    return <span>-</span>;
  }

  switch (type) {
    case 'link':
      return (
        <Link url={value.url}>
          <Ellipsis>{value.text}</Ellipsis>
        </Link>
      );

    case 'hasChanges':
      return value ? (
        <span style={{ color: theme.colors.semantic.warning }}>
          <Icon name="Warning" size="md" />
        </span>
      ) : null;

    case 'issueTypeIcon':
      return <JiraTypeIcon name={value} />;

    case 'issueStatus':
      return <JiraStatusCell value={value} />;

    case 'user':
      return <Ellipsis>{value.name}</Ellipsis>;

    case 'priority':
      return <Ellipsis>{value}</Ellipsis>;

    case 'date':
      return <Ellipsis>{formatRelativeDate(value)}</Ellipsis>;

    case 'sprint':
      return <JiraStatusCell value={value} />;

    default:
      return <Ellipsis>{typeof value === 'object' ? JSON.stringify(value) : value}</Ellipsis>;
  }
};
