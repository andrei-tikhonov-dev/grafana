import { useState } from 'react';

import { LoadingMode } from '../constants';

export function useLoading() {
  const [loading, setLoading] = useState<LoadingMode>(LoadingMode.NONE);

  return {
    loading,
    setLoadingNone: () => setLoading(LoadingMode.NONE),
    setLoadingUpdate: () => setLoading(LoadingMode.UPDATE),
  };
}
