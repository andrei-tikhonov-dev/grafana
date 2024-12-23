import React from 'react';
import { UseFormReturn, Controller } from 'react-hook-form';

import { Field, Switch } from '@grafana/ui';

interface HookFormSwitchProps {
  name: string;
  label: string;
  form: UseFormReturn<any>;
  rules?: any;
  description?: string;
}

export const HookFormSwitch: React.FC<HookFormSwitchProps> = ({ name, label, form, rules, description }) => {
  const {
    control,
    formState: { errors },
  } = form;

  const error = errors[name];

  return (
    <Field label={label} invalid={!!error} error={error?.message as string} description={description}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Switch label={label} checked={!!field.value} onChange={(v) => field.onChange(v.currentTarget.checked)} />
        )}
      />
    </Field>
  );
};
