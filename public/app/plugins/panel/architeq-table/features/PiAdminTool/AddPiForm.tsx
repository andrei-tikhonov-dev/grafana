import React from 'react';
import { useForm } from 'react-hook-form';

import { HookFormField } from '../../components/FormField';
import { FormFooter } from '../../components/FormFooter';

import { PiFields } from './constants';
import { PiAdminCreateFormType } from './types';

interface Props {
  onClose: () => void;
  onCreate: (data: PiAdminCreateFormType) => void;
}

export const AddPiForm: React.FC<Props> = ({ onClose, onCreate }) => {
  const form = useForm<PiAdminCreateFormType>();
  const { handleSubmit } = form;

  const onSubmit = async (data: PiAdminCreateFormType) => {
    await onCreate(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HookFormField name={PiFields.PiName} label="Name" form={form} rules={{ required: 'Name is required' }} />

      <HookFormField
        name={PiFields.StartDate}
        label="Start date"
        form={form}
        type="date"
        rules={{ required: 'Start date is required' }}
      />

      <HookFormField
        name={PiFields.EndDate}
        label="End date"
        form={form}
        type="date"
        rules={{ required: 'End date is required' }}
      />

      <FormFooter onClose={onClose} />
    </form>
  );
};
