import React from 'react';
import { useForm } from 'react-hook-form';

import { HookFormField } from '../../components/FormField';
import { FormFooter } from '../../components/FormFooter';
import { HookFormSelect } from '../../components/FormSelect';

import { BudgetFields } from './constants';
import { BudgetCreateFormType } from './types';

interface Props {
  onClose: () => void;
  onCreate: (data: BudgetCreateFormType) => void;
  typeOptions: Array<{ label: string; value: string }>;
  yearOptions: Array<{ label: string; value: string }>;
}

export const AddBudgetForm: React.FC<Props> = ({ onClose, onCreate, typeOptions, yearOptions }) => {
  const form = useForm<BudgetCreateFormType>();
  const { handleSubmit } = form;

  const onSubmit = async (data: BudgetCreateFormType) => {
    await onCreate(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HookFormSelect
        name={BudgetFields.Year}
        label="Year"
        form={form}
        options={yearOptions}
        rules={{ required: 'Year is required' }}
        placeholder="Select a year"
      />

      <HookFormField name={BudgetFields.Label} label="Label" form={form} rules={{ required: 'Label is required' }} />

      <HookFormSelect
        name={BudgetFields.Type}
        label="Type"
        form={form}
        options={typeOptions}
        rules={{ required: 'Type is required' }}
        placeholder="Select a type"
      />

      <HookFormField name={BudgetFields.Code} label="Code" form={form} rules={{ required: 'Code is required' }} />

      <HookFormField
        name={BudgetFields.Budget}
        label="Budget"
        form={form}
        type="number"
        rules={{ required: 'Budget is required' }}
      />

      <HookFormField name={BudgetFields.Description} label="Description" form={form} />

      <FormFooter onClose={onClose} />
    </form>
  );
};
