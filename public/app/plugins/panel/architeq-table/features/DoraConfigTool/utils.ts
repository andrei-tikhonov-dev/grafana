import { DataFrame } from '@grafana/data';

import { Cells } from '../../constants';
import { configureDataFrame, getFieldConfig, getPayloadIDs as getPayloadIDsBase } from '../../utils';

import { DoraConfigToolFields } from './constants';
import { DoraThresholds } from './types';

interface ConfigDoraConfigToolData {
  dataFrame: DataFrame;
  handleDelete: (rowIndex: number) => void;
  hiddenFields?: string[];
  defaultThresholds: DoraThresholds;
  availableBugTypes: string[];
  availableBugPriorities: string[];
  availableBugComponentNames: string[];
}

export function configDoraConfigToolData({
  dataFrame,
  hiddenFields,
  handleDelete,
  defaultThresholds,
  availableBugTypes,
  availableBugPriorities,
  availableBugComponentNames,
}: ConfigDoraConfigToolData): DataFrame {
  const options = { align: 'left' as const };

  const wrappedDataFrame: DataFrame = {
    ...dataFrame,
    fields: dataFrame.fields.map((field) => {
      if (field.name === DoraConfigToolFields.DoraThresholds) {
        return {
          ...field,
          values: field.values.map((thresholdObj: DoraThresholds | Record<string, never>) => ({
            thresholds: thresholdObj,
            defaultThresholds,
          })),
        };
      }
      return field;
    }),
  };

  const fieldConfigs = [
    { fields: [DoraConfigToolFields.TechnicalServiceName], config: getFieldConfig(Cells.Input, { ...options }) },
    { fields: [DoraConfigToolFields.BitbucketProjectKey], config: getFieldConfig(Cells.Input, { ...options }) },
    { fields: [DoraConfigToolFields.BitbucketRepositorySlug], config: getFieldConfig(Cells.Input, { ...options }) },
    { fields: [DoraConfigToolFields.SplunkProjectTags], config: getFieldConfig(Cells.Input, { ...options }) },
    {
      fields: [DoraConfigToolFields.DoraThresholds],
      config: getFieldConfig(Cells.DoraThresholds, { ...options, width: 180 }),
    },
    {
      fields: [DoraConfigToolFields.BugTypes],
      config: getFieldConfig(Cells.MultiSelect, { ...options, options: availableBugTypes.map((t) => ({ label: t, value: t })) }),
    },
    {
      fields: [DoraConfigToolFields.BugPriorities],
      config: getFieldConfig(Cells.MultiSelect, { ...options, options: availableBugPriorities.map((p) => ({ label: p, value: p })) }),
    },
    {
      fields: [DoraConfigToolFields.BugComponentNames],
      config: getFieldConfig(Cells.MultiSelect, { ...options, options: availableBugComponentNames.map((c) => ({ label: c, value: c })) }),
    },
  ];

  return configureDataFrame(wrappedDataFrame, hiddenFields, handleDelete, fieldConfigs);
}

export function getPayloadIDs(data: DataFrame) {
  return getPayloadIDsBase(data, DoraConfigToolFields.ID);
}
