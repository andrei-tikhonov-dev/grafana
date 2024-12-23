import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as MdIcons from 'react-icons/md';

const iconSets = {
  fa: FaIcons,
  fa6: Fa6Icons,
  md: MdIcons,
};

type Props = {
  iconName: string;
};

export const DynamicIcon = ({ iconName }: Props) => {
  if (!iconName) {
    return null;
  }

  const [iconPrefix, iconActualName] = iconName.split('/');

  if (!iconPrefix || !iconActualName) {
    console.error(`Invalid icon name format: ${iconName}`);
    return null;
  }

  // @ts-ignore
  const IconSet = iconSets[iconPrefix];

  if (!IconSet) {
    console.error(`Icon set ${iconPrefix} not found`);
    return null;
  }

  const IconComponent = IconSet[iconActualName];

  if (!IconComponent) {
    console.error(`Icon ${iconActualName} not found in ${iconPrefix}`);
    return null;
  }

  return <IconComponent />;
};
