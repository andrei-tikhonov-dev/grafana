import { css } from '@emotion/css';
import React, { useState } from 'react';

import { UiPeriodSelect } from '../../../components/ui';
import { PeriodSelectOption } from '../../../components/ui/period-select/UiPeriodSelect';

const containerStyles = css`
  padding: 2rem;
`;

const sprintList: PeriodSelectOption[] = [
  {
    value: 'sprint-13',
    label: 'Sprint 13',
    period: {
      startDate: '2025-01-27T00:00:00Z',
      endDate: '2025-02-09T00:00:00Z',
    },
  },
  {
    value: 'sprint-14',
    label: 'Sprint 14',
    period: {
      startDate: '2025-02-10T00:00:00Z',
      endDate: '2025-02-23T00:00:00Z',
    },
  },
  {
    value: 'sprint-15',
    label: 'Sprint 15',
    period: {
      startDate: '2025-02-24T00:00:00Z',
      endDate: '2025-03-09T00:00:00Z',
    },
  },
  {
    value: 'sprint-16',
    label: 'Sprint 16',
    period: {
      startDate: '2025-03-10T00:00:00Z',
      endDate: '2025-03-23T00:00:00Z',
    },
  },
  {
    value: 'sprint-17',
    label: 'Sprint 17',
    period: {
      startDate: '2025-03-24T00:00:00Z',
      endDate: '2025-04-06T00:00:00Z',
    },
  },
  {
    value: 'sprint-18',
    label: 'Sprint 18',
    period: {
      startDate: '2025-04-07T00:00:00Z',
      endDate: '2025-04-20T00:00:00Z',
    },
  },
  {
    value: 'sprint-19',
    label: 'Sprint 19',
    period: {
      startDate: '2025-04-21T00:00:00Z',
      endDate: '2025-05-04T00:00:00Z',
    },
  },
  {
    value: 'sprint-20',
    label: 'Sprint 20',
    period: {
      startDate: '2025-05-05T00:00:00Z',
      endDate: '2025-05-18T00:00:00Z',
    },
  },
  {
    value: 'sprint-21',
    label: 'Sprint 21',
    period: {
      startDate: '2025-05-19T00:00:00Z',
      endDate: '2025-06-01T00:00:00Z',
    },
  },
  {
    value: 'sprint-22',
    label: 'Sprint 22',
    period: {
      startDate: '2025-06-02T00:00:00Z',
      endDate: '2025-06-15T00:00:00Z',
    },
  },
  {
    value: 'sprint-23',
    label: 'Sprint 23',
    period: {
      startDate: '2025-06-16T00:00:00Z',
      endDate: '2025-06-29T00:00:00Z',
      isCurrent: true,
      currentDate: '2025-06-20T00:00:00Z',
    },
  },
];

const piList: PeriodSelectOption[] = [
  {
    value: 'pi-2024-q1',
    label: 'PI 2024 Q1 - User Authentication System Overhaul and Identity Management',
    period: {
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-03-31T00:00:00Z',
    },
  },
  {
    value: 'pi-2024-q2',
    label: 'PI 2024 Q2 - Real-Time Data Processing and Business Intelligence Enhancement',
    period: {
      startDate: '2024-04-01T00:00:00Z',
      endDate: '2024-06-30T00:00:00Z',
    },
  },
  {
    value: 'pi-2024-q3',
    label: 'PI 2024 Q3 - Multi-Platform Mobile Application Development and Integration',
    period: {
      startDate: '2024-07-01T00:00:00Z',
      endDate: '2024-09-30T00:00:00Z',
    },
  },
  {
    value: 'pi-2024-q4',
    label: 'PI 2024 Q4 - Cloud Migration and DevOps Process Optimization Initiative',
    period: {
      startDate: '2024-10-01T00:00:00Z',
      endDate: '2024-12-31T00:00:00Z',
    },
  },
  {
    value: 'pi-2025-q1',
    label: 'PI 2025 Q1 - Microservices Architecture Migration and API Gateway Implementation',
    period: {
      startDate: '2025-01-01T00:00:00Z',
      endDate: '2025-03-31T00:00:00Z',
    },
  },
  {
    value: 'pi-2025-q2',
    label: 'PI 2025 Q2 - Infrastructure Modernization and Security Compliance Program',
    period: {
      startDate: '2025-04-01T00:00:00Z',
      endDate: '2025-06-30T00:00:00Z',
    },
  },
  {
    value: 'pi-2025-q3',
    label: 'PI 2025 Q3 - Advanced Analytics and Machine Learning Platform Development',
    period: {
      startDate: '2025-07-01T00:00:00Z',
      endDate: '2025-09-30T00:00:00Z',
    },
  },
  {
    value: 'pi-2025-q4',
    label: 'PI 2025 Q4 - Digital Transformation and Customer Experience Enhancement Initiative',
    period: {
      startDate: '2025-10-01T00:00:00Z',
      endDate: '2025-12-31T00:00:00Z',
    },
  },
];

const sprintListWithoutPeriods: PeriodSelectOption[] = [
  { value: 'sprint-13', label: 'Sprint 13' },
  { value: 'sprint-14', label: 'Sprint 14' },
  { value: 'sprint-15', label: 'Sprint 15' },
  { value: 'sprint-16', label: 'Sprint 16' },
  { value: 'sprint-17', label: 'Sprint 17' },
  { value: 'sprint-18', label: 'Sprint 18' },
  { value: 'sprint-19', label: 'Sprint 19' },
  { value: 'sprint-20', label: 'Sprint 20' },
  { value: 'sprint-21', label: 'Sprint 21' },
  { value: 'sprint-22', label: 'Sprint 22' },
  { value: 'sprint-23', label: 'Sprint 23' },
];

export function UiPeriodSelectTestPage() {
  const [rangeValue, setRangeValue] = useState<string[]>(['sprint-19', 'sprint-21']);
  const [singleValue, setSingleValue] = useState<string>('sprint-20');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [variant, setVariant] = useState<'range' | 'single'>('range');
  const [dynamicRangeValue, setDynamicRangeValue] = useState<string[]>(['sprint-19', 'sprint-21']);
  const [dynamicSingleValue, setDynamicSingleValue] = useState<string>('sprint-20');
  const [piValue, setPiValue] = useState<string[]>(['pi-2025-q2', 'pi-2025-q3']);
  const [backwardCompatValue, setBackwardCompatValue] = useState<string[]>(['sprint-19', 'sprint-21']);

  const renderDynamicSelect = () => {
    if (variant === 'single') {
      return (
        <UiPeriodSelect
          variant="single"
          disabled={isDisabled}
          options={sprintList}
          defaultValue={dynamicSingleValue}
          onValueChange={(value) => setDynamicSingleValue(value as string)}
          placeholder="Select period"
        />
      );
    }

    return (
      <UiPeriodSelect
        variant="range"
        disabled={isDisabled}
        options={sprintList}
        defaultValue={dynamicRangeValue}
        onValueChange={(value) => setDynamicRangeValue(value as string[])}
        placeholder="Select interval"
        presets={[2, 3]}
      />
    );
  };

  return (
    <div>
      <div className={containerStyles}>
        <h3>Range Mode</h3>
        <UiPeriodSelect
          variant="range"
          options={sprintList}
          defaultValue={rangeValue}
          onValueChange={(value) => setRangeValue(value as string[])}
          placeholder="Select period interval"
          presets={[2, 3, 5]}
        />
      </div>

      <div className={containerStyles}>
        <h3>Single Mode</h3>
        <UiPeriodSelect
          variant="single"
          options={sprintList}
          defaultValue={singleValue}
          onValueChange={(value) => setSingleValue(value as string)}
          placeholder="Select period"
        />
      </div>

      <div className={containerStyles}>
        <h3>Disabled - Range</h3>
        <UiPeriodSelect
          disabled
          variant="range"
          options={sprintList}
          defaultValue={['sprint-19', 'sprint-21']}
          placeholder="Period not selected"
        />
      </div>

      <div className={containerStyles}>
        <h3>Disabled - Single</h3>
        <UiPeriodSelect
          disabled
          variant="single"
          options={sprintList}
          defaultValue={singleValue}
          placeholder="Period not selected"
        />
      </div>

      <div className={containerStyles}>
        <h3>Dynamic Disabled Toggle</h3>
        <div>
          <label>
            <input type="checkbox" checked={isDisabled} onChange={(e) => setIsDisabled(e.target.checked)} />
            Disabled
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              value="range"
              checked={variant === 'range'}
              onChange={(e) => setVariant(e.target.value as 'range')}
            />
            Range
          </label>
          <label>
            <input
              type="radio"
              value="single"
              checked={variant === 'single'}
              onChange={(e) => setVariant(e.target.value as 'single')}
            />
            Single
          </label>
        </div>
        {renderDynamicSelect()}
      </div>

      <div className={containerStyles}>
        <h3>Program Increments</h3>
        <UiPeriodSelect
          options={piList}
          onValueChange={(value) => setPiValue(value as string[])}
          defaultValue={piValue}
          placeholder="Select program increments"
          presets={[2, 3, 4]}
        />
      </div>

      <div className={containerStyles}>
        <h3>Without Period Objects</h3>
        <UiPeriodSelect
          options={sprintListWithoutPeriods}
          onValueChange={(value) => setBackwardCompatValue(value as string[])}
          defaultValue={backwardCompatValue}
          placeholder="Select sprints"
        />
      </div>

      <div className={containerStyles}>
        <h3>Empty Options</h3>
        <UiPeriodSelect options={[]} placeholder="No periods available" />
      </div>
    </div>
  );
}
