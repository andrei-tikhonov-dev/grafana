import { css } from '@emotion/css';
import React from 'react';

import { UiMultiSelect } from '../../../components/ui';

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
  const styles = getStyles();

  const multiselectOptions = options.map((value) => ({
    label: value,
    value: value,
  }));

  return (
    <UiMultiSelect
      className={styles.container}
      maxCount={2}
      options={multiselectOptions}
      defaultValue={selectedValues}
      onValueChange={onChange}
      placeholder={placeholder || 'Select options'}
    />
  );
};
