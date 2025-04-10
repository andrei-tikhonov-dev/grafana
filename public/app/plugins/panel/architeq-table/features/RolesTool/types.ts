import { RoleFields } from './constants';

export type RoleMetaType = {
  custom: {
    teamId: string;
    deletionPreventionMessage: string;
  };
};

export interface RoleUpdatePayload {
  id: string | number;
  teamId: string;
  propertyName: string;
  value: number | string;
}

export interface RoleDeletePayload {}

export interface RoleCreatePayload {
  teamId: string;
  roleName: string;
}

export interface RoleCreateFormType {
  [RoleFields.RoleName]: string;
}
