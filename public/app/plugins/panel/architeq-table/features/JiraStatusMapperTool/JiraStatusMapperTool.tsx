import React, { useState, useMemo, useCallback } from 'react';

import { CustomCellRendererProps, Alert } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { HeaderContainer } from '../../components/HeaderContainer';
import { RequestMethod } from '../../constants';
import { useRequest } from '../../hooks/useRequest';
import { TablePanelProps } from '../../types';
import { getColumnDataObject } from '../../utils';

import { BoardSelector } from './BoardSelector';
import { hiddenFields, JiraStatusMapperToolFields } from './constants';
import { BoardOption, JiraStatusMapperToolMetaType, JiraStatusMapperToolUpdatePayload } from './types';
import { configJiraStatusMapperToolData, filterData, getFilterOptions, objectToOptionArray } from './utils';

const HEADER_HEIGHT = 45;

interface JiraStatusMapperToolProps extends TablePanelProps {}

export const JiraStatusMapperTool: React.FC<JiraStatusMapperToolProps> = ({ options, data, width, height }) => {
  const dataFrame = data.series[0];
  const meta = dataFrame.meta as JiraStatusMapperToolMetaType;
  const { boardOptions, boardIDs, boardNames, typeOptions } = useMemo(() => {
    const boardIDs = getColumnDataObject(dataFrame, JiraStatusMapperToolFields.BoardID);
    const boardNames = getColumnDataObject(dataFrame, JiraStatusMapperToolFields.ColumnName);
    const boardOptions = getFilterOptions(dataFrame);
    const typeOptions = objectToOptionArray(meta.custom.possibleStatuses);

    return {
      boardOptions,
      boardIDs,
      boardNames,
      typeOptions,
    };
  }, [dataFrame, meta.custom.possibleStatuses]);

  const [board, setBoard] = useState<BoardOption>(boardOptions[0]);
  const [showErrors, setShowErrors] = useState<boolean>(true);

  const { customUpdateRequest, loading } = useRequest({
    update: {
      url: options.updateUrl,
      method: RequestMethod.POST,
    },
  });

  const handleUpdate = useCallback(
    async (value: string, { rowIndex }: CustomCellRendererProps) => {
      const payload: JiraStatusMapperToolUpdatePayload = {
        sprintometerStatus: value,
      };

      const boardId = String(boardIDs[rowIndex]);
      const boardName = encodeURIComponent(boardNames[rowIndex]);
      return customUpdateRequest(payload, `${boardId}/${boardName}`);
    },
    [boardIDs, boardNames, customUpdateRequest]
  );

  const configuredData = useMemo(() => {
    const filteredData = filterData(dataFrame, board);
    return configJiraStatusMapperToolData({
      dataFrame: filteredData,
      hiddenFields,
      typeOptions,
    });
  }, [dataFrame, board, typeOptions]);

  return (
    <>
      {meta.custom.errors?.length && showErrors && (
        <Alert title="Errors" severity="error" onRemove={() => setShowErrors(false)}>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {meta.custom.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <HeaderContainer>
        <BoardSelector options={boardOptions} onChange={setBoard} filter={board} />
      </HeaderContainer>

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
