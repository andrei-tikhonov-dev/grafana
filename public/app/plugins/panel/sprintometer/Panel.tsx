import React from 'react';
import { PanelProps } from '@grafana/data';
import { TPanelOptions, EPanelType, BaseCustomData } from './types';
import './theme/default.css';
import { PANELS_REGISTRY } from './registry';
import { UiZeroState } from './components/ui/zero-state/UiZeroState';
import { getGrafanaCustomData } from './utils/grafana';

type Props = PanelProps<TPanelOptions>;

export const Panel: React.FC<Props> = (props) => {
  const type = props.options.panelType ?? EPanelType.EmptyPanel;
  const Descriptor = PANELS_REGISTRY[type] ?? PANELS_REGISTRY[EPanelType.EmptyPanel];
  const Cmp = Descriptor.component;

  const { zeroState } = getGrafanaCustomData<BaseCustomData>(props.data, {});

  if (zeroState) {
    return <UiZeroState {...zeroState} />;
  }

  return <Cmp {...props} />;
};
