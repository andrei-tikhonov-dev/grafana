export const enum BudgetFields {
  ID = 'ID',
  Year = 'Year',
  Label = 'Label',
  Type = 'Type',
  Code = 'Code',
  Budget = 'Budget',
  Description = 'Description',
}

export const enum BudgetTypes {
  CAPEX = 'CAPEX',
  OPEX = 'OPEX',
}

export const hiddenFields = [BudgetFields.ID];
