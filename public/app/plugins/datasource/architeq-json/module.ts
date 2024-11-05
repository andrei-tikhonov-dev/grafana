import { DataSourcePlugin } from '@grafana/data';

import { DataSource } from './DataSource';
import { ConfigEditor } from './component/ConfigEditor';
import { QueryEditorContainer } from './component/QueryEditorContainer';
import { GenericOptions, GrafanaQuery } from './types';

export const plugin = new DataSourcePlugin<DataSource, GrafanaQuery, GenericOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditorContainer);
