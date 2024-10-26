export interface SimpleOptions {}

export const enum Status {
  OK = 'OK',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}

export const enum ColoredIconPath {
  Impediment1 = 'Impediment 1.svg',
  Impediment2 = 'Impediment 2.svg',
  Impediment3 = 'Impediment 3.svg',
  LastSprint1 = 'Last Sprint 1.svg',
  LastSprint2 = 'Last Sprint 2.svg',
  NextSprint1 = 'Next Sprint 1.svg',
  NextSprint2 = 'Next Sprint 2.svg',
  NextSprint3 = 'Next Sprint 3.svg',
  Velocity1 = 'Velocity 1.svg',
  Velocity2 = 'Velocity 2.svg',
  Warning1 = 'Warning 1.svg',
  Warning2 = 'Warning 2.svg',
  Operations1 = 'Operations 1.svg',
  Operations2 = 'Operations 2.svg',
  Operations3 = 'Operations 3.svg',
  Team1 = 'Team 1.svg',
  Team2 = 'Team 2.svg',
  PL1 = 'PI_1.svg',
  PL2 = 'PI_2.svg',
  Actions1 = 'Actions 1.svg',
  Actions2 = 'Actions 2.svg',
  Actions3 = 'Actions 3.svg',
  Achievements1 = 'Archievements 1.svg',
  Achievements2 = 'Archievements 2.svg',
  Achievements3 = 'Archievements 3.svg',
  ART1 = 'ART 1.svg',
  ART2 = 'ART 2.svg',
  ART3 = 'ART 3.svg',
  ART4 = 'ART 4.svg',
  Budget1 = 'Budget 1.svg',
  Budget2 = 'Budget 2.svg',
  BusinessRelevance1 = 'Business Relevance 1.svg',
  BusinessRelevance2 = 'Business Relevance 2.svg',
  BusinessRelevance3 = 'Business Relevance 3.svg',
  CodeQuality1 = 'Code Quality 1.svg',
  CodeQuality2 = 'Code Quality 2.svg',
  Capacity1 = 'Capacity 1.svg',
  Capacity2 = 'Capacity 2.svg',
  Capacity3 = 'Capacity 3.svg',
  CurrentSprint1 = 'Current Sprint 1.svg',
  CurrentSprint2 = 'Current Sprint 2.svg',
  DCO1 = 'DCO 1.svg',
  DCO2 = 'DCO 2.svg',
  DevOpsScore1 = 'DevOps Score 1.svg',
  DevOpsScore2 = 'DevOps Score 2.svg',
  ScrumMember1 = 'Name of the individual scrum team member 1.svg',
  ScrumMember2 = 'Name of the individual scrum team member 2.svg',
  ScrumMember3 = 'Name of the individual scrum team member 3.svg',
  ScrumMember4 = 'Name of the individual scrum team member 4.svg',
}

export const enum CardSize {
  LG = 'LG',
  MD = 'MD',
  SM = 'SM',
}

export interface InfoListItemType {
  name?: string;
  value?: string;
  icon?: string;
  status?: `${Status}`;
  link?: string;
  button?: boolean;
  newTab?: boolean;
}

export interface LinkCardType {
  title?: string;
  icon?: ColoredIconPath;
  value?: string | number;
  unit?: string;
  url?: string;
  newTab?: boolean;
  info?: InfoListItemType[];
  isComingSoon?: boolean;
}

export interface LinkCardRowType {
  size?: CardSize;
  title?: string;
  tooltip?: string;
  cards?: LinkCardType[];
}

export interface LinkCardDataType {
  header?: string;
  tooltip?: string;
  description?: string;
  rows?: LinkCardRowType[];
}

export type TableType<T = {}> = {
  columns: any[];
  rows: any[];
  type: 'table';
  name: string;
  meta: {
    custom: T;
  };
};
