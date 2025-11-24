import { RefreshCw } from 'lucide-react';
import React from 'react';

import { UiButton, UiHorizontalGroup, UiTypography } from '../../../components/ui';
import { formatRelativeDate } from '../../../utils/dateTime';
import { MUpdate } from '../types';

interface UpdateButtonProps extends MUpdate {
  buttonText?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

/**
 * UpdateButton component.
 * Displays the last update time and a button to refresh data.
 */
export const UpdateButton: React.FC<UpdateButtonProps> = ({ url, buttonText, date, onClick, isLoading }) => {
  const getStatusText = (): string | null => {
    if (isLoading) {
      return 'Please wait, updating data...';
    }
    if (date) {
      return `Last update: ${formatRelativeDate(date)}`;
    }
    return null;
  };

  const statusText = getStatusText();

  return (
    <UiHorizontalGroup gap="sm">
      <UiTypography color="light" as="span">
        {statusText}
      </UiTypography>
      {url && (
        <UiButton variant="outline" onClick={onClick} disabled={isLoading}>
          <RefreshCw />
          {buttonText || 'Update'}
        </UiButton>
      )}
    </UiHorizontalGroup>
  );
};
