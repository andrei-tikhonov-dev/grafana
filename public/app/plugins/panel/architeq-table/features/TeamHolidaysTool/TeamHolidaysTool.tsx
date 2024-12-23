import { css } from '@emotion/css';
import React from 'react';

import { CustomCellRendererProps, useStyles2 } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { RequestMethod } from '../../constants';
import { useRequest } from '../../hooks/useRequest';
import { TablePanelProps } from '../../types';

import { AddHolidayButton } from './AddHolidayButton';
import { hiddenFields } from './constants';
import {
  TeamHolidaysToolCreateTableType,
  TeamHolidaysToolDeletePayload,
  TeamHolidaysToolMetaType,
  TeamHolidaysToolUpdatePayload,
} from './types';
import { configTeamHolidaysToolData, getPayloadIDs, mapTeamHolidayToolCreatePayload } from './utils';

const HEADER_HEIGHT = 45;

interface Props extends TablePanelProps {}

const getStyles = () => {
  return {
    filterContainer: css`
      display: flex;
      gap: 2px;
      margin-bottom: 20px;
      max-width: 800px;
    `,
  };
};

export const TeamHolidaysTool: React.FC<Props> = ({ options, data, width, height }) => {
  const dataFrame = data.series[0];
  const payloadIDs = getPayloadIDs(dataFrame);
  const styles = useStyles2(getStyles);
  const {
    custom: { teamId },
  } = dataFrame.meta as TeamHolidaysToolMetaType;
  const { createRequest, updateRequest, deleteRequest, loading } = useRequest({
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
  const handleUpdate = async (value: number | string, { rowIndex, field }: CustomCellRendererProps) => {
    const payload: TeamHolidaysToolUpdatePayload = {
      teamId: String(teamId),
      propertyName: field.name,
      value,
    };
    return updateRequest(payload, payloadIDs[rowIndex].id);
  };

  const handleDelete = (rowIndex: number) => {
    const payload: TeamHolidaysToolDeletePayload = {
      id: String(payloadIDs[rowIndex].id),
      teamId: String(teamId),
    };
    return deleteRequest(payload);
  };

  const handleCreate = async (data: TeamHolidaysToolCreateTableType) => {
    const payload = mapTeamHolidayToolCreatePayload(data, teamId);
    return createRequest(payload);
  };

  const configuredData = configTeamHolidaysToolData({ dataFrame, hiddenFields, handleDelete });

  return (
    <>
      <div className={styles.filterContainer}>
        <AddHolidayButton onHandleCreate={handleCreate} />
      </div>

      <DataTable
        width={width}
        height={height - HEADER_HEIGHT}
        data={configuredData}
        loading={loading}
        onUpdate={handleUpdate}
      />
    </>
  );
};
