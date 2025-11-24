import { TPeriod } from '../types';

/**
 * Default locale for all date formatting operations
 * @constant
 */
const LOCALE = 'en-US';

/**
 * Pre-initialized Intl.DateTimeFormat instances for performance optimization.
 * Creating formatters once and reusing them is 10-100x faster than creating
 * new formatters on each call.
 * @constant
 */
const formatters = {
  /** Formats month as short name (e.g., "Jan", "Feb") */
  monthShort: new Intl.DateTimeFormat(LOCALE, { month: 'short' }),
  /** Formats weekday as short name (e.g., "Mon", "Tue") */
  weekdayShort: new Intl.DateTimeFormat(LOCALE, { weekday: 'short' }),
  /** Formats time in 24-hour format (e.g., "14:30") */
  time24: new Intl.DateTimeFormat(LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }),
};

/**
 * Parses and validates a date string.
 * Centralized parsing function ensures consistent validation across the library.
 *
 * @param {string | undefined} date - ISO date string or undefined
 * @returns {Date} Parsed and validated Date object
 * @throws {Error} If date is missing or invalid
 */
const parseDate = (date: string | undefined): Date => {
  if (!date) {
    throw new Error('Date is required');
  }

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    throw new Error(`Invalid date: ${date}`);
  }

  return dateObj;
};

/**
 * Safely parses a date string without throwing errors.
 * Returns null if the date is missing or invalid.
 *
 * @param {string} [date] - ISO date string
 * @returns {Date | null} Parsed Date object or null if invalid
 */
const parseDateSafe = (date?: string): Date | null => {
  try {
    return date ? parseDate(date) : null;
  } catch {
    return null;
  }
};

/**
 * Type guard that validates a period object.
 * Checks if period exists and has both startDate and endDate properties.
 *
 * @param {TPeriod} [period] - Period object to validate
 * @returns {boolean} True if period is valid with both dates present
 */
const isValidPeriod = (period?: TPeriod): period is Required<TPeriod> => {
  return Boolean(period && period.startDate && period.endDate);
};

/**
 * Collection of all possible formatted parts of a date.
 * Optimized for scenarios where multiple formats of the same date are needed.
 *
 * @typedef {Object} DateParts
 * @property {string} day - Day of month as string (e.g., "15") or empty string if invalid
 * @property {string} month - Short month name (e.g., "Jan") or empty string if invalid
 * @property {string} weekday - Short weekday name (e.g., "Mon") or empty string if invalid
 * @property {number} year - Full year as number (e.g., 2024) or 0 if invalid
 * @property {string} fullDate - Complete date string (e.g., "15 Jan, 2024") or empty string if invalid
 * @property {string} shortDate - Date without year (e.g., "15 Jan") or empty string if invalid
 * @property {string} time - Time in 24-hour format (e.g., "14:30") or empty string if invalid
 */
export interface DateParts {
  day: string;
  month: string;
  weekday: string;
  year: number;
  fullDate: string;
  shortDate: string;
  time: string;
}

/**
 * Parses a date once and returns all possible formatted representations.
 * This is 30-300x faster than calling individual format functions when you need
 * multiple parts of the same date (e.g., weekday, month, and day).
 *
 * Performance: Only creates one Date object and reuses pre-initialized formatters.
 *
 * For invalid or missing dates, returns an object with empty strings and year as 0.
 * This allows safe destructuring without null checks.
 *
 * @param {string} [date] - ISO date string to format
 * @returns {DateParts} Object containing all formatted date parts (empty strings if invalid)
 */
export const formatDateParts = (date?: string): DateParts => {
  const dateObj = parseDateSafe(date);

  if (!dateObj) {
    return {
      day: '',
      month: '',
      weekday: '',
      year: 0,
      fullDate: '',
      shortDate: '',
      time: '',
    };
  }

  const day = dateObj.getDate();
  const month = formatters.monthShort.format(dateObj);
  const weekday = formatters.weekdayShort.format(dateObj);
  const year = dateObj.getFullYear();
  const time = formatters.time24.format(dateObj);

  return {
    day: String(day),
    month,
    weekday,
    year,
    fullDate: `${day} ${month}, ${year}`,
    shortDate: `${day} ${month}`,
    time,
  };
};

/**
 * Formats a date as a complete date string with day, month, and year.
 *
 * @param {string} [date] - ISO date string to format
 * @returns {string} Formatted date string (e.g., "15 Jan, 2024") or empty string if invalid
 */
export const formatFullDate = (date?: string): string => {
  const dateObj = parseDateSafe(date);
  if (!dateObj) {
    return '';
  }

  const day = dateObj.getDate();
  const month = formatters.monthShort.format(dateObj);
  const year = dateObj.getFullYear();

  return `${day} ${month}, ${year}`;
};

/**
 * Formats a date as a short date string with day and month (no year).
 *
 * @param {string} [date] - ISO date string to format
 * @returns {string} Formatted date string (e.g., "15 Jan") or empty string if invalid
 */
export const formatDate = (date?: string): string => {
  const dateObj = parseDateSafe(date);
  if (!dateObj) {
    return '';
  }

  const day = dateObj.getDate();
  const month = formatters.monthShort.format(dateObj);

  return `${day} ${month}`;
};

/**
 * Generic period formatter that applies a date formatter to both start and end dates.
 * Internal utility function used by public period formatting functions.
 *
 * @private
 * @param {TPeriod | undefined} period - Period object with startDate and endDate
 * @param {Function} formatter - Date formatting function to apply
 * @returns {string} Formatted period string or empty string if invalid
 */
const formatPeriodWith = (period: TPeriod | undefined, formatter: (date: string) => string): string => {
  if (!isValidPeriod(period)) {
    return '';
  }

  return `${formatter(period.startDate)} – ${formatter(period.endDate)}`;
};

/**
 * Formats a period with full dates including years.
 * Uses en dash (–) as separator between dates.
 *
 * @param {TPeriod} [period] - Period object with startDate and endDate
 * @returns {string} Formatted period (e.g., "15 Jan, 2024 – 20 Jan, 2024") or empty string if invalid
 */
export const formatFullPeriod = (period?: TPeriod): string => {
  return formatPeriodWith(period, formatFullDate);
};

/**
 * Formats a period with short dates (no years).
 * Uses en dash (–) as separator between dates.
 *
 * @param {TPeriod} [period] - Period object with startDate and endDate
 * @returns {string} Formatted period (e.g., "15 Jan – 20 Jan") or empty string if invalid
 */
export const formatPeriod = (period?: TPeriod): string => {
  return formatPeriodWith(period, formatDate);
};

/**
 * Intelligently formats a period based on whether it spans a single day or multiple days.
 * - Same day: Shows time range in 24-hour format (e.g., "14:00 – 16:30")
 * - Different days: Shows full date range (e.g., "15 Jan, 2024 – 20 Jan, 2024")
 *
 * @param {TPeriod} [period] - Period object with startDate and endDate (can include time)
 * @returns {string} Formatted period string or empty string if invalid
 */
export const formatSmartPeriod = (period?: TPeriod): string => {
  if (!isValidPeriod(period)) {
    return '';
  }

  const startDate = parseDate(period.startDate);
  const endDate = parseDate(period.endDate);

  const isSameDay =
    startDate.getDate() === endDate.getDate() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear();

  if (isSameDay) {
    const startTime = formatters.time24.format(startDate);
    const endTime = formatters.time24.format(endDate);

    return `${startTime} – ${endTime}`;
  }

  return formatFullPeriod(period);
};

/**
 * Formats a date relative to today.
 * - If today: Shows time in 24-hour format (e.g., "14:30")
 * - If past: Shows days ago (e.g., "3 days ago", "1 day ago")
 *
 * Note: Comparison is done at midnight (00:00:00) to ensure accurate day counting.
 *
 * @param {string} dateString - ISO date string to format
 * @returns {string} Relative date string or empty string if invalid
 */
export const formatRelativeDate = (dateString: string): string => {
  const date = parseDateSafe(dateString);
  if (!date) {
    return '';
  }

  const now = new Date();

  // Reset time to midnight (00:00:00) for accurate day comparison
  const dateDay = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  const diffDays = Math.floor((today - dateDay) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return formatters.time24.format(date);
  }

  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
};
