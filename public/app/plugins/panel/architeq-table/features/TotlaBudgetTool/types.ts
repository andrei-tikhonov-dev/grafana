import { BudgetFields } from './constants';

export type BudgetMetaType = {
  custom: {
    teamId: string;
    types: string[];
  };
};

export interface BudgetUpdatePayload {
  id: string | number;
  teamId: string;
  propertyName: string;
  value: number | string;
}

export interface BudgetDeletePayload {
  id: string;
}

export interface BudgetCreatePayload {
  teamId: string;
  year: number;
  label: string;
  type: string;
  code: string;
  budget: number;
  description: string | null;
}

export interface BudgetCreateFormType {
  [BudgetFields.Year]: string;
  [BudgetFields.Label]: string;
  [BudgetFields.Type]: string;
  [BudgetFields.Code]: string;
  [BudgetFields.Budget]: string;
  [BudgetFields.Description]?: string;
}

export type BudgetFilterType = {
  years: string[];
};
