import { css } from '@emotion/css';
import React from 'react';

import { SelectableValue } from '@grafana/data';
import { MultiSelect, useStyles2 } from '@grafana/ui';

const getStyles = () => ({
  container: css`
    flex: 1;
  `,
});

type FilterMultiSelectProps = {
  options: string[];
  selectedValues: string[];
  placeholder?: string;
  onChange: (newSelectedValues: string[]) => void;
};

export const FilterMultiSelect: React.FC<FilterMultiSelectProps> = ({
  options,
  selectedValues,
  placeholder,
  onChange,
}) => {
  const styles = useStyles2(getStyles);

  const handleChange = (selected: Array<SelectableValue<string>>) => {
    onChange(selected.map((item) => item.value ?? ''));
  };

  return (
    <div className={styles.container}>
      <MultiSelect
        options={options.map((value) => ({ label: value, value }))}
        value={selectedValues ? selectedValues.map((value) => ({ label: value, value })) : []}
        onChange={handleChange}
        placeholder={placeholder}
        closeMenuOnSelect={false}
        isClearable
        isSearchable
      />
    </div>
  );
};
