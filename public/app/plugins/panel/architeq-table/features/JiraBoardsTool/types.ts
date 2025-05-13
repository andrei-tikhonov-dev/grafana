export type JiraBoardsToolMetaType = {
  custom: {
    teamId: number;
    types: string[];
  };
};

export interface JiraBoardsUpdatePayload {
  propertyName: string;
  value: string;
}

export interface JiraBoardsCreateFormType {
  name: string;
  type: string;
  boardId: string;
}

export interface JiraBoardsCreatePayload {
  teamId: number;
  name: string;
  type: string;
  boardId: string;
}
