import React from 'react';

import { TextLink } from '@grafana/ui';

type InfoLinkProps = React.ComponentProps<typeof TextLink> & {
  target?: string;
  rel?: string;
  children: React.ReactNode;
};

export const InfoLink: React.FC<InfoLinkProps> = ({ href, children, target, rel, ...props }) => {
  const CustomLink: any = TextLink;
  return (
    <CustomLink href={href} target={target} rel={rel} {...props}>
      {children}
    </CustomLink>
  );
};
