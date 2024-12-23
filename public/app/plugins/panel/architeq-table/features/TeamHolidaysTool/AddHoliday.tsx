import React from 'react';
import { useForm } from 'react-hook-form';

import { HookFormField } from '../../components/FormField';
import { FormFooter } from '../../components/FormFooter';
import { HookFormSelect } from '../../components/FormSelect';
import { OptionType } from '../../types';

import { HolidaysCreateTableType } from './types';

interface Props {
  onClose: () => void;
  onCreate: (data: HolidaysCreateTableType) => void;
  typeOptions: OptionType[];
}

export const AddHoliday: React.FC<Props> = ({ onClose, onCreate, typeOptions }) => {
  const form = useForm<HolidaysCreateTableType>();
  const { handleSubmit } = form;

  const onSubmit = async (data: HolidaysCreateTableType) => {
    await onCreate(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HookFormField
        name="description"
        label="Holiday description"
        form={form}
        rules={{ required: 'Holiday description is required' }}
      />

      <HookFormSelect
        name="type"
        label="Type of holiday"
        form={form}
        options={typeOptions}
        rules={{ required: 'Type of holiday is required' }}
        placeholder="Select a type"
      />

      <HookFormField
        name="date"
        label="Holiday date"
        form={form}
        type="date"
        rules={{ required: 'Holiday date is required' }}
      />

      <FormFooter onClose={onClose} />
    </form>
  );
};
