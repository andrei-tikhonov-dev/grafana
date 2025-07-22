import { css } from '@emotion/css';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { Checkbox } from '../../../components/shadcn/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../../components/shadcn/form';
import { Input } from '../../../components/shadcn/input';
import { Label } from '../../../components/shadcn/label';

const formContainerStyles = css`
  display: grid;
  width: 100%;
  max-width: 384px;
  align-items: center;
  gap: 12px;
`;

const items = [
  {
    id: 'to-do',
    label: 'To Do',
  },
  {
    id: 'in-progress',
    label: 'In Progress',
  },
  {
    id: 'code-review',
    label: 'Code Review',
  },
  {
    id: 'testing',
    label: 'Testing',
  },
  {
    id: 'done',
    label: 'Done',
  },
  {
    id: 'backlog',
    label: 'Backlog',
  },
  {
    id: 'blocked',
    label: 'Blocked',
  },
  {
    id: 'ready-for-deploy',
    label: 'Ready for Deploy',
  },
  {
    id: 'deployed',
    label: 'Deployed',
  },
  {
    id: 'closed',
    label: 'Closed',
  },
] as const;
const formItemStyles = css`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const labelStyles = css`
  margin-left: 8px;
`;

export function FormExample() {
  const form = useForm<any>({
    defaultValues: {
      items: ['to-do', 'in-progress'],
    },
  });

  return (
    <div className={formContainerStyles}>
      <Label htmlFor="status">Status</Label>
      <Input type="text" id="status" placeholder="Status" />

      <Form {...form}>
        {items.map((item) => (
          <FormField
            key={item.id}
            control={form.control}
            name="items"
            render={({ field }) => {
              return (
                <FormItem key={item.id} className={formItemStyles}>
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, item.id])
                          : field.onChange(field.value?.filter((value: any) => value !== item.id));
                      }}
                    />
                  </FormControl>
                  <FormLabel className={labelStyles}>{item.label}</FormLabel>
                </FormItem>
              );
            }}
          />
        ))}
      </Form>
    </div>
  );
}
