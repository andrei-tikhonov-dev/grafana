import React from 'react';
import { useForm } from 'react-hook-form';

import { HookFormField } from '../../components/FormField';
import { FormFooter } from '../../components/FormFooter';
import { HookFormSelect } from '../../components/FormSelect';
import { HookFormSwitch } from '../../components/FormSwitch';
import { OptionType } from '../../types';

import { HolidayPrefixesCreateTableType } from './types';

interface Props {
  onClose: () => void;
  onCreate: (data: HolidayPrefixesCreateTableType) => void;
  typeOptions: OptionType[];
}

export const AddPrefix: React.FC<Props> = ({ onClose, onCreate, typeOptions }) => {
  const form = useForm<HolidayPrefixesCreateTableType>();
  const { handleSubmit } = form;

  const onSubmit = async (data: HolidayPrefixesCreateTableType) => {
    await onCreate(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HookFormField name="prefix" label="Prefix" form={form} rules={{ required: 'Prefix is required' }} />

      <HookFormSwitch name="relevantForCapacity" label="Relevant for capacity" form={form} />

      <HookFormSwitch name="showInCalendar" label="Show in calendar" form={form} />

      <HookFormSelect
        name="type"
        label="Type"
        form={form}
        options={typeOptions}
        rules={{ required: 'Type is required' }}
        placeholder="Select a type"
      />

      <FormFooter onClose={onClose} />
    </form>
  );
};
