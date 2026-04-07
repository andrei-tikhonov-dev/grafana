import { DataFrame } from '@grafana/data';

import { Cells } from '../../constants';
import { configureDataFrame, getFieldConfig } from '../../utils';

import { SprintDatesConfigToolFields } from './constants';

interface ConfigSprintDatesConfigToolData {
  dataFrame: DataFrame;
}

export function configSprintDatesConfigToolData({ dataFrame }: ConfigSprintDatesConfigToolData): DataFrame {
  const fieldConfigs = [
    {
      fields: [SprintDatesConfigToolFields.IncludeStartDate, SprintDatesConfigToolFields.IncludeEndDate],
      config: getFieldConfig(Cells.Checkbox, { width: 150 }),
    },
  ];

  return configureDataFrame(dataFrame, undefined, null, fieldConfigs);
}
