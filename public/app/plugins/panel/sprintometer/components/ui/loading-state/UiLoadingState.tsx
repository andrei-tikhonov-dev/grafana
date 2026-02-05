import { css } from '@emotion/css';
import { Loader2 } from 'lucide-react';
import React from 'react';

const styles = {
  container: css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 8px;
  `,
  spinner: css`
    animation: spin 1s linear infinite;
    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  `,
};

/**
 * Loading state component displayed while API configuration is being fetched.
 */
export const UiLoadingState: React.FC = () => (
  <div className={styles.container}>
    <Loader2 size={20} className={styles.spinner} />
    <span>Loading API configuration...</span>
  </div>
);
