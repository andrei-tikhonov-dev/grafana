export const enum HistoricDataColumns {
  SprintId = 'Sprint id',
  SprintName = 'Sprint name',
  StoryPoints = 'Story points achieved',
  Capacity = 'Capacity in PD',
  Happiness = 'Happiness',
  RelevantForVelocity = 'Relevant for velocity',
}
export const EditableFields = [
  HistoricDataColumns.Capacity,
  HistoricDataColumns.Happiness,
  HistoricDataColumns.StoryPoints,
];
