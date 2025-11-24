import { css } from '@emotion/css';
import * as React from 'react';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../../components/shadcn/hover-card';
import { theme3 } from '../../../theme';

const containerStyles = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme3.tailwind.spacing8};
  font-family: ${theme3.tailwind.fontSans};
`;

const titleStyles = css`
  font-size: ${theme3.tailwind.text3xl};
  font-weight: ${theme3.tailwind.fontWeightBold};
  color: ${theme3.shadcn.foreground};
  margin-bottom: ${theme3.tailwind.spacing8};
`;

const examplesGridStyles = css`
  display: grid;
  gap: ${theme3.tailwind.spacing8};
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const exampleCardStyles = css`
  background-color: ${theme3.custom.colorCard};
  border: ${theme3.custom.border};
  border-radius: ${theme3.tailwind.radiusLg};
  padding: ${theme3.tailwind.spacing8};
`;

const exampleTitleStyles = css`
  font-size: ${theme3.tailwind.textLg};
  font-weight: ${theme3.tailwind.fontWeightSemibold};
  color: ${theme3.shadcn.foreground};
  margin-bottom: ${theme3.tailwind.spacing4};
`;

const triggerStyles = css`
  color: ${theme3.custom.colorLink};
  font-weight: ${theme3.tailwind.fontWeightMedium};
  cursor: pointer;
  text-decoration: underline;
  transition: color ${theme3.custom.transitionDurationNormal};

  &:hover {
    color: ${theme3.custom.colorPrimary};
  }
`;

const avatarStyles = css`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${theme3.shadcn.primary};
  color: ${theme3.shadcn.primaryForeground};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme3.tailwind.textXl};
  font-weight: ${theme3.tailwind.fontWeightBold};
  margin-bottom: ${theme3.tailwind.spacing4};
`;

const cardNameStyles = css`
  font-size: ${theme3.tailwind.textBase};
  font-weight: ${theme3.tailwind.fontWeightSemibold};
  color: ${theme3.shadcn.foreground};
  margin-bottom: ${theme3.tailwind.spacing2};
`;

const cardDescriptionStyles = css`
  font-size: ${theme3.tailwind.textSm};
  color: ${theme3.shadcn.mutedForeground};
  line-height: ${theme3.tailwind.leadingRelaxed};
`;

const statsStyles = css`
  display: flex;
  gap: ${theme3.tailwind.spacing4};
  margin-top: ${theme3.tailwind.spacing4};
  padding-top: ${theme3.tailwind.spacing4};
  border-top: ${theme3.custom.border};
`;

const statItemStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${theme3.tailwind.spacing};
`;

const statLabelStyles = css`
  font-size: ${theme3.tailwind.textXs};
  color: ${theme3.shadcn.mutedForeground};
  text-transform: uppercase;
  letter-spacing: ${theme3.tailwind.trackingWide};
`;

const statValueStyles = css`
  font-size: ${theme3.tailwind.textBase};
  font-weight: ${theme3.tailwind.fontWeightSemibold};
  color: ${theme3.shadcn.foreground};
`;

const productImageStyles = css`
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, ${theme3.custom.colorPrimary}, ${theme3.custom.colorSecondary});
  border-radius: ${theme3.tailwind.radiusMd};
  margin-bottom: ${theme3.tailwind.spacing4};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme3.shadcn.primaryForeground};
  font-size: ${theme3.tailwind.text4xl};
`;

const priceStyles = css`
  font-size: ${theme3.tailwind.text2xl};
  font-weight: ${theme3.tailwind.fontWeightBold};
  color: ${theme3.custom.colorPrimary};
  margin-top: ${theme3.tailwind.spacing4};
`;

const badgeStyles = css`
  display: inline-block;
  padding: ${theme3.tailwind.spacing} ${theme3.tailwind.spacing2};
  background-color: ${theme3.custom.colorStatusOnTrackBackground};
  color: ${theme3.custom.colorStatusOnTrack};
  border-radius: ${theme3.tailwind.radiusMd};
  font-size: ${theme3.tailwind.textXs};
  font-weight: ${theme3.tailwind.fontWeightMedium};
  margin-top: ${theme3.tailwind.spacing2};
`;

const definitionTitleStyles = css`
  font-size: ${theme3.tailwind.textLg};
  font-weight: ${theme3.tailwind.fontWeightBold};
  color: ${theme3.shadcn.foreground};
  margin-bottom: ${theme3.tailwind.spacing2};
`;

const definitionTextStyles = css`
  font-size: ${theme3.tailwind.textSm};
  color: ${theme3.shadcn.foreground};
  line-height: ${theme3.tailwind.leadingRelaxed};
  margin-bottom: ${theme3.tailwind.spacing4};
`;

const exampleTextStyles = css`
  font-size: ${theme3.tailwind.textSm};
  color: ${theme3.shadcn.mutedForeground};
  font-style: italic;
  padding: ${theme3.tailwind.spacing2};
  background-color: ${theme3.shadcn.muted};
  border-radius: ${theme3.tailwind.radiusSm};
  border-left: 3px solid ${theme3.custom.colorPrimary};
`;

export function HoverCardExamples() {
  return (
    <div className={containerStyles}>
      <h1 className={titleStyles}>HoverCard Examples</h1>

      <div className={examplesGridStyles}>
        <div className={exampleCardStyles}>
          <h2 className={exampleTitleStyles}>User Profile</h2>
          <p className={cardDescriptionStyles}>
            Hover over the{' '}
            <HoverCard>
              <HoverCardTrigger>
                <span className={triggerStyles}>@johndoe</span>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className={avatarStyles}>JD</div>
                <div className={cardNameStyles}>John Doe</div>
                <div className={cardDescriptionStyles}>
                  Senior Frontend Developer with 10+ years of experience in React, TypeScript, and modern web
                  technologies.
                </div>
                <div className={statsStyles}>
                  <div className={statItemStyles}>
                    <span className={statLabelStyles}>Followers</span>
                    <span className={statValueStyles}>1.2K</span>
                  </div>
                  <div className={statItemStyles}>
                    <span className={statLabelStyles}>Following</span>
                    <span className={statValueStyles}>342</span>
                  </div>
                  <div className={statItemStyles}>
                    <span className={statLabelStyles}>Posts</span>
                    <span className={statValueStyles}>89</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>{' '}
            username to see their profile information.
          </p>
        </div>

        <div className={exampleCardStyles}>
          <h2 className={exampleTitleStyles}>Product Details</h2>
          <p className={cardDescriptionStyles}>
            Check out our{' '}
            <HoverCard>
              <HoverCardTrigger>
                <span className={triggerStyles}>Premium Package</span>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className={productImageStyles}>📦</div>
                <div className={cardNameStyles}>Premium Package</div>
                <div className={cardDescriptionStyles}>
                  Get access to all premium features including advanced analytics, priority support, and unlimited
                  projects.
                </div>
                <div className={priceStyles}>$49/month</div>
                <div className={badgeStyles}>Most Popular</div>
              </HoverCardContent>
            </HoverCard>{' '}
            for more information about pricing and features.
          </p>
        </div>

        <div className={exampleCardStyles}>
          <h2 className={exampleTitleStyles}>Term Definition</h2>
          <p className={cardDescriptionStyles}>
            Understanding{' '}
            <HoverCard>
              <HoverCardTrigger>
                <span className={triggerStyles}>SOLID principles</span>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className={definitionTitleStyles}>SOLID Principles</div>
                <div className={definitionTextStyles}>
                  A set of five design principles intended to make object-oriented software more understandable,
                  flexible, and maintainable.
                </div>
                <div className={exampleTextStyles}>
                  S - Single Responsibility Principle
                  <br />
                  O - Open/Closed Principle
                  <br />
                  L - Liskov Substitution Principle
                  <br />
                  I - Interface Segregation Principle
                  <br />D - Dependency Inversion Principle
                </div>
              </HoverCardContent>
            </HoverCard>{' '}
            is essential for writing clean, maintainable code.
          </p>
        </div>
      </div>
    </div>
  );
}
