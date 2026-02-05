import React from 'react';

import { PanelProps } from '@grafana/data';
import { QueryClientProvider } from '@tanstack/react-query';

import { ApiProvider } from './api';
import { queryClient } from './api/query-client';
import { UiZeroState } from './components/ui/zero-state/UiZeroState';
import { PANELS_REGISTRY } from './registry';
import './theme/default.css';
import { TPanelOptions, EPanelType, BaseCustomData } from './types';
import { getGrafanaCustomData } from './utils/grafana';

type Props = PanelProps<TPanelOptions>;

export const Panel: React.FC<Props> = (props) => {
  const type = props.options.panelType ?? EPanelType.EmptyPanel;
  const Descriptor = PANELS_REGISTRY[type] ?? PANELS_REGISTRY[EPanelType.EmptyPanel];
  const Cmp = Descriptor.component;

  const { zeroState } = getGrafanaCustomData<BaseCustomData>(props.data, {});

  const dataSourceRef = props.data.request?.targets?.[0]?.datasource ?? undefined;

  if (zeroState) {
    return <UiZeroState {...zeroState} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider dataSourceRef={dataSourceRef}>
        <Cmp {...props} />
      </ApiProvider>
    </QueryClientProvider>
  );
};
