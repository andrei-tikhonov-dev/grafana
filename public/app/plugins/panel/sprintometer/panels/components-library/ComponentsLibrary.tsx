import { css, cx } from '@emotion/css';
import React, { useState } from 'react';

import { PanelProps } from '@grafana/data';

import { Badge } from '../../components/shadcn/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/shadcn/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/shadcn/popover';
import { UiButton, UiPanelTitle, UiSelect } from '../../components/ui';
import { theme } from '../../theme';
import { PanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { BreadcrumbExample } from './Demo/BreadcrumbsExample';
import UiButtonShowcase from './Demo/ButtonShowcase';
import { CalendarExample } from './Demo/CalendarExample';
import { CommandExample } from './Demo/CommandExample';
import { DatePickerDemo } from './Demo/DatePickerDemo';
import { DatePickerExample } from './Demo/DatePickerExample';
import { ExampleCombobox } from './Demo/ExampleCombobox';
import { FancyMultiSelect } from './Demo/FancyMultiSelect';
import { FormExample } from './Demo/FormExample';
import { MultiSelectTest } from './Demo/MultiSelectTest';
import { SwitchDemo } from './Demo/SwitchDemo';
import { jiraStatusGroups } from './Demo/selectData';
import { ComponentsLibraryCustomDataInterface } from './types';

interface Props extends PanelProps<PanelOptions> {}

const styles = {
  wrapper: css`
    padding: 10px;
    font-family: ${theme.typography.fontFamily};
    display: flex;
    flex-direction: column;
  `,
  content: css`
    flex: 1 1 auto;
    overflow-y: auto;
  `,
  test: css`
    margin: 30px 0;
  `,
};

const initialData: ComponentsLibraryCustomDataInterface = {};

export const ComponentsLibrary: React.FC<Props> = ({ width, height, data }) => {
  const customData = getGrafanaCustomData<ComponentsLibraryCustomDataInterface>(data, initialData);
  console.log(customData);

  const [selectedStatus, setSelectedStatus] = useState<string>('');

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <UiPanelTitle>Component library</UiPanelTitle>
      <CommandExample />
      <div className={styles.content}>
        <div className={styles.test}>
          <BreadcrumbExample />
        </div>

        <div className={styles.test}>
          <UiButtonShowcase />
        </div>

        <div className={styles.test}>
          <DatePickerDemo />
        </div>

        <div className={styles.test}>
          <DatePickerExample />
        </div>

        <div className={styles.test}>
          <SwitchDemo />
        </div>
        <div className={styles.test}>
          <MultiSelectTest />
        </div>

        <div className={styles.test}>
          <FancyMultiSelect />
        </div>

        <div className={styles.test}>
          <UiSelect
            groups={jiraStatusGroups}
            value={selectedStatus}
            onValueChange={setSelectedStatus}
            placeholder="Select Jira status"
          />
        </div>

        <div className={styles.test}>
          <Popover>
            <PopoverTrigger asChild>
              <UiButton>Open</UiButton>
            </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
        </div>

        <div className={styles.test}>
          <Dialog>
            <DialogTrigger asChild>
              <UiButton variant="secondary">Open</UiButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <div className={styles.test}>
          <ExampleCombobox />
        </div>

        <div className={styles.test}>
          <CalendarExample />
        </div>

        <div className={styles.test} style={{ display: 'flex', gap: '8px' }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>

        <div className={styles.test}>
          <FormExample />
        </div>
      </div>
    </div>
  );
};
