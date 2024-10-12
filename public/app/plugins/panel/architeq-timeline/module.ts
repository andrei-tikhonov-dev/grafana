import { PanelPlugin } from '@grafana/data';

import { TimelinePanel } from './components/TimelinePanel';
import { PanelOptions } from './types';

export const plugin = new PanelPlugin<PanelOptions>(TimelinePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'header',
      name: 'Panel header (H1)',
      settings: {},
    })
    .addTextInput({
      path: 'goalsTitle',
      name: 'Goals title',
      settings: {},
    });
});
