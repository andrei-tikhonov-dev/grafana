import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import { UiAiViewer } from '../../components/ui';
import { TAiData } from '../../types';

interface Props {
  initialData?: TAiData;
  label: string;
  fetchData?: () => Promise<TAiData | null>;
}

export const AiViewerWrapper: React.FC<Props> = ({ initialData, label, fetchData }) => {
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['getAiData', label],
    queryFn: fetchData,
    enabled: shouldFetch && !initialData && Boolean(fetchData),
  });

  const handleOpen = () => {
    if (!initialData) {
      setShouldFetch(true);
    }
  };

  const displayData = initialData || data;

  return (
    <UiAiViewer
      title={displayData?.title}
      content={displayData?.content}
      label={label}
      onOpen={handleOpen}
      isLoading={isLoading}
    />
  );
};
