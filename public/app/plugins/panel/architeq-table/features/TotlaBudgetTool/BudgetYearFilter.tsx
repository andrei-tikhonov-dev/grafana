import { css } from '@emotion/css';
import React, { useState } from 'react';

import { SelectableValue } from '@grafana/data';
import { MultiSelect, useStyles2 } from '@grafana/ui';

import { HeaderItem } from '../../components/HeaderItem';

import { BudgetFields } from './constants';
import { BudgetFilterType } from './types';

export const FILTER_HEIGHT = 45;

const getStyles = () => {
  return {
    container: css`
      flex: 1;
    `,
  };
};

type Props = {
  years: string[];
  onChange: (filter: BudgetFilterType) => void;
};

export const BudgetYearFilter: React.FC<Props> = ({ years = [], onChange }) => {
  const [filter, setFilter] = useState<BudgetFilterType>({
    years: [],
  });
  const styles = useStyles2(getStyles);

  const handleChange = (selected: Array<SelectableValue<string>>) => {
    const selectedValues = selected.map((item) => item.value || '');
    const newFilter = { ...filter, years: selectedValues };
    setFilter(newFilter);
    onChange(newFilter);
  };

  return (
    <div className={styles.container}>
      <HeaderItem>
        <MultiSelect
          options={years.map((year) => ({ label: year, value: year }))}
          value={filter.years.map((year) => ({ label: year, value: year }))}
          onChange={handleChange}
          placeholder={BudgetFields.Year}
          isClearable
        />
      </HeaderItem>
    </div>
  );
};
