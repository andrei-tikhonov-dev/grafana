import { OptionType } from '../types';
import React from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';
import { Button, Dropdown, Menu, useStyles2 } from '@grafana/ui';
import { setVariable } from '../utils';

type Props = {
  label: string;
  options: OptionType[];
};

const getStyles = (theme: GrafanaTheme2) => {
  return {
    container: css`
      display: flex;
      gap: 5px;
    `,
  };
};

export const Select: React.FC<Props> = ({ options, label }) => {
  // @ts-ignore
  const styles = useStyles2(getStyles);
  const menu = (
    <Menu>
      {options.map(({ id, name }) => (
        <Menu.Item label={name} onClick={() => setVariable('selectedId', id)} />
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button size="sm">{label || 'Change'} </Button>
    </Dropdown>
  );
};
