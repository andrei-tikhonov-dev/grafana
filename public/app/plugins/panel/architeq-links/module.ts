import { PanelPlugin } from '@grafana/data';

import { LinksPanel } from './components/LinksPanel';
import { SimpleOptions } from './types';

export const plugin = new PanelPlugin<SimpleOptions>(LinksPanel).setPanelOptions((builder) => {
  return builder.addTextInput({
    path: 'header',
    name: 'H3 header',
    defaultValue: '',
  });
});
