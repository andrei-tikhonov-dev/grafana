import {
  MSprintometerStatusData,
  TAiData,
  TBreadcrumbItem,
  TDate,
  TId,
  TPeriod,
  TPeriodVariant,
  TUrl,
  TUser,
} from '../../types';

export interface MPanelInfo {
  content: string;
  title?: string;
  description?: string;
}

export interface MUpdate {
  date: TDate;
  url?: TUrl;
}

export interface MOrganizationUnit {
  name: string;
  members?: TUser[];
}

export interface MProgress {
  name: string;
  percentage: number;
}

export interface MIntervalOption {
  name: string;
  id: TId;
  period?: TPeriod;
}

export interface MInterval {
  options: MIntervalOption[];
  variant: TPeriodVariant;
  selectable?: boolean;
}

export enum EEventType {
  Important = 'Important',
  Absence = 'Absence',
  Event = 'Event',
}

export enum EAdditionalEventType {
  Role = 'Role',
  Tomorrow = 'Tomorrow',
}

export type EEventGroupType = EEventType | EAdditionalEventType;

export interface MEvent {
  type: EEventType;
  period: TPeriod;
  description: string;
  members?: TUser[];
}

export interface MEventGroup {
  type: EEventGroupType;
  summary: string;
  events: MEvent[];
  members?: TUser[];
}

export enum EDayState {
  Current = 'Current',
  Default = 'Default',
  Inactive = 'Inactive',
}

export interface MDay {
  date: string;
  events: MEvent[];
  state: EDayState;
}

export const eventTypePriority: EEventType[] = [EEventType.Important, EEventType.Absence, EEventType.Event];

export interface MHeaderCustomData extends Record<string, any> {
  title: string;
  breadcrumbs?: TBreadcrumbItem[];
  ai?: TAiData;
  info?: MPanelInfo;
  status?: MSprintometerStatusData;
  update?: MUpdate;
  organizationUnit?: MOrganizationUnit;
  progress?: MProgress;
  interval?: MInterval;
  timeline?: MDay[][];
  eventsToday?: MEventGroup[];
  eventsUpcoming?: MEventGroup[];
}
