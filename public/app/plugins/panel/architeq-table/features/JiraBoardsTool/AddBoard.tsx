import React from 'react';
import { useForm } from 'react-hook-form';

import { HookFormField } from '../../components/FormField';
import { FormFooter } from '../../components/FormFooter';
import { HookFormSelect } from '../../components/FormSelect';
import { OptionType } from '../../types';

import { JiraBoardsCreateFormType } from './types';

interface Props {
  onClose: () => void;
  onCreate: (data: JiraBoardsCreateFormType) => void;
  typeOptions: OptionType[];
}

export const AddBoard: React.FC<Props> = ({ onClose, onCreate, typeOptions }) => {
  const form = useForm<JiraBoardsCreateFormType>();
  const { handleSubmit } = form;

  const onSubmit = async (data: JiraBoardsCreateFormType) => {
    await onCreate(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HookFormField name="name" label="Name" form={form} rules={{ required: 'Name' }} />

      <HookFormSelect
        name="type"
        label="Type"
        form={form}
        options={typeOptions}
        rules={{ required: 'Type is required' }}
        placeholder="Select a type"
      />

      <HookFormField name="boardId" label="Board ID" form={form} rules={{ required: 'Board ID is required' }} />

      <FormFooter onClose={onClose} />
    </form>
  );
};
