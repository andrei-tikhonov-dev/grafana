import React from 'react';

import { UiPeriodSelect } from '../../../components/ui';
import { PeriodSelectOption } from '../../../components/ui/period-select/UiPeriodSelect';
import { TPeriodVariant } from '../../../types';
import { setVariable, setVariables } from '../../../utils/grafana';
import { MInterval, MIntervalOption } from '../types';

interface Props extends MInterval { }

const convertToPeriodSelectOptions = (intervals: MIntervalOption[]): PeriodSelectOption[] => {
  return intervals.map((interval) => ({
    label: interval.name,
    value: interval.id.toString(),
    period: interval.period,
  }));
};

export function getDefaultPeriodValue(options: PeriodSelectOption[], variant: TPeriodVariant): string | string[] {
  const currentOptions = options.filter((option) => option.period?.isCurrent === true);

  if (currentOptions.length === 0) {
    return options[0].value;
  }

  if (variant === 'single') {
    return currentOptions[0].value;
  }

  if (variant === 'range') {
    if (currentOptions.length === 1) {
      return [currentOptions[0].value, currentOptions[0].value];
    }

    return [currentOptions[0].value, currentOptions[currentOptions.length - 1].value];
  }

  return options[0].value;
}

/**
 * IntervalSelector component.
 * Allows selecting a time interval.
 */
export const IntervalSelector: React.FC<Props> = ({ options, variant, selectable }) => {
  const intervalOptions = convertToPeriodSelectOptions(options);
  const defaultValue = getDefaultPeriodValue(intervalOptions, variant);

  const handleValueChange = React.useCallback(
    async (value: string | string[]) => {
      if (variant === 'single') {
        await setVariable('selectedId', value as string);
      } else if (variant === 'range') {
        const [startId, endId] = value as string[];
        await setVariables({
          startId,
          endId,
        });
      }
    },
    [variant]
  );

  return (
    <UiPeriodSelect
      variant={variant}
      options={intervalOptions}
      defaultValue={defaultValue}
      placeholder="Period not selected"
      disabled={!selectable}
      onValueChange={handleValueChange}
    />
  );
};
