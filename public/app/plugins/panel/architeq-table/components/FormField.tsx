import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Field, Input } from '@grafana/ui';

interface HookFormFieldProps {
  name: string;
  label: string;
  form: UseFormReturn<any>;
  rules?: Parameters<UseFormReturn['register']>[1];
  type?: string;
  step?: number | string;
}

export const HookFormField: React.FC<HookFormFieldProps> = ({ name, label, form, rules, type = 'text', ...props }) => {
  const {
    register,
    formState: { errors },
  } = form;
  const error = errors[name];

  return (
    <Field label={label} invalid={!!error} error={error?.message as string}>
      <Input type={type} {...register(name, rules)} {...props} />
    </Field>
  );
};
