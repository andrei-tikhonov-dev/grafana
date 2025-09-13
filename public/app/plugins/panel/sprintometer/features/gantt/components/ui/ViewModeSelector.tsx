import React from 'react';

import { EViewMode } from '../../types';

interface ViewModeSelectorProps {
  activeMode: EViewMode;
  onChange: (mode: EViewMode) => void;
  darkMode: boolean;
  availableModes?: EViewMode[];
}

/**
 * ViewModeSelector Component - Allows switching between different timeline views
 */
const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({ activeMode, onChange, darkMode, availableModes }) => {
  // All possible view modes
  const allViewModes = [
    { id: EViewMode.MINUTE, label: 'Minute' },
    { id: EViewMode.HOUR, label: 'Hour' },
    { id: EViewMode.DAY, label: 'Day' },
    { id: EViewMode.WEEK, label: 'Week' },
    { id: EViewMode.MONTH, label: 'Month' },
    { id: EViewMode.QUARTER, label: 'Quarter' },
    { id: EViewMode.YEAR, label: 'Year' },
  ];

  // Default standard view modes (excluding MINUTE and HOUR)
  const standardViewModes = [EViewMode.DAY, EViewMode.WEEK, EViewMode.MONTH, EViewMode.QUARTER, EViewMode.YEAR];

  // Filter view modes based on availableModes prop if provided
  // Otherwise use the standard view modes
  const viewModes = availableModes
    ? allViewModes.filter((mode) => availableModes.includes(mode.id))
    : allViewModes.filter((mode) => standardViewModes.includes(mode.id));

  return (
    <div className={`rmg-view-mode-selector ${darkMode ? 'rmg-dark' : ''}`} data-rmg-component="view-mode-selector">
      {viewModes.map((mode) => (
        <button
          key={mode.id}
          type="button"
          className={`rmg-view-mode-button ${activeMode === mode.id ? 'rmg-view-mode-button-active' : ''}`}
          onClick={() => onChange(mode.id)}
          data-rmg-component="view-mode-button"
          data-view-mode={mode.id}
          data-active={activeMode === mode.id ? 'true' : 'false'}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
};

export default ViewModeSelector;
