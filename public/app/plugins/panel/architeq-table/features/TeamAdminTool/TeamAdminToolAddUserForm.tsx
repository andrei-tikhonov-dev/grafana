import { css } from '@emotion/css';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, Field, Input, Switch, useStyles2 } from '@grafana/ui';

import { RolesFieldArray } from '../../components/RolesFieldArray';
import { RoleType } from '../../types';

import { TeamAdminToolCreateTableType } from './types';

interface Props {
  onClose: () => void;
  onCreate: (data: TeamAdminToolCreateTableType) => void;
  roles: RoleType['availableRoles'];
  maxWorkload: number;
}

const getStyles = () => {
  return {
    footer: css`
      margin-top: 18px;
      display: flex;
      align-items: center;
      gap: 10px;
    `,
  };
};

export const TeamAdminToolAddUserForm: React.FC<Props> = ({
  onClose,
  onCreate,
  roles: availableRoles,
  maxWorkload,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<TeamAdminToolCreateTableType>({
    defaultValues: {
      roles: [],
    },
  });
  const styles = useStyles2(getStyles);

  const onSubmit = async (data: TeamAdminToolCreateTableType) => {
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

      <Field label="Workload ratio, %" invalid={!!errors.workloadRatio} error={errors.workloadRatio?.message}>
        <Input
          type="number"
          {...register('workloadRatio', {
            required: 'Workload ratio is required',
            valueAsNumber: true,
            max: {
              value: maxWorkload,
              message: `Workload ratio cannot exceed ${maxWorkload}`,
            },
          })}
        />
      </Field>

      <Field label="Roles" invalid={!!errors.roles} error={errors.roles?.message}>
        <RolesFieldArray
          control={control}
          name="roles"
          availableRoles={availableRoles}
          errors={errors}
          setError={setError}
          clearErrors={clearErrors}
        />
      </Field>

      {/* Start Date Field */}
      <Field label="Start Date" invalid={!!errors.workStartDate} error={errors.workStartDate?.message}>
        <Input type="date" {...register('workStartDate')} />
      </Field>

      {/* End Date Field */}
      <Field label="End Date" invalid={!!errors.workEndDate} error={errors.workEndDate?.message}>
        <Input type="date" {...register('workEndDate')} />
      </Field>

      {/* Exclude From Capacity Field */}
      <Field label="Exclude From Capacity" description="Exclude this user from capacity calculations">
        <Controller
          name="excludedFromCapacity"
          control={control}
          render={({ field }) => (
            <Switch
              label="Exclude From Capacity"
              checked={field.value}
              onChange={(v) => field.onChange(v.currentTarget.checked)}
            />
          )}
        />
      </Field>

      <div className={styles.footer}>
        <Button type="submit">Submit</Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
