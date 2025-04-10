import { PiFields } from './constants';

export type PiAdminMetaType = {
  custom: {
    dsoId: number;
  };
};

export interface PiAdminUpdatePayload {
  propertyName: string;
  value: number | string;
}

export interface PiAdminCreatePayload {
  dsoId: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface PiAdminCreateFormType {
  [PiFields.PiName]: string;
  [PiFields.StartDate]: string;
  [PiFields.EndDate]: string;
}
