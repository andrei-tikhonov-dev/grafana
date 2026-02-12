import React from 'react';
import { useForm } from 'react-hook-form';

import { HookFormField } from '../../components/FormField';
import { FormFooter } from '../../components/FormFooter';

import { DoraConfigToolCreateFormData } from './types';

interface Props {
  onClose: () => void;
  onCreate: (data: DoraConfigToolCreateFormData) => void;
  isLoading: boolean;
}

export const AddDoraConfigForm: React.FC<Props> = ({ onClose, onCreate, isLoading }) => {
  const form = useForm<DoraConfigToolCreateFormData>();

  const { handleSubmit } = form;

  const onSubmit = async (data: DoraConfigToolCreateFormData) => {
    await onCreate(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HookFormField
        name="technicalServiceName"
        label="Technical Service Name"
        form={form}
        rules={{ required: 'Technical Service Name is required' }}
      />

      <HookFormField
        name="bitbucketProjectKey"
        label="Bitbucket Project Key"
        form={form}
        rules={{ required: 'Bitbucket Project Key is required' }}
      />

      <HookFormField
        name="bitbucketRepositorySlug"
        label="Bitbucket Repository Slug"
        form={form}
        rules={{ required: 'Bitbucket Repository Slug is required' }}
      />

      <HookFormField name="splunkProjectTags" label="Splunk Project Tags" form={form} />

      <FormFooter onClose={onClose} isLoading={isLoading} />
    </form>
  );
};
