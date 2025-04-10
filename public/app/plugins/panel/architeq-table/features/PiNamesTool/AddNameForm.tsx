import React from 'react';
import { useForm } from 'react-hook-form';

import { HookFormField } from '../../components/FormField';
import { FormFooter } from '../../components/FormFooter';

import { PiNamesFields } from './constants';
import { PiNameCreateFormType } from './types';
import { HookFormSelect } from '../../components/FormSelect';

interface Props {
  onClose: () => void;
  onCreate: (data: PiNameCreateFormType) => void;
  piOptions: Array<{ label: string; value: string }>;
}

export const AddNameForm: React.FC<Props> = ({ onClose, onCreate, piOptions }) => {
  const form = useForm<PiNameCreateFormType>();
  const { handleSubmit } = form;

  const onSubmit = async (data: PiNameCreateFormType) => {
    await onCreate(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HookFormSelect
        name={PiNamesFields.ID}
        label="PI"
        form={form}
        options={piOptions}
        rules={{ required: 'PI is required' }}
        placeholder="Select a PI"
      />

      <HookFormField name={PiNamesFields.Name} label="Name" form={form} rules={{ required: 'Name is required' }} />

      <FormFooter onClose={onClose} />
    </form>
  );
};
