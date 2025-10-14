import React, { useMemo, useState } from 'react';

import { DataFrame } from '@grafana/data';

import { UiHorizontalGroup } from '../../../components/ui';
import { FilterMultiSelect } from '../components/FilterMultiSelect';
import { filterData, getAvailableFilterOptions, getFilterOptions, getInitialSelectedOptions } from '../utils/utils';

type UseFiltersOptions = {
  dataFrame: DataFrame;
  filterFields: string[];
  initialFilters?: Record<string, string[]>;
  onFilterChange: (options: Record<string, string[]>) => void;
};

export function useFiltersComponent({ dataFrame, filterFields, initialFilters, onFilterChange }: UseFiltersOptions) {
  const initialSelectedOptions = useMemo(() => {
    const availableOptions = getAvailableFilterOptions(filterFields, dataFrame);
    return getInitialSelectedOptions(availableOptions, filterFields, initialFilters);
  }, [dataFrame, filterFields, initialFilters]);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>(initialSelectedOptions);

  const filterComponents = filterFields.map((fieldName) => {
    const currentSelectedOptions = Object.fromEntries(
      Object.entries(selectedOptions).filter(([name]) => name !== fieldName)
    ) as Record<string, string[]>;
    const currentData = filterData(dataFrame, currentSelectedOptions);

    const field = currentData.fields.find((f) => f.name === fieldName);

    const options = field ? getFilterOptions(field) : [];

    const handleChange = (newSelectedValues: string[]) => {
      setSelectedOptions((prev) => {
        const filters = {
          ...prev,
          [fieldName]: newSelectedValues,
        };
        onFilterChange(filters);
        return filters;
      });
    };

    return (
      <FilterMultiSelect
        key={fieldName}
        placeholder={fieldName}
        options={options}
        selectedValues={selectedOptions[fieldName]}
        onChange={handleChange}
      />
    );
  });

  const filtersComponent = filterFields.length > 0 ? <UiHorizontalGroup>{filterComponents}</UiHorizontalGroup> : null;

  return {
    filtersComponent,
    selectedOptions,
    dataFrame: filterData(dataFrame, selectedOptions),
  };
}
