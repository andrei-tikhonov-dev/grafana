import { css, keyframes } from '@emotion/css';
import React from 'react';

import { UiTypography, UiVerticalGroup } from '../../../components/ui';
import { theme3 } from '../../../theme';
import { AI_CHAT_COLORS } from '../utils/defaults';

interface Props {
  text: string;
}

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const styles = {
  container: css`
    padding: ${theme3.tailwind.spacing4};
  `,
  stageText: css`
    color: ${theme3.shadcn.mutedForeground};
    margin-bottom: ${theme3.tailwind.spacing4};
  `,
  skeleton: css`
    height: 8px;
    background: linear-gradient(90deg, ${AI_CHAT_COLORS.skeletonBase} 25%, ${AI_CHAT_COLORS.skeletonHighlight} 50%, ${AI_CHAT_COLORS.skeletonBase} 75%);
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s ease-in-out infinite;
    border-radius: ${theme3.tailwind.radiusXs};
  `,
  skeleton1: css`
    width: 35%;
  `,
  skeleton2: css`
    width: 50%;
  `,
  skeleton3: css`
    width: 15%;
  `,
};

export const ThinkingIndicator: React.FC<Props> = ({ text }) => {
  return (
    <div className={styles.container}>
      <UiTypography variant="body" className={styles.stageText}>
        {text}
      </UiTypography>

      <UiVerticalGroup gap="xs" align="start">
        <div className={`${styles.skeleton} ${styles.skeleton1}`} />
        <div className={`${styles.skeleton} ${styles.skeleton2}`} />
        <div className={`${styles.skeleton} ${styles.skeleton3}`} />
      </UiVerticalGroup>
    </div>
  );
};
