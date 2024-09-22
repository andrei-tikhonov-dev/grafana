export interface HistoricalDataUpdatePayload {
  sprintId: string;
  propertyName: string;
  value?: number;
  isRelevantForVelocity?: boolean;
}
