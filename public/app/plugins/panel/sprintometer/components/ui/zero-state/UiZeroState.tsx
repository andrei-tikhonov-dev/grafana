import { css, cx } from '@emotion/css';
import React from 'react';

import { TZeroState } from '../../../types';
import { UiButton } from '../button/UiButton';
import { UiVerticalGroup } from '../group/UiVerticalGroup';
import { UiTypography } from '../typography/UiTypography';

export interface UiZeroStateProps extends TZeroState {
  className?: string | undefined;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const DefaultIcon = () => (
  <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.512 16.6585C22.9976 10.1313 21.1406 6.04049 25.5785 3.0184C32.4067 -1.63186 45.1506 2.36897 52.6691 8.76519C61.8776 16.5991 66.6286 30.9026 61.2165 43.8428C55.4526 57.6234 40.2878 64.7771 26.7557 62.6213C14.6716 60.6958 2.79248 51.1719 1.60236 39.7496C1.47325 38.5115 0.903951 31.8189 4.89822 26.0487C8.19983 21.2793 11.371 21.8323 16.512 16.6582V16.6585Z"
      fill="#0499D8"
      fillOpacity="0.12"
    />
    <rect x="8.5" y="15.5" width="51" height="36" rx="2" fill="#EE522E" />
    <rect x="6" y="13" width="51" height="36" rx="2" fill="white" />
    <path d="M6 15C6 13.8954 6.89543 13 8 13H55C56.1046 13 57 13.8954 57 15V18H6V15Z" fill="#6634FA" />
    <path
      d="M8.41017 16.9068C9.18899 16.9068 9.82035 16.2772 9.82035 15.5005C9.82035 14.7238 9.18899 14.0942 8.41017 14.0942C7.63136 14.0942 7 14.7238 7 15.5005C7 16.2772 7.63136 16.9068 8.41017 16.9068Z"
      fill="#F74C60"
    />
    <path
      d="M12.9238 16.8127C13.7027 16.8127 14.334 16.183 14.334 15.4063C14.334 14.6296 13.7027 14 12.9238 14C12.145 14 11.5137 14.6296 11.5137 15.4063C11.5137 16.183 12.145 16.8127 12.9238 16.8127Z"
      fill="#FCB32A"
    />
    <path
      d="M17.8125 17C18.5913 17 19.2227 16.3704 19.2227 15.5937C19.2227 14.817 18.5913 14.1873 17.8125 14.1873C17.0337 14.1873 16.4023 14.817 16.4023 15.5937C16.4023 16.3704 17.0337 17 17.8125 17Z"
      fill="#2DDE69"
    />
    <rect x="9" y="20" width="13.6667" height="18" rx="2" fill="#EDE8E8" />
    <rect x="24.6665" y="20" width="13.6667" height="18" rx="2" fill="#EDE8E8" />
    <rect x="40.3335" y="20" width="13.6667" height="18" rx="2" fill="#EDE8E8" />
    <rect x="9" y="41" width="45" height="2" fill="#EDE8E8" />
    <rect x="9" y="45" width="45" height="2" fill="#EDE8E8" />
  </svg>
);

export const UiZeroState: React.FC<UiZeroStateProps> = ({ className, link, title, description, icon, children }) => {
  return (
    <UiVerticalGroup
      justify="center"
      className={cx(
        css`
          height: 100%;
        `,
        className
      )}
    >
      {icon !== undefined ? icon : <DefaultIcon />}
      <div
        className={css`
          text-align: center;
        `}
      >
        <UiTypography variant="title">{title}</UiTypography>
        <UiTypography variant="body" color="light">
          {description}
        </UiTypography>
      </div>
      {link && (
        <UiButton variant="default" asChild>
          <a href={link.url}>{link.text}</a>
        </UiButton>
      )}
      {children}
    </UiVerticalGroup>
  );
};
