import React from 'react';

import { DataFrame } from '@grafana/data';
import { Table } from '@grafana/ui';

import { LoadingMode } from '../../constants';
import { UpdateDataHandler } from '../../types';

import { DataCellProvider } from './DataCellContext';

type Props = {
  data: DataFrame;
  onDataUpdate: UpdateDataHandler;
  width: number;
  height: number;
  loading?: LoadingMode;
};

export const DataTable: React.FC<Props> = ({ width, height, onDataUpdate, data, loading }) => {
  return (
    <DataCellProvider onDataUpdate={onDataUpdate} loading={loading}>
      <Table width={width} height={height} data={data} />
    </DataCellProvider>
  );
};
