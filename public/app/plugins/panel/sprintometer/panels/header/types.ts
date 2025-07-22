import { DateType, PanelStatusType, UserInterface, ZeroStateInterface } from '../../types';

export interface HeaderCustomDataInterface extends Record<string, any> {
  timeline?: TimelineInterface;
  requestInfo?: { externalBoardId?: number; externalSprintId?: number };
  zeroState?: ZeroStateInterface;
}

export enum EventTypeEnum {
  Event = 'Event',
  Deadline = 'Deadline',
  TimeOff = 'TimeOff',
}

export interface EventInterface extends Record<string, any> {
  type: `${EventTypeEnum}`;
  users?: UserInterface[];
  text: string;
}

export interface TimelineInterface {
  currentDate: DateType;
  weeks: Array<{
    days: Array<{
      date: DateType;
      isWorking: boolean;
      events: EventInterface[];
    }>;
  }>;
}

export interface HeaderDeprecatedCustomData {
  name?: string;
  title?: string;
  team?: string;
  from?: string;
  till?: string;
  lastUpdated?: string;
  externalBoardId?: number;
  externalSprintId?: number;
  weeks?: Array<{
    days: Array<{
      dayOfWeek: number;
      status: 'FINISHED' | 'IN_PROGRESS' | 'NOT_STARTED' | 'HOLIDAY' | 'BLOCKED' | 'OFF_DAY';
      date?: string;
      events?: DeprecatedInfoLineType[];
    }>;
  }>;
  breadCrumbs?: Array<{
    label: string;
    link?: string;
  }>;
  progress?: {
    label: string;
    percentComplete: number;
  };
  goals?: Array<{
    id: string | number;
    text: string;
    isCompleted?: boolean;
  }>;
  info?: DeprecatedInfoLineType[];
  infoTimeline?: DeprecatedInfoLineType[];
  select?: {
    label: string;
    options: DeprecatedOptionType[];
  };
  range?: {
    firstId?: string;
    lastId?: string;
    options?: DeprecatedOptionType[];
  };
  statuses?: Array<{
    status: PanelStatusType;
    title: string;
    description?: string;
    link?: string;
    toggleTip?: Array<{
      text: string;
      link?: string;
    }>;
  }>;
}

export interface DeprecatedInfoLineType {
  name?: string;
  value?: string;
  icon?: string;
  status?: string;
  link?: string;
  button?: boolean;
  newTab?: boolean;
}

export type DeprecatedOptionType = {
  name: string;
  id: string;
};
