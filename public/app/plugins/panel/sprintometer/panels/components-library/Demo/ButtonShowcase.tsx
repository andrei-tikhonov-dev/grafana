import { css, cx } from '@emotion/css';
import React from 'react';

import { UiButton } from '../../../components/ui';

const UiButtonShowcase = () => {
  const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];
  const sizes = ['sm', 'default', 'lg', 'icon'];

  const tableStyles = css`
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  `;

  const headerStyles = css`
    border: none;
    padding: 12px;
    text-align: center;
  `;

  const cellStyles = css`
    border: none;
    padding: 16px 12px;
    text-align: center;
    vertical-align: middle;
  `;

  const variantLabelStyles = css`
    font-weight: 600;
    text-align: left;
    padding-left: 16px;
  `;

  const containerStyles = css`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  `;

  const titleStyles = css`
    margin-bottom: 8px;
  `;

  const subtitleStyles = css`
    margin-bottom: 24px;
  `;

  // Simple icon for demonstration
  const StarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  return (
    <div className={containerStyles}>
      <h1 className={titleStyles}>UiButton Component Showcase</h1>
      <p className={subtitleStyles}>Demonstration of all button variants and sizes</p>

      <table className={tableStyles}>
        <thead>
          <tr>
            <th className={headerStyles}>Variant</th>
            {sizes.map((size) => (
              <th key={size} className={headerStyles}>
                {size === 'default' ? 'Default' : size.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant: any) => (
            <tr key={variant}>
              <td className={cx(cellStyles, variantLabelStyles)}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </td>
              {sizes.map((size: any) => (
                <td key={`${variant}-${size}`} className={cellStyles}>
                  {size === 'icon' ? (
                    <UiButton variant={variant} size={size}>
                      <StarIcon />
                    </UiButton>
                  ) : (
                    <UiButton variant={variant} size={size}>
                      {size === 'sm' ? 'Small' : size === 'lg' ? 'Large' : 'UiButton'}
                    </UiButton>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className={css`
          margin-top: 32px;
          padding: 16px;
          background-color: #f8fafc;
          border-radius: 8px;
        `}
      >
        <h3
          className={css`
            margin: 0 0 12px 0;
            color: #374151;
            font-size: 18px;
          `}
        >
          Additional Examples
        </h3>

        <div
          className={css`
            display: flex;
            gap: 12px;
            align-items: center;
            margin-bottom: 16px;
          `}
        >
          <span
            className={css`
              color: #6b7280;
              min-width: 120px;
            `}
          >
            With icon:
          </span>
          <UiButton variant="default" size="default">
            <StarIcon /> With Icon
          </UiButton>
          <UiButton variant="outline" size="sm">
            <StarIcon /> Small
          </UiButton>
        </div>

        <div
          className={css`
            display: flex;
            gap: 12px;
            align-items: center;
          `}
        >
          <span
            className={css`
              color: #6b7280;
              min-width: 120px;
            `}
          >
            Disabled:
          </span>
          <UiButton variant="default" disabled>
            Disabled
          </UiButton>
          <UiButton variant="destructive" disabled>
            Disabled
          </UiButton>
          <UiButton variant="outline" disabled>
            Disabled
          </UiButton>
        </div>
      </div>
    </div>
  );
};

export default UiButtonShowcase;
