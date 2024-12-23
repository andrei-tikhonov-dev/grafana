import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Field, Input } from '@grafana/ui';

import { TeamHolidaysToolCreateTableType } from './types';

interface Props {
  onClose: () => void;
  onCreate: (data: TeamHolidaysToolCreateTableType) => void;
}

export const AddHolidaysForm: React.FC<Props> = ({ onClose, onCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamHolidaysToolCreateTableType>();

  const onSubmit = async (data: TeamHolidaysToolCreateTableType) => {
    await onCreate(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field label="Holiday description" invalid={!!errors.description} error={errors.description?.message}>
        <Input {...register('description', { required: 'Holiday description is required' })} />
      </Field>

      {/* End Date Field */}
      <Field label="Holiday date" invalid={!!errors.date} error={errors.date?.message}>
        <Input
          type="date"
          {...register('date', {
            required: 'Holiday date is required',
          })}
        />
      </Field>

      <Button type="submit">Submit</Button>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
    </form>
  );
};
