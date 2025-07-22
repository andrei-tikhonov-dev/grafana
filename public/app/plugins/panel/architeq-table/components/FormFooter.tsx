import { css } from '@emotion/css';
import React from 'react';

import { Button, useStyles2 } from '@grafana/ui';

const getStyles = () => {
  return {
    footer: css`
      margin-top: 18px;
      display: flex;
      align-items: center;
      gap: 10px;
    `,
  };
};

interface FormFooterProps {
  onClose: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

export const FormFooter: React.FC<FormFooterProps> = ({
  onClose,
  submitLabel = 'Add',
  cancelLabel = 'Cancel',
  isLoading,
}) => {
  const styles = useStyles2(getStyles);
  return (
    <div className={styles.footer}>
      <Button type="submit" disabled={isLoading} icon={isLoading ? 'spinner' : undefined}>
        {submitLabel}
      </Button>
      <Button variant="secondary" onClick={onClose}>
        {cancelLabel}
      </Button>
    </div>
  );
};
