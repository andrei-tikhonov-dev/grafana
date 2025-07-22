import React from 'react';
import { useForm } from 'react-hook-form';

import { HookFormDate } from '../../components/FormDate';
import { HookFormField } from '../../components/FormField';
import { FormFooter } from '../../components/FormFooter';

import { PiFields } from './constants';
import { PiAdminCreateFormType } from './types';

interface Props {
  onClose: () => void;
  onCreate: (data: PiAdminCreateFormType) => void;
  isLoading: boolean;
}

export const AddPiForm: React.FC<Props> = ({ onClose, onCreate, isLoading }) => {
  const form = useForm<PiAdminCreateFormType>();
  const { handleSubmit } = form;

  const onSubmit = async (data: PiAdminCreateFormType) => {
    await onCreate(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HookFormField name={PiFields.PiName} label="Name" form={form} rules={{ required: 'Name is required' }} />

      <HookFormDate
        name={PiFields.StartDate}
        label="Start date"
        form={form}
        rules={{ required: 'Start date is required' }}
      />

      <HookFormDate name={PiFields.EndDate} label="End date" form={form} rules={{ required: 'End date is required' }} />

      <FormFooter onClose={onClose} isLoading={isLoading} />
    </form>
  );
};
