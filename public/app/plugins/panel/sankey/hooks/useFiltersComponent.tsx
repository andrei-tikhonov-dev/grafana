import React, { useState } from 'react';

import { DataFrame } from '@grafana/data';

import { FilterMultiSelect } from '../components/FilterMultiSelect';
import { FiltersContainer } from '../components/FiltersContainer';
import { filterData, getFilterOptions } from '../utils/utils';

type UseFiltersOptions = {
  dataFrame: DataFrame;
  filterFields: string[];
};

export function useFiltersComponent({ dataFrame, filterFields }: UseFiltersOptions) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(filterFields.map((field) => [field, []]))
  );

  const filterComponents = filterFields.map((fieldName) => {
    const currentSelectedOptions = Object.fromEntries(
      Object.entries(selectedOptions).filter(([name]) => name !== fieldName)
    ) as Record<string, string[]>;
    const currentData = filterData(dataFrame, currentSelectedOptions);

    const field = currentData.fields.find((f) => f.name === fieldName);

    const options = field ? getFilterOptions(field) : [];

    const handleChange = (newSelectedValues: string[]) => {
      setSelectedOptions((prev) => ({
        ...prev,
        [fieldName]: newSelectedValues,
      }));
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

  const filtersComponent = filterFields.length > 0 ? <FiltersContainer>{filterComponents}</FiltersContainer> : null;

  return {
    filtersComponent,
    selectedOptions,
    dataFrame: filterData(dataFrame, selectedOptions),
  };
}
