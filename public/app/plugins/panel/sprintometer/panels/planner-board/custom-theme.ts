import { ESprintometerStatus } from '../../types';

export const customTheme = {
  pbColorZebra: '#FBF8F7',
  pbColorCardDefault: '#CBC6C6',
  pbColorCardOnTrack: '#2DDE69',
  pbColorCardNeedAttention: '#FEDA7F',
  pbColorCardWarning: '#FDCED4',
};

export const cardColors = {
  [ESprintometerStatus.Default]: customTheme.pbColorCardDefault,
  [ESprintometerStatus.OnTrack]: customTheme.pbColorCardDefault,
  [ESprintometerStatus.NeedsAttention]: customTheme.pbColorCardNeedAttention,
  [ESprintometerStatus.HighRisk]: customTheme.pbColorCardWarning,
};

export const aiInsightsColors = {
  [ESprintometerStatus.Default]: customTheme.pbColorCardDefault,
  [ESprintometerStatus.OnTrack]: customTheme.pbColorCardOnTrack,
  [ESprintometerStatus.NeedsAttention]: customTheme.pbColorCardNeedAttention,
  [ESprintometerStatus.HighRisk]: customTheme.pbColorCardWarning,
};
