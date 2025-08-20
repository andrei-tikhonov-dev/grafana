import { TDate, TPeriod } from '../types';

export const formatFullPeriod = (period?: TPeriod): string => {
  if (!period || !period.startDate || !period.endDate) {
    return '';
  }

  return `${formatFullDate(period.startDate)} – ${formatFullDate(period.endDate)}`;
};

export const formatFullDate = (date?: string): string => {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en-US', { month: 'short' });
  const year = dateObj.getFullYear();

  return `${day} ${month}, ${year}`;
};

export const formatDate = (date?: string): string => {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en-US', { month: 'short' });

  return `${day} ${month}`;
};

export const formatDayOfWeek = (date: TDate): string => {
  return new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
};

export const formatDay = (date?: string): string => {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);

  return `${dateObj.getDate()}`;
};

export const formatRelativeDate = (dateString: string): string => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  const now = new Date();

  const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = today.getTime() - dateDay.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
};
