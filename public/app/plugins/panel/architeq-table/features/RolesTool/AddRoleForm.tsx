import React from 'react';
import { useForm } from 'react-hook-form';

import { HookFormField } from '../../components/FormField';
import { FormFooter } from '../../components/FormFooter';

import { RoleFields } from './constants';
import { RoleCreateFormType } from './types';

interface Props {
  onClose: () => void;
  onCreate: (data: RoleCreateFormType) => void;
  isLoading: boolean;
}

export const AddRoleForm: React.FC<Props> = ({ onClose, onCreate, isLoading }) => {
  const form = useForm<RoleCreateFormType>();
  const { handleSubmit } = form;

  const onSubmit = async (data: RoleCreateFormType) => {
    await onCreate(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HookFormField
        name={RoleFields.RoleName}
        label="Role name"
        form={form}
        rules={{ required: 'Role name is required' }}
      />

      <FormFooter onClose={onClose} isLoading={isLoading} />
    </form>
  );
};
