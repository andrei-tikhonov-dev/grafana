import React, { useCallback } from 'react';

import { Label, RadioButtonGroup } from '@grafana/ui';

import { HeaderItem } from '../../components/HeaderItem';
import { createSelectOptions } from '../../utils';

type Props = {
  options: string[];
  onChange: (filter: string) => void;
  filter: string;
};

export const JiraStatusMapperFilters: React.FC<Props> = ({ options, onChange, filter }) => {
  const handleRadioChange = useCallback(
    (value: string) => {
      onChange(value);
    },
    [onChange]
  );

  const radioOptions = createSelectOptions(options);

  return (
    <HeaderItem>
      <Label>Jira boards</Label>
      <RadioButtonGroup options={radioOptions} value={filter} onChange={handleRadioChange} />
    </HeaderItem>
  );
};
