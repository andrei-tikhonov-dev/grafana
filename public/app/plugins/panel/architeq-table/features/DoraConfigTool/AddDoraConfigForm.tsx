import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { SelectableValue } from '@grafana/data';
import { Field, MultiSelect } from '@grafana/ui';

import { HookFormField } from '../../components/FormField';
import { FormFooter } from '../../components/FormFooter';

import { DoraConfigToolCreateFormData } from './types';

interface Props {
  onClose: () => void;
  onCreate: (data: DoraConfigToolCreateFormData) => void;
  isLoading: boolean;
  defaultBugTypes: string[];
  defaultBugPriorities: string[];
  availableBugTypes: string[];
  availableBugPriorities: string[];
  availableBugComponentNames: string[];
}

export const AddDoraConfigForm: React.FC<Props> = ({
  onClose,
  onCreate,
  isLoading,
  defaultBugTypes,
  defaultBugPriorities,
  availableBugTypes,
  availableBugPriorities,
  availableBugComponentNames,
}) => {
  const form = useForm<DoraConfigToolCreateFormData>({
    defaultValues: {
      bugTypes: defaultBugTypes,
      bugPriorities: defaultBugPriorities,
      bugComponentNames: [],
    },
  });

  const { handleSubmit, control } = form;

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

      <Field label="Bug Types">
        <Controller
          name="bugTypes"
          control={control}
          render={({ field }) => (
            <MultiSelect
              options={availableBugTypes.map((t) => ({ label: t, value: t }))}
              value={field.value}
              onChange={(vals: Array<SelectableValue<string>>) => field.onChange(vals.map((v) => String(v.value)))}
            />
          )}
        />
      </Field>

      <Field label="Bug Priorities">
        <Controller
          name="bugPriorities"
          control={control}
          render={({ field }) => (
            <MultiSelect
              options={availableBugPriorities.map((p) => ({ label: p, value: p }))}
              value={field.value}
              onChange={(vals: Array<SelectableValue<string>>) => field.onChange(vals.map((v) => String(v.value)))}
            />
          )}
        />
      </Field>

      <Field label="Bug Component Names">
        <Controller
          name="bugComponentNames"
          control={control}
          render={({ field }) => (
            <MultiSelect
              options={availableBugComponentNames.map((c) => ({ label: c, value: c }))}
              value={field.value}
              onChange={(vals: Array<SelectableValue<string>>) => field.onChange(vals.map((v) => String(v.value)))}
            />
          )}
        />
      </Field>

      <FormFooter onClose={onClose} isLoading={isLoading} />
    </form>
  );
};
