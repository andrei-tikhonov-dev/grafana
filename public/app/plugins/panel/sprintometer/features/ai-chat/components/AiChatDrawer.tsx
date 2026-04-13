import React from 'react';

import { Drawer } from '@grafana/ui';

import { AiChatProvider, AiChatContextValue } from '../AiChatContext';

import { AiChatController } from './AIChatController';
import { DrawerHeader } from './DrawerHeader';

interface AiChatDrawerProps {
  contextValue: AiChatContextValue;
  instanceId: string;
  presetQueries: string[];
  onPresetSelect: (query: string) => void;
  onClose: () => void;
}

export const AiChatDrawer: React.FC<AiChatDrawerProps> = ({
  contextValue,
  instanceId,
  presetQueries,
  onPresetSelect,
  onClose,
}) => (
  <AiChatProvider value={contextValue}>
    <Drawer
      title={
        <DrawerHeader
          instanceId={instanceId}
          presetQueries={presetQueries}
          onPresetSelect={onPresetSelect}
          onClose={onClose}
        />
      }
      onClose={onClose}
      size="md"
    >
      <AiChatController />
    </Drawer>
  </AiChatProvider>
);
