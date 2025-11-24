import { css } from '@emotion/css';
import { Users } from 'lucide-react';
import React from 'react';

import { UiAvatarGroup, UiHorizontalGroup, UiTypography } from '../../../components/ui';
import { MOrganizationUnit } from '../types';

interface Props extends MOrganizationUnit {
  className?: string;
}

/**
 * OrganizationUnit component.
 * Displays the organization unit name and members.
 */
export const OrganizationUnit: React.FC<Props> = ({ members, name, className }) => {
  return (
    <UiHorizontalGroup gap="sm" className={className}>
      <Users size={16} />
      <UiTypography as="span" variant="bodyBold">
        {name}
      </UiTypography>
      {members && (
        <UiAvatarGroup
          users={members}
          className={css`
            flex-shrink: 0;
          `}
        />
      )}
    </UiHorizontalGroup>
  );
};
