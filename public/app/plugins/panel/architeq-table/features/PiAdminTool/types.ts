import { PiFields } from './constants';

export type BudgetMetaType = {
  custom: {
    artName: string;
  };
};

export interface BudgetUpdatePayload {
  propertyName: string;
  value: number | string;
}

export interface BudgetCreatePayload {
  artName: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface BudgetCreateFormType {
  [PiFields.PiName]: string;
  [PiFields.StartDay]: string;
  [PiFields.endDate]: string;
}
