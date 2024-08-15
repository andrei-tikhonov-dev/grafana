import { DataFrame } from '@grafana/data';

export interface UpdateDTO {
  sprintId: string;
  propertyName: string;
  value: number;
}
export const createUpdatePayload = (value: number, id: string, propertyName: string): UpdateDTO => {
  return {
    sprintId: id,
    propertyName,
    value,
  };
};

export const getRowIdentifiers = (fieldName: string, dataFrame: DataFrame) => {
  const idField = dataFrame.fields.filter((field) => field.name === fieldName);
  return idField[0]?.values || [];
};
