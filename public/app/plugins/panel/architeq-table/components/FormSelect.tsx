import React from 'react';
import { UseFormReturn, Controller } from 'react-hook-form';

import { SelectableValue } from '@grafana/data';
import { Field, Select } from '@grafana/ui';

interface HookFormSelectProps {
  name: string;
  label: string;
  form: UseFormReturn<any>;
  rules?: any;
  options: Array<SelectableValue<string>>;
  placeholder?: string;
}

export const HookFormSelect: React.FC<HookFormSelectProps> = ({ name, label, form, rules, options, placeholder }) => {
  const {
    control,
    formState: { errors },
  } = form;
  const error = errors[name];

  return (
    <Field label={label} invalid={!!error} error={error?.message as string}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select
            options={options}
            value={options.find((o) => o.value === field.value) || null}
            onChange={(val) => field.onChange(val?.value)}
            placeholder={placeholder}
          />
        )}
      />
    </Field>
  );
};
