import { useQuery } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import React from 'react';

import { useApi } from '../../../api';
import { UiButton, UiHorizontalGroup, UiTypography } from '../../../components/ui';
import { formatRelativeDate } from '../../../utils/dateTime';
import { MUpdate } from '../types';

interface UpdateButtonProps extends MUpdate {
  buttonText?: string;
}

/**
 * UpdateButton component.
 * Displays the last update time and a button to refresh data.
 */
export const UpdateButton: React.FC<UpdateButtonProps> = ({ url, buttonText, date }) => {
  const { config } = useApi();

  const { refetch, isFetching } = useQuery({
    queryKey: ['update', url],
    queryFn: async () => {
      if (!url) {
        return;
      }
      const baseUrl = config.basePath || '';
      const fullUrl = `${baseUrl}${url}`;

      const response = await fetch(fullUrl, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      return response.json();
    },
    enabled: false,
    retry: false,
  });

  const handleUpdate = async () => {
    const { isSuccess } = await refetch();
    if (isSuccess) {
      window.location.reload();
    }
  };

  const getStatusText = (): string | null => {
    if (isFetching) {
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
        <UiButton variant="outline" onClick={handleUpdate} disabled={isFetching}>
          <RefreshCw />
          {buttonText || 'Update'}
        </UiButton>
      )}
    </UiHorizontalGroup>
  );
};
