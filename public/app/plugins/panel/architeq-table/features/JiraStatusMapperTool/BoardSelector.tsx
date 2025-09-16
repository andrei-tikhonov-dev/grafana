import React, { useCallback } from 'react';

import { Label, RadioButtonGroup } from '@grafana/ui';

import { HeaderItem } from '../../components/HeaderItem';

import { BoardOption } from './types';

type Props = {
  options: BoardOption[];
  onChange: (board: BoardOption) => void;
  filter?: BoardOption;
};

export const BoardSelector: React.FC<Props> = ({ options, onChange, filter }) => {
  const handleRadioChange = useCallback(
    (value: string) => {
      const selectedOption = options.find((option) => option.value === value);
      if (selectedOption) {
        onChange(selectedOption);
      }
    },
    [onChange, options]
  );

  return (
    <HeaderItem>
      <Label>Boards</Label>
      <RadioButtonGroup options={options} value={filter?.value} onChange={handleRadioChange} />
    </HeaderItem>
  );
};
