import React from 'react';
import { UseFormReturn, Controller } from 'react-hook-form';

import { Field, DatePickerWithInput } from '@grafana/ui';

interface HookFormFieldProps {
  name: string;
  label: string;
  form: UseFormReturn<any>;
  rules?: Parameters<UseFormReturn['register']>[1];
  type?: string;
  step?: number | string;
}

export const HookFormDate: React.FC<HookFormFieldProps> = ({ name, label, form, rules, ...props }) => {
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
          <DatePickerWithInput
            value={field.value}
            onChange={field.onChange}
            onFocus={(e) => {
              e.target.click();
            }}
            {...props}
          />
        )}
      />
    </Field>
  );
};
