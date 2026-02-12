import React from 'react';

import { CustomCellRendererProps } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { FormModalWrapper } from '../../components/FormModalWrapper';
import { HeaderContainer } from '../../components/HeaderContainer';
import { RequestMethod } from '../../constants';
import { useRequest } from '../../hooks/useRequest';
import { TablePanelProps } from '../../types';

import { AddDoraConfigForm } from './AddDoraConfigForm';
import { hiddenFields, DoraConfigToolFields, PROPERTY_NAME_MAP } from './constants';
import {
  DoraConfigToolCreateFormData,
  DoraConfigToolCreatePayload,
  DoraConfigToolMetaType,
  DoraConfigToolUpdatePayload,
} from './types';
import { configDoraConfigToolData, getPayloadIDs } from './utils';

interface Props extends TablePanelProps {}

export const DoraConfigTool: React.FC<Props> = ({ options, data, width, height }) => {
  const dataFrame = data.series[0];
  const payloadIDs = getPayloadIDs(dataFrame);
  const {
    custom: { projectId, defaultThresholds },
  } = dataFrame.meta as DoraConfigToolMetaType;

  const { createRequest, updateRequest, deleteRequest, loading, isLoading } = useRequest({
    create: {
      url: options.createUrl,
      method: RequestMethod.POST,
    },
    update: {
      url: options.updateUrl,
      method: RequestMethod.POST,
    },
    delete: {
      url: options.deleteUrl,
      method: RequestMethod.DELETE,
    },
  });

  const handleUpdate = async (value: any, { rowIndex, field }: CustomCellRendererProps) => {
    const { id } = payloadIDs[rowIndex];

    const propertyName = PROPERTY_NAME_MAP[field.name] || field.name;

    const payload: DoraConfigToolUpdatePayload = {
      id: Number(id),
      propertyName,
      value: field.name === DoraConfigToolFields.DoraThresholds ? value : value,
    };

    return updateRequest(payload);
  };

  const handleDelete = (rowIndex: number) => {
    const { id } = payloadIDs[rowIndex];
    return deleteRequest({}, String(id));
  };

  const handleCreate = async (formData: DoraConfigToolCreateFormData) => {
    const payload: DoraConfigToolCreatePayload = {
      projectId,
      technicalServiceName: formData.technicalServiceName,
      bitbucketProjectKey: formData.bitbucketProjectKey,
      bitbucketRepositorySlug: formData.bitbucketRepositorySlug,
      splunkProjectTags: formData.splunkProjectTags || undefined,
    };
    return createRequest(payload);
  };

  const configuredData = configDoraConfigToolData({ dataFrame, hiddenFields, handleDelete, defaultThresholds });

  return (
    <>
      <HeaderContainer>
        <FormModalWrapper title="Add DORA Technical Service">
          {({ onClose }) => (
            <AddDoraConfigForm onClose={onClose} onCreate={handleCreate} isLoading={isLoading} />
          )}
        </FormModalWrapper>
      </HeaderContainer>

      <DataTable width={width} height={height} data={configuredData} loading={loading} onUpdate={handleUpdate} />
    </>
  );
};
