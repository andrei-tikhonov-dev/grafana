import { PanelPlugin } from '@grafana/data';

import { Panel } from './components/Panel';
import { PanelOptions } from './types';

export const plugin = new PanelPlugin<PanelOptions>(Panel).setPanelOptions((builder) => {
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
    })
    .addTextInput({
      path: 'goalsUpdateUrl',
      name: 'Goals update url',
      settings: {
        placeholder: 'http://',
      },
    });
});
