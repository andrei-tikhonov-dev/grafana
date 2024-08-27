import React from 'react';

import { DataFrame } from '@grafana/data';
import { Table } from '@grafana/ui';

import { LoadingMode } from '../../constants';
import { UpdateHandler } from '../../types';

import { DataCellProvider } from './DataTableContext';

type Props = {
  data: DataFrame;
  width: number;
  height: number;
  onUpdate?: UpdateHandler;
  loading?: LoadingMode;
  baseUrl?: string;
};

export const DataTable: React.FC<Props> = ({ width, height, onUpdate, data, loading, baseUrl }) => {
  return (
    <DataCellProvider onUpdate={onUpdate} loading={loading} baseUrl={baseUrl}>
      <Table width={width} height={height} data={data} />
    </DataCellProvider>
  );
};
