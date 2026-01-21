import { SendMetricChatMessageBoardTypeEnum, SendMetricChatMessageMetricNameEnum } from '@architeq/core-api-client';
import React from 'react';

import { Drawer } from '@grafana/ui';

import { AiChatClient, AiChatStrings } from '../api/types';
import { useAiChatStore } from '../store/aiChatStore';

import { AIChatController } from './AIChatController';

interface Props {
  teamId: string;
  project: string;
  dashboard?: SendMetricChatMessageBoardTypeEnum;
  metric?: SendMetricChatMessageMetricNameEnum;
  client: AiChatClient;
  thinkingStages: string[];
  feedbackReasons: { up: string[]; down: string[] };
  strings: AiChatStrings;
  startPrompts: string[];
  drawerId: string;
  instanceId: string;
}

export const AIChatDrawerShell: React.FC<Props> = (props) => {
  const { activeDrawerId, close } = useAiChatStore();
  const { strings, drawerId, instanceId } = props;

  const isOpen = activeDrawerId === drawerId;

  if (!isOpen) {
    return null;
  }

  return (
    <Drawer title={strings.drawerTitle} onClose={close} size="md">
      <AIChatController {...props} instanceId={instanceId} />
    </Drawer>
  );
};
