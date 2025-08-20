import { ESprintometerStatus } from '../../types';

export const customTheme = {
  pbColorZebra: '#FBF8F7',
  pbColorCardDefault: '#CBC6C6',
  pbColorCardOnTrack: '#0E8056',
  pbColorCardNeedAttention: '#FEDA7F',
  pbColorCardWarning: '#FDCED4',
};

export const cardColors = {
  [ESprintometerStatus.Default]: customTheme.pbColorCardDefault,
  [ESprintometerStatus.OnTrack]: customTheme.pbColorCardDefault,
  [ESprintometerStatus.NeedAttention]: customTheme.pbColorCardNeedAttention,
  [ESprintometerStatus.Warning]: customTheme.pbColorCardWarning,
};
