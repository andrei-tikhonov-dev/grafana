import { PiNamesFields } from './constants';

export type PiNameMetaType = {
  custom: {
    artId: number;
    piData: Record<string, string>;
  };
};

export interface PiNameUpdatePayload {
  programIncrementId: number;
  artId: number;
  propertyName: string;
  value: string;
}

export interface PiNameCreatePayload {
  programIncrementId: number;
  artId: number;
  name: string;
}

export interface PiNameDeletePayload {
  programIncrementId: number;
  artId: number;
}

export interface PiNameCreateFormType {
  [PiNamesFields.Name]: string;
  [PiNamesFields.ID]: number;
}
