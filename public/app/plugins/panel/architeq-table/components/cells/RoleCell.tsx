import { css } from '@emotion/css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { CustomCellRendererProps, IconButton, useStyles2, Modal, Tooltip } from '@grafana/ui';

import { LoadingMode } from '../../constants';
import { RoleType } from '../../types';
import { useDataTableContext } from '../DataTable/DataTableContext';
import { FormFooter } from '../FormFooter';
import { RolesFieldArray } from '../RolesFieldArray';

const getStyles = () => {
  return {
    cell: css`
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      user-select: none;
    `,
    inputCell: css`
      display: flex;
      align-items: center;
      gap: 6px;
    `,
    form: css`
      display: flex;
      flex-direction: column;
      gap: 10px;
    `,
    footer: css`
      margin-top: 18px;
      display: flex;
      align-items: center;
      gap: 10px;
    `,
  };
};

type FormData = {
  roles: Array<{ role: any; rate: number }>;
};

export const RoleCell = (props: CustomCellRendererProps) => {
  const { value } = props;
  const styles = useStyles2(getStyles);
  const { loading, updateData } = useDataTableContext();

  const { currentRoles = [], availableRoles = [] } = value as RoleType;

  const [isModalOpen, setModalOpen] = useState(false);

  const mergedRoles = React.useMemo(() => {
    return currentRoles
      .map((cr) => {
        const role = availableRoles.find((ar) => ar.id === cr.roleId);
        if (role) {
          return { id: role.id, name: role.name, rate: Number(cr.rate) };
        }
        return null;
      })
      .filter((r) => r !== null) as Array<{ id: number; name: string; rate: number }>;
  }, [availableRoles, currentRoles]);

  const rolesDisplay = mergedRoles.length
    ? mergedRoles.map((role) => `${role.name}: ${role.rate}%`).join(', ')
    : 'No roles';

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      roles: mergedRoles.map((role) => ({
        role: Number(role.id),
        rate: role.rate,
      })),
    },
  });

  const handleEdit = () => {
    setModalOpen(true);
  };

  const onSave = async (data: FormData) => {
    if (!updateData) {
      return;
    }

    const totalRate = data.roles.reduce((sum, r) => sum + (Number(r.rate) || 0), 0);
    if (totalRate > 100) {
      setError('roles', { type: 'manual', message: 'Total rate cannot exceed 100%' });
      return;
    }

    const updatedRoles = data.roles.map((r) => ({
      roleId: r.role.value,
      rate: Number(r.rate),
    }));

    const isUpdated = await updateData(updatedRoles, props);
    if (isUpdated) {
      setModalOpen(false);
    }
  };

  return (
    <div className={styles.cell} onDoubleClick={handleEdit}>
      <Tooltip
        content={
          <div>
            {rolesDisplay} <br />
            Double click to edit
          </div>
        }
        placement="left"
      >
        <span>{rolesDisplay}</span>
      </Tooltip>
      <IconButton aria-label="Manage roles" size="xs" name="edit" onClick={handleEdit} />
      {isModalOpen && (
        <Modal title="Edit roles" isOpen={isModalOpen} onDismiss={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit(onSave)} className={styles.form}>
            <RolesFieldArray
              control={control}
              name="roles"
              availableRoles={availableRoles}
              loading={loading !== LoadingMode.NONE}
              errors={errors}
              setError={setError}
              clearErrors={clearErrors}
            />
            <FormFooter onClose={() => setModalOpen(false)} submitLabel="Save" />
          </form>
        </Modal>
      )}
    </div>
  );
};
