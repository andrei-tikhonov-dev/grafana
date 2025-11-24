export const enum TeamHolidaysToolFields {
  HolidayDescription = 'Description',
  HolidayDate = 'Date',
  TypeOfHoliday = 'Type',
  Global = 'Global',
  Id = 'Id',
}

export const enum TeamHolidayTypes {
  NationalHoliday = 'National holiday',
  TeamEvent = 'Team event',
}

export const hiddenFields = [TeamHolidaysToolFields.Id];
