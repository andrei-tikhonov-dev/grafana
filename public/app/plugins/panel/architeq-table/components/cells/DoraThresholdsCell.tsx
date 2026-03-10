import { css } from '@emotion/css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { GrafanaTheme2 } from '@grafana/data';
import { Button, CustomCellRendererProps, Field, IconButton, Input, Modal, Tooltip, useStyles2 } from '@grafana/ui';

import { DoraThresholds, DoraThresholdsCellValue } from '../../features/DoraConfigTool/types';
import { useDataTableContext } from '../DataTable/DataTableContext';
import { FormFooter } from '../FormFooter';

const getStyles = (theme: GrafanaTheme2) => ({
  cell: css`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
  `,
  form: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  metricSection: css`
    border: 1px solid ${theme.colors.border.weak};
    border-radius: ${theme.shape.radius.default};
    padding: 12px;
  `,
  metricTitle: css`
    font-weight: ${theme.typography.fontWeightMedium};
    margin-bottom: 8px;
  `,
  metricFields: css`
    display: flex;
    gap: 12px;
  `,
  resetButton: css`
    align-self: flex-start;
  `,
});

type FormData = DoraThresholds;

const METRIC_CONFIG = [
  {
    key: 'deploymentFrequency' as const,
    label: 'Deployment Frequency (deploys/day, higher is better)',
    higherIsBetter: true,
  },
  { key: 'leadTime' as const, label: 'Lead Time (days, lower is better)', higherIsBetter: false },
  {
    key: 'changeFailureRate' as const,
    label: 'Change Failure Rate (ratio 0-1, lower is better)',
    higherIsBetter: false,
  },
  { key: 'timeToRestore' as const, label: 'Time to Restore (days, lower is better)', higherIsBetter: false },
];

function isCustomThresholds(
  thresholds: DoraThresholds | Record<string, never>,
  defaultThresholds: DoraThresholds
): boolean {
  if (Object.keys(thresholds).length === 0) {
    return false;
  }

  const t = thresholds as DoraThresholds;

  return METRIC_CONFIG.some(({ key }) => {
    const metric = t[key];
    const defaultMetric = defaultThresholds[key];

    if (!metric) {
      return false;
    }

    return (
      (metric.low !== undefined && metric.low !== defaultMetric.low) ||
      (metric.medium !== undefined && metric.medium !== defaultMetric.medium) ||
      (metric.high !== undefined && metric.high !== defaultMetric.high) ||
      (metric.elite !== undefined && metric.elite !== defaultMetric.elite)
    );
  });
}

export const DoraThresholdsCell = (props: CustomCellRendererProps) => {
  const { value } = props;
  const styles = useStyles2(getStyles);
  const { updateData } = useDataTableContext();

  const { thresholds, defaultThresholds } = value as DoraThresholdsCellValue;

  const hasCustomThresholds = isCustomThresholds(thresholds, defaultThresholds);
  const displayText = hasCustomThresholds ? 'Custom thresholds' : 'Default';

  const [isModalOpen, setModalOpen] = useState(false);

  const currentThresholds = hasCustomThresholds ? thresholds : defaultThresholds;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: currentThresholds,
  });

  const handleEdit = () => {
    reset(currentThresholds);
    setModalOpen(true);
  };

  const onSave = async (data: FormData) => {
    if (!updateData) {
      return;
    }

    const thresholdsPayload: DoraThresholds = {
      deploymentFrequency: {
        low: Number(data.deploymentFrequency.low),
        medium: Number(data.deploymentFrequency.medium),
        high: Number(data.deploymentFrequency.high),
        elite: Number(data.deploymentFrequency.elite),
      },
      leadTime: {
        low: Number(data.leadTime.low),
        medium: Number(data.leadTime.medium),
        high: Number(data.leadTime.high),
        elite: Number(data.leadTime.elite),
      },
      changeFailureRate: {
        low: Number(data.changeFailureRate.low),
        medium: Number(data.changeFailureRate.medium),
        high: Number(data.changeFailureRate.high),
        elite: Number(data.changeFailureRate.elite),
      },
      timeToRestore: {
        low: Number(data.timeToRestore.low),
        medium: Number(data.timeToRestore.medium),
        high: Number(data.timeToRestore.high),
        elite: Number(data.timeToRestore.elite),
      },
    };

    const isUpdated = await updateData(thresholdsPayload, props);
    if (isUpdated) {
      setModalOpen(false);
    }
  };

  const handleResetToDefaults = () => {
    reset(defaultThresholds);
  };

  const validateMetric = (metricKey: keyof FormData, higherIsBetter: boolean) => ({
    low: {
      required: 'Required',
      valueAsNumber: true,
      min: { value: 0, message: 'Must be positive' },
      validate: (val: number, formValues: FormData) => {
        const v = Number(val);
        const m = Number(formValues[metricKey].medium);
        if (higherIsBetter) {
          return v <= m || 'Low must be <= Medium';
        }
        return v >= m || 'Low must be >= Medium';
      },
    },
    medium: {
      required: 'Required',
      valueAsNumber: true,
      min: { value: 0, message: 'Must be positive' },
      validate: (val: number, formValues: FormData) => {
        const v = Number(val);
        const h = Number(formValues[metricKey].high);
        if (higherIsBetter) {
          return v <= h || 'Medium must be <= High';
        }
        return v >= h || 'Medium must be >= High';
      },
    },
    high: {
      required: 'Required',
      valueAsNumber: true,
      min: { value: 0, message: 'Must be positive' },
      validate: (val: number, formValues: FormData) => {
        const v = Number(val);
        const e = Number(formValues[metricKey].elite);
        if (higherIsBetter) {
          return v <= e || 'High must be <= Elite';
        }
        return v >= e || 'High must be >= Elite';
      },
    },
    elite: {
      required: 'Required',
      valueAsNumber: true,
      min: { value: 0, message: 'Must be positive' },
    },
  });

  return (
    <div className={styles.cell} onDoubleClick={handleEdit}>
      <Tooltip
        content={
          <div>
            {displayText} <br />
            Double click to edit
          </div>
        }
        placement="left"
      >
        <span>{displayText}</span>
      </Tooltip>
      <IconButton aria-label="Edit thresholds" size="xs" name="edit" onClick={handleEdit} />
      {isModalOpen && (
        <Modal title="Edit DORA Thresholds" isOpen={isModalOpen} onDismiss={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit(onSave)} className={styles.form}>
            {METRIC_CONFIG.map(({ key, label, higherIsBetter }) => {
              const rules = validateMetric(key, higherIsBetter);
              const metricErrors = errors[key];

              return (
                <div key={key} className={styles.metricSection}>
                  <div className={styles.metricTitle}>{label}</div>
                  <div className={styles.metricFields}>
                    <Field label="Low" invalid={!!metricErrors?.low} error={metricErrors?.low?.message as string}>
                      <Input type="number" step="any" {...register(`${key}.low`, rules.low)} />
                    </Field>
                    <Field
                      label="Medium"
                      invalid={!!metricErrors?.medium}
                      error={metricErrors?.medium?.message as string}
                    >
                      <Input type="number" step="any" {...register(`${key}.medium`, rules.medium)} />
                    </Field>
                    <Field label="High" invalid={!!metricErrors?.high} error={metricErrors?.high?.message as string}>
                      <Input type="number" step="any" {...register(`${key}.high`, rules.high)} />
                    </Field>
                    <Field
                      label="Elite"
                      invalid={!!metricErrors?.elite}
                      error={metricErrors?.elite?.message as string}
                    >
                      <Input type="number" step="any" {...register(`${key}.elite`, rules.elite)} />
                    </Field>
                  </div>
                </div>
              );
            })}

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleResetToDefaults}
              className={styles.resetButton}
            >
              Reset to defaults
            </Button>

            <FormFooter onClose={() => setModalOpen(false)} submitLabel="Save" />
          </form>
        </Modal>
      )}
    </div>
  );
};
