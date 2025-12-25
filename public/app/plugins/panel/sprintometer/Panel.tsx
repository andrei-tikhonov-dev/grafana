import React, { useEffect, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { getDataSourceSrv, getBackendSrv } from '@grafana/runtime';
import { TPanelOptions, EPanelType, BaseCustomData } from './types';
import './theme/default.css';
import { PANELS_REGISTRY } from './registry';
import { UiZeroState } from './components/ui/zero-state/UiZeroState';
import { getGrafanaCustomData } from './utils/grafana';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/query-client';
import { ApiProvider } from './api';

type Props = PanelProps<TPanelOptions>;

export const Panel: React.FC<Props> = (props) => {
  const type = props.options.panelType ?? EPanelType.EmptyPanel;
  const Descriptor = PANELS_REGISTRY[type] ?? PANELS_REGISTRY[EPanelType.EmptyPanel];
  const Cmp = Descriptor.component;

  const { zeroState } = getGrafanaCustomData<BaseCustomData>(props.data, {});
  const [basePath, setBasePath] = useState<string | undefined>();

  useEffect(() => {
    const dataSourceRef = props.data.request?.targets?.[0]?.datasource;
    if (dataSourceRef) {
      getDataSourceSrv()
        .get(dataSourceRef)
        .then((ds: any) => {
          if (ds.uid) {
            getBackendSrv()
              .get(`/api/datasources/uid/${ds.uid}`)
              .then((rawDs: any) => {
                if (rawDs.url) {
                  try {
                    const url = new URL(rawDs.url);
                    setBasePath(url.origin);
                  } catch (e) {
                    setBasePath(rawDs.url);
                  }
                } else {
                  console.error('Data source URL is not set');
                }
              });
          }
        });
    }
  }, [props.data.request]);

  if (zeroState) {
    return <UiZeroState {...zeroState} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider basePath={basePath}>
        <Cmp {...props} />
      </ApiProvider>
    </QueryClientProvider>
  );
};
