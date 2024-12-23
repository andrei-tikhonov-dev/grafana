import { css } from '@emotion/css';
import React from 'react';
import { useFieldArray, Controller, useWatch } from 'react-hook-form';
import { Control, UseFormSetError, UseFormClearErrors } from 'react-hook-form/dist/types/form';

import { GrafanaTheme2 } from '@grafana/data';
import { Input, Select, IconButton, Button, useStyles2 } from '@grafana/ui';

const getStyles = (theme: GrafanaTheme2) => {
  return {
    container: css`
      display: flex;
      flex-direction: column;
      gap: 12px;
    `,
    field: css`
      display: flex;
      align-items: center;
      gap: 10px;
    `,
    error: css`
      color: ${theme.colors.error.main};
    `,
  };
};

type RolesFieldArrayProps = {
  control: Control<any>;
  name: string;
  availableRoles: Array<{
    id: number;
    name: string;
  }>;
  loading?: boolean;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
  errors: any;
};

export const RolesFieldArray: React.FC<RolesFieldArrayProps> = ({
  control,
  name,
  availableRoles = [],
  loading,
  setError,
  clearErrors,
  errors,
}) => {
  const styles = useStyles2(getStyles);
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const rolesValue = useWatch({ control, name });

  React.useEffect(() => {
    const totalRate = (rolesValue || []).reduce((sum: number, r: { rate: number }) => sum + (Number(r.rate) || 0), 0);
    if (totalRate > 100) {
      setError(name, { type: 'manual', message: 'Total rate cannot exceed 100%' });
    } else {
      clearErrors(name);
    }
  }, [rolesValue, name, setError, clearErrors]);

  return (
    <div className={styles.container}>
      {errors.roles && <div className={styles.error}>{errors.roles.message}</div>}
      {fields.map((field, index) => (
        <div key={field.id} className={styles.field}>
          <Controller
            name={`${name}.${index}.role`}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Role"
                options={availableRoles.map((role) => ({
                  label: role.name,
                  value: role.id,
                }))}
                defaultValue={field.value}
                disabled={loading}
              />
            )}
          />
          <Controller
            name={`${name}.${index}.rate`}
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                {...field}
                placeholder="Rate, %"
                min={0}
                max={100}
                defaultValue={field.value}
                disabled={loading}
              />
            )}
          />
          <IconButton name="trash-alt" size="sm" onClick={() => remove(index)} aria-label="Remove role" />
        </div>
      ))}
      <div>
        <Button icon="plus" size="sm" onClick={() => append({ role: '', rate: undefined })} aria-label="Add role">
          Add role
        </Button>
      </div>
    </div>
  );
};
