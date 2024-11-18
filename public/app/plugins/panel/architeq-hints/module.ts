import { PanelPlugin } from '@grafana/data';

import { HintsPanel } from './components/HintsPanel';
import { PanelOptions } from './types';

export const plugin = new PanelPlugin<PanelOptions>(HintsPanel).setPanelOptions((builder) => {
  return builder;
});
