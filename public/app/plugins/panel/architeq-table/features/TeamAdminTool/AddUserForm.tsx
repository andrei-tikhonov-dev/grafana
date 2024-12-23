import React from 'react';
import { useForm } from 'react-hook-form';

import { Field } from '@grafana/ui';

import { HookFormField } from '../../components/FormField';
import { FormFooter } from '../../components/FormFooter';
import { HookFormSwitch } from '../../components/FormSwitch';
import { RolesFieldArray } from '../../components/RolesFieldArray';
import { RoleType } from '../../types';

import { TeamAdminToolCreateTableType } from './types';

interface Props {
  onClose: () => void;
  onCreate: (data: TeamAdminToolCreateTableType) => void;
  roles: RoleType['availableRoles'];
  maxWorkload: number;
}

export const AddUserForm: React.FC<Props> = ({ onClose, onCreate, roles: availableRoles, maxWorkload }) => {
  const form = useForm<TeamAdminToolCreateTableType>({
    defaultValues: {
      roles: [],
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = form;

  const onSubmit = async (data: TeamAdminToolCreateTableType) => {
    await onCreate(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HookFormField name="name" label="Name" form={form} rules={{ required: 'Team member name is required' }} />

      <HookFormField
        name="email"
        label="Email"
        form={form}
        rules={{
          required: 'Email is required',
          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
        }}
      />

      <HookFormField
        name="internalOrgId"
        label="Internal org ID"
        form={form}
        rules={{ required: 'Internal org ID is required' }}
      />

      <HookFormField
        name="hourlyRate"
        label="Hourly rate"
        form={form}
        type="number"
        rules={{
          required: 'Hourly rate is required',
          valueAsNumber: true,
        }}
      />

      <HookFormField
        name="yearlyHours"
        label="Yearly hours"
        form={form}
        type="number"
        rules={{
          required: 'Yearly hours are required',
          valueAsNumber: true,
        }}
      />

      <HookFormField
        name="workloadRatio"
        label="Workload ratio, %"
        form={form}
        type="number"
        rules={{
          required: 'Workload ratio is required',
          valueAsNumber: true,
          max: {
            value: maxWorkload,
            message: `Workload ratio cannot exceed ${maxWorkload}`,
          },
        }}
      />

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

      <HookFormField name="workStartDate" label="Start Date" form={form} type="date" />

      <HookFormField name="workEndDate" label="End Date" form={form} type="date" />

      <HookFormSwitch
        name="excludedFromCapacity"
        label="Exclude From Capacity"
        form={form}
        description="Exclude this user from capacity calculations"
      />

      <FormFooter onClose={onClose} />
    </form>
  );
};
