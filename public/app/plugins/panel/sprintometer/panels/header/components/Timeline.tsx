import { css, cx } from '@emotion/css';
import React from 'react';

import { UiCard, UiText, UiTitle } from '../../../components/ui';
import { theme2 } from '../../../theme/theme';
import { TDate } from '../../../types';
import { TimelineInterface } from '../types';

import { Day, DayVariant } from './Day';

interface Props extends TimelineInterface {}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme2.spacing.xl};
  `,
  content: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme2.spacing.xs};
  `,
  timeline: css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: ${theme2.spacing['2xl']};
  `,
  week: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${theme2.spacing.sm};
  `,
  eventsWrapper: css`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: ${theme2.spacing.sm};
  `,
  eventsContainer: css`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme2.spacing.xs};
  `,
  eventItem: css`
    background-color: ${theme2.colors.background.surface};
    padding: ${theme2.spacing.sm} ${theme2.spacing.lg};
    width: 100%;
    border-radius: ${theme2.radii.lg};
    border: 1px solid ${theme2.colors.border.default};
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${theme2.spacing.sm};
  `,
};

const normalizeDate = (date: TDate): string => {
  return new Date(date).toISOString().split('T')[0];
};

const getDayVariant = (dayDate: TDate, currentDate: TDate, isWorking: boolean): DayVariant => {
  const normalizedDayDate = normalizeDate(dayDate);
  const normalizedCurrentDate = normalizeDate(currentDate);

  if (normalizedDayDate === normalizedCurrentDate) {
    return 'current';
  }

  if (normalizedDayDate < normalizedCurrentDate || !isWorking) {
    return 'inactive';
  }

  return 'default';
};

export const Timeline: React.FC<Props> = ({ weeks, currentDate }) => {
  return (
    <UiCard className={cx(styles.container)}>
      <div className={styles.content}>
        <UiTitle>Sprint timeline</UiTitle>
        <div className={styles.timeline}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className={cx(styles.week)}>
              {week.days.map((day) => (
                <Day
                  date={day.date}
                  key={day.date}
                  events={day.events}
                  variant={getDayVariant(day.date, currentDate, day.isWorking)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <UiTitle>Events</UiTitle>
        <div className={styles.eventsWrapper}>
          <div className={styles.eventsContainer}>
            <UiText>Today</UiText>
            <div className={styles.eventItem}>
              <UiText>4 people will be away this sprint</UiText>
            </div>
          </div>
          <div className={styles.eventsContainer}>
            <UiText>Upcoming</UiText>
            <div className={styles.eventItem}>
              <UiText>4 people will be away this sprint</UiText>
            </div>
            <div className={styles.eventItem}>
              <UiText>4 events</UiText>
            </div>
          </div>
        </div>
      </div>
    </UiCard>
  );
};
