export const enum TeamHolidaysToolFields {
  HolidayDescription = 'Description',
  HolidayDate = 'Date',
  TypeOfHoliday = 'Type',
  Id = 'Id',
}

export const enum TeamHolidayTypes {
  NationalHoliday = 'National holiday',
  TeamEvent = 'Team event',
}

export const hiddenFields = [TeamHolidaysToolFields.Id];
