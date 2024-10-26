import React, { useState } from 'react';

import { InlineSwitch } from '@grafana/ui';

interface UseSwitchProps {
  label: string;
}

export const useSwitch = ({ label }: UseSwitchProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const switchComponent = <InlineSwitch showLabel={true} label={label} value={isChecked} onChange={onChange} />;

  return { switchComponent, isChecked };
};
