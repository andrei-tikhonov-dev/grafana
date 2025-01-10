import React from 'react';

import { DataTable } from '../../components/DataTable/DataTable';
import { TablePanelProps } from '../../types';

interface Props extends TablePanelProps {}

export const GenericTable: React.FC<Props> = ({ options, data, width, height }) => {
  const dataFrame = data.series[0];

  return <DataTable width={width} height={height} data={dataFrame} />;
};
