import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, Field, Input, Select } from '@grafana/ui';

import { TeamAdminToolCreatePayload, TeamAdminToolCreateTableType, TeamAdminToolRoleType } from './types';

interface Props {
  onClose: () => void;
  onCreate: (data: TeamAdminToolCreateTableType) => void;
  roles: TeamAdminToolRoleType[];
  maxWorkload: number;
}

export const TeamAdminToolAddUserForm: React.FC<Props> = ({ onClose, onCreate, roles, maxWorkload }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TeamAdminToolCreatePayload>();

  const roleOptions = roles.map((role) => ({ value: role.id, label: role.name }));

  const onSubmit = async (data: TeamAdminToolCreatePayload) => {
    await onCreate(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field label="Name" invalid={!!errors.name} error={errors.name?.message}>
        <Input {...register('name', { required: 'Team member name is required' })} />
      </Field>

      <Field label="Email" invalid={!!errors.email} error={errors.email?.message}>
        <Input
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
          })}
        />
      </Field>

      <Field label="Internal org ID" invalid={!!errors.internalOrgId} error={errors.internalOrgId?.message}>
        <Input {...register('internalOrgId', { required: 'Internal org ID is required' })} />
      </Field>

      <Field label="Hourly rate" invalid={!!errors.hourlyRate} error={errors.hourlyRate?.message}>
        <Input
          type="number"
          {...register('hourlyRate', {
            required: 'Hourly rate is required',
            valueAsNumber: true,
          })}
        />
      </Field>

      <Field label="Yearly hours" invalid={!!errors.yearlyHours} error={errors.yearlyHours?.message}>
        <Input
          type="number"
          {...register('yearlyHours', {
            required: 'Yearly hours are required',
            valueAsNumber: true,
          })}
        />
      </Field>

      <Field label="Workload ratio" invalid={!!errors.workloadRatio} error={errors.workloadRatio?.message}>
        <Input
          type="number"
          {...register('workloadRatio', {
            required: 'Workload ratio is required   ',
            valueAsNumber: true,
            max: {
              value: maxWorkload,
              message: `Workload ratio cannot exceed ${maxWorkload}`,
            },
          })}
        />
      </Field>

      <Field label="Role" invalid={!!errors.role} error={errors.role?.message}>
        <Controller
          name="role"
          control={control}
          rules={{ required: 'Role is required' }}
          render={({ field }) => (
            <Select
              options={roleOptions}
              value={field.value}
              onChange={(v) => field.onChange(v.value)}
              placeholder="Select Role"
            />
          )}
        />
      </Field>

      <Button type="submit">Submit</Button>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
    </form>
  );
};
