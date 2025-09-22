import { css } from '@emotion/css';
import React, { useState } from 'react';

import { UiPeriodSelect } from '../../../components/ui';

const containerStyles = css`
  max-width: 350px;
`;

// Список спринтов от нового к старому
const sprintList = [
  { value: 'sprint-23', label: 'Sprint 23' },
  { value: 'sprint-22', label: 'Sprint 22' },
  { value: 'sprint-21', label: 'Sprint 21' },
  { value: 'sprint-20', label: 'Sprint 20' },
  { value: 'sprint-19', label: 'Sprint 19' },
  { value: 'sprint-18', label: 'Sprint 18' },
  { value: 'sprint-17', label: 'Sprint 17' },
  { value: 'sprint-16', label: 'Sprint 16' },
  { value: 'sprint-15', label: 'Sprint 15' },
  { value: 'sprint-14', label: 'Sprint 14' },
  { value: 'sprint-13', label: 'Sprint 13' },
].reverse();

// Список PI (Program Increments) от нового к старому
const piList = [
  { value: 'pi-2025-q4', label: 'PI 2025 Q4 - Digital Transformation and Customer Experience Enhancement Initiative' },
  { value: 'pi-2025-q3', label: 'PI 2025 Q3 - Advanced Analytics and Machine Learning Platform Development' },
  { value: 'pi-2025-q2', label: 'PI 2025 Q2 - Infrastructure Modernization and Security Compliance Program' },
  { value: 'pi-2025-q1', label: 'PI 2025 Q1 - Microservices Architecture Migration and API Gateway Implementation' },
  { value: 'pi-2024-q4', label: 'PI 2024 Q4 - Cloud Migration and DevOps Process Optimization Initiative' },
  { value: 'pi-2024-q3', label: 'PI 2024 Q3 - Multi-Platform Mobile Application Development and Integration' },
  { value: 'pi-2024-q2', label: 'PI 2024 Q2 - Real-Time Data Processing and Business Intelligence Enhancement' },
  { value: 'pi-2024-q1', label: 'PI 2024 Q1 - User Authentication System Overhaul and Identity Management' },
].reverse();

export function SprintPeriodSelectTest() {
  const [selectedSprintPeriod, setSelectedSprintPeriod] = useState<string[]>(['sprint-19', 'sprint-21']);
  const [selectedPIPeriod, setSelectedPIPeriod] = useState<string[]>(['pi-2025-q2', 'pi-2025-q3']);

  return (
    <div className={containerStyles}>
      <h3>Sprint Period Select</h3>
      <UiPeriodSelect
        options={sprintList}
        onValueChange={setSelectedSprintPeriod}
        defaultValue={selectedSprintPeriod}
        placeholder="Select sprints"
      />

      <h3 style={{ marginTop: '2rem' }}>Program Increment Period Select</h3>
      <UiPeriodSelect
        options={piList}
        onValueChange={setSelectedPIPeriod}
        defaultValue={selectedPIPeriod}
        placeholder="Select program increments"
      />
    </div>
  );
}
