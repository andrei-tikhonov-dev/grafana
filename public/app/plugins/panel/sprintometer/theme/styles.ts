import { css } from '@emotion/css';

import { theme3 } from './theme';

const fontFamilyStyle = css`
  font-family: 'Inter', 'Helvetica', 'Arial', sans-serif;
`;

export const typographyStyles = {
  dashboardTitle: css`
    font-weight: 400;
    font-size: 28px;
    line-height: 32px;
    ${fontFamilyStyle}
  `,
  panelTitle: css`
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    ${fontFamilyStyle}
  `,
  title: css`
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    ${fontFamilyStyle}
  `,
  h1: css`
    font-weight: 400;
    font-size: 28px;
    line-height: 32px;
    ${fontFamilyStyle}
  `,
  h2: css`
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    ${fontFamilyStyle}
  `,
  h3: css`
    font-weight: 400;
    font-size: 22px;
    line-height: 24px;
    ${fontFamilyStyle}
  `,
  h4: css`
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    ${fontFamilyStyle}
  `,
  h4Bold: css`
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    ${fontFamilyStyle}
  `,
  h5: css`
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    ${fontFamilyStyle}
  `,
  h5Bold: css`
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    ${fontFamilyStyle}
  `,
  h6: css`
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    ${fontFamilyStyle}
  `,
  body: css`
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    ${fontFamilyStyle}
  `,
  bodyBold: css`
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    ${fontFamilyStyle}
  `,
  code: css`
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    ${fontFamilyStyle}
  `,
  bodySmall: css`
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    ${fontFamilyStyle}
  `,
};

export const bordersStyles = css`
  border: ${theme3.custom.border};
`;

export const roundedBordersStyles = css`
  border-radius: ${theme3.tailwind.radiusSm};
  ${bordersStyles}
`;

export const panelContainerStyles = css`
  padding: 10px;
`;

const statusBaseStyles = css`
  border-width: 1px;
  border-style: solid;
  border-radius: ${theme3.tailwind.radiusSm};
`;

export const statusStyles = {
  default: css`
    color: ${theme3.custom.colorStatusDefault};
    background-color: ${theme3.custom.colorStatusDefaultBackground};
    border-color: ${theme3.custom.colorStatusDefaultBorder};
    ${statusBaseStyles}
  `,
  onTrack: css`
    color: ${theme3.custom.colorStatusOnTrack};
    background-color: ${theme3.custom.colorStatusOnTrackBackground};
    border-color: ${theme3.custom.colorStatusOnTrackBorder};
    ${statusBaseStyles}
  `,
  needsAttention: css`
    color: ${theme3.custom.colorStatusNeedsAttention};
    background-color: ${theme3.custom.colorStatusNeedsAttentionBackground};
    border-color: ${theme3.custom.colorStatusNeedsAttentionBorder};
    ${statusBaseStyles}
  `,
  highRisk: css`
    color: ${theme3.custom.colorStatusHighRisk};
    background-color: ${theme3.custom.colorStatusHighRiskBackground};
    border-color: ${theme3.custom.colorStatusHighRiskBorder};
    ${statusBaseStyles}
  `,
};
