import { css } from '@emotion/css';
import {
  FileText,
  Bug,
  Zap,
  Target,
  Layers,
  Flag,
  AlertCircle,
  User,
  Calendar,
  Users,
  GitBranch,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';

import { Drawer } from '@grafana/ui';

import { Badge } from '../../../components/shadcn/badge';
import { UiButton, UiAvatar } from '../../../components/ui';
import { theme3 } from '../../../theme/theme';
import { MIssue } from '../types';

interface ShowMoreProps {
  issue: MIssue;
  buttonText?: string;
  className?: string;
}

const headerStyles = css`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const titleStyles = css`
  font-size: ${theme3.tailwind.text2xl};
  font-weight: ${theme3.tailwind.fontWeightBold};
  color: ${theme3.shadcn.foreground};
  margin-bottom: 1.5rem;
  line-height: 1.3;
`;

const contentContainerStyles = css`
  padding: 1.5rem;
`;

const aiInsightsStyles = css`
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: ${theme3.tailwind.radiusLg};
  padding: 1.25rem;
  margin-bottom: 1.5rem;
`;

const aiHeaderStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #8b5cf6;
  font-size: ${theme3.tailwind.textSm};
  font-weight: ${theme3.tailwind.fontWeightMedium};
  margin-bottom: 0.75rem;
`;

const confidenceStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  font-size: ${theme3.tailwind.textSm};
`;

const confidenceBarStyles = css`
  width: 24px;
  height: 6px;
  background-color: rgba(139, 92, 246, 0.2);
  border-radius: 3px;
  overflow: hidden;
`;

const confidenceProgressStyles = (confidence: number) => css`
  width: ${confidence}%;
  height: 100%;
  background-color: #10b981;
`;

const insightTextStyles = css`
  color: ${theme3.shadcn.foreground};
  font-size: ${theme3.tailwind.textSm};
  line-height: ${theme3.tailwind.leadingRelaxed};
  margin-bottom: 1rem;
`;

const suggestedActionStyles = css`
  background-color: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: ${theme3.tailwind.radiusMd};
  padding: 1rem;
`;

const actionHeaderStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #10b981;
  font-size: ${theme3.tailwind.textSm};
  font-weight: ${theme3.tailwind.fontWeightMedium};
  margin-bottom: 0.5rem;
`;

const actionTextStyles = css`
  color: ${theme3.shadcn.foreground};
  font-size: ${theme3.tailwind.textSm};
  line-height: ${theme3.tailwind.leadingRelaxed};
`;

const sectionStyles = css`
  margin-bottom: 1.5rem;
`;

const sectionHeaderStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${theme3.tailwind.textBase};
  font-weight: ${theme3.tailwind.fontWeightSemibold};
  color: ${theme3.shadcn.foreground};
  margin-bottom: 1rem;
`;

const infoGridStyles = css`
  display: grid;
  gap: 1rem;
`;

const infoRowStyles = css`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 32px;
`;

const infoLabelStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 140px;
  font-size: ${theme3.tailwind.textSm};
  color: ${theme3.shadcn.mutedForeground};
`;

const infoValueStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${theme3.tailwind.textSm};
  color: ${theme3.shadcn.foreground};
`;

const userStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const dependencyContainerStyles = css`
  margin-top: 0.75rem;
`;

const dependencyHeaderStyles = css`
  font-size: ${theme3.tailwind.textSm};
  font-weight: ${theme3.tailwind.fontWeightMedium};
  color: ${theme3.shadcn.foreground};
  margin-bottom: 0.75rem;
`;

const dependencyCardStyles = css`
  background-color: ${theme3.shadcn.card};
  border: 1px solid ${theme3.shadcn.border};
  border-radius: ${theme3.tailwind.radiusMd};
  padding: 1rem;
  margin-bottom: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme3.shadcn.primary};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

const dependencyTitleStyles = css`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

const dependencyKeyStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.5rem;
  background-color: ${theme3.shadcn.muted};
  color: ${theme3.shadcn.foreground};
  border-radius: ${theme3.tailwind.radiusSm};
  font-size: ${theme3.tailwind.textXs};
  font-weight: ${theme3.tailwind.fontWeightMedium};
`;

const dependencySummaryStyles = css`
  flex: 1;
  font-size: ${theme3.tailwind.textSm};
  color: ${theme3.shadcn.foreground};
  line-height: 1.4;
`;

const dependencyStatusStyles = css`
  margin-left: auto;
`;

const footerStyles = css`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid ${theme3.shadcn.border};
`;

// Helper functions
const getIssueTypeIcon = (type: string) => {
  const iconProps = { size: 18 };
  switch (type.toLowerCase()) {
    case 'bug':
      return <Bug {...iconProps} />;
    case 'story':
      return <FileText {...iconProps} />;
    case 'task':
      return <CheckCircle {...iconProps} />;
    case 'epic':
      return <Layers {...iconProps} />;
    case 'feature':
      return <Zap {...iconProps} />;
    case 'capability':
      return <Target {...iconProps} />;
    case 'objective':
      return <Flag {...iconProps} />;
    default:
      return <FileText {...iconProps} />;
  }
};

const formatDate = (date?: string) => {
  if (!date) {
    return 'Not set';
  }
  try {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return date;
  }
};

export function ShowMore({ issue, buttonText = 'Show more', className }: ShowMoreProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Separate internal and external dependencies
  const internalDependencies =
    issue.dependencies?.filter((dep) => dep.ownerTeam?.art?.id === issue.ownerTeam?.art?.id) || [];

  const externalDependencies =
    issue.dependencies?.filter((dep) => dep.ownerTeam?.art?.id !== issue.ownerTeam?.art?.id) || [];

  return (
    <>
      <UiButton size="sm" onClick={handleOpen} className={className}>
        {buttonText}
      </UiButton>

      {isOpen && (
        <Drawer title="" onClose={handleClose}>
          <div className={contentContainerStyles}>
            {/* Header */}
            <div className={headerStyles}>
              <Badge>
                {getIssueTypeIcon(issue.issueType?.type || 'story')}
                <span>{issue.issueKey}</span>
              </Badge>
            </div>

            {/* Title */}
            <h2 className={titleStyles}>{issue.summary}</h2>

            {/* AI Insights */}
            {issue.sprintometerData?.info && (
              <div className={aiInsightsStyles}>
                <div className={aiHeaderStyles}>
                  <Sparkles size={16} />
                  <span>AI insights</span>
                  <div className={confidenceStyles}>
                    <span>Confidence:</span>
                    <div className={confidenceBarStyles}>
                      <div className={confidenceProgressStyles(issue.sprintometerData.info.confidence || 0)} />
                    </div>
                    <span>
                      {issue.sprintometerData.info.confidence >= 80
                        ? 'High'
                        : issue.sprintometerData.info.confidence >= 50
                          ? 'Medium'
                          : 'Low'}
                      {` (${issue.sprintometerData.info.confidence}%)`}
                    </span>
                  </div>
                </div>

                <div className={insightTextStyles}>{issue.sprintometerData.info.insights}</div>

                <div className={suggestedActionStyles}>
                  <div className={actionHeaderStyles}>
                    <CheckCircle size={16} />
                    <span>Suggested action</span>
                  </div>
                  <div className={actionTextStyles}>{issue.sprintometerData.info.action || 'No action needed.'}</div>
                </div>
              </div>
            )}

            {/* General Information */}
            <div className={sectionStyles}>
              <div className={sectionHeaderStyles}>
                <AlertCircle size={18} />
                <span>General information</span>
              </div>

              <div className={infoGridStyles}>
                <div className={infoRowStyles}>
                  <div className={infoLabelStyles}>
                    <Zap size={16} />
                    <span>Status:</span>
                  </div>
                  <div className={infoValueStyles}>
                    <Badge variant="secondary">{issue.status}</Badge>
                  </div>
                </div>

                {issue.plannedPi && (
                  <div className={infoRowStyles}>
                    <div className={infoLabelStyles}>
                      <Target size={16} />
                      <span>Planned PI:</span>
                    </div>
                    <Badge variant="secondary">{issue.plannedPi.name}</Badge>
                  </div>
                )}

                <div className={infoRowStyles}>
                  <div className={infoLabelStyles}>
                    <Calendar size={16} />
                    <span>Start date:</span>
                  </div>
                  <div className={infoValueStyles}>{formatDate(issue.startDate)}</div>
                </div>

                <div className={infoRowStyles}>
                  <div className={infoLabelStyles}>
                    <Users size={16} />
                    <span>Owning team:</span>
                  </div>
                  <div className={infoValueStyles}>
                    <Badge variant="secondary">{issue.ownerTeam?.name}</Badge>
                  </div>
                </div>

                <div className={infoRowStyles}>
                  <div className={infoLabelStyles}>
                    <User size={16} />
                    <span>Assignee:</span>
                  </div>
                  <div className={infoValueStyles}>
                    <div className={userStyles}>
                      {issue.assignee && <UiAvatar user={issue.assignee} />}
                      <span>{issue.assignee?.name || 'Unassigned'}</span>
                    </div>
                  </div>
                </div>

                <div className={infoRowStyles}>
                  <div className={infoLabelStyles}>
                    <AlertCircle size={16} />
                    <span>Priority:</span>
                  </div>
                  <div className={infoValueStyles}>
                    <Badge variant="secondary">
                      {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Dependencies */}
            {issue.dependencies && issue.dependencies.length > 0 && (
              <div className={sectionStyles}>
                <div className={sectionHeaderStyles}>
                  <GitBranch size={18} />
                  <span>Dependency ({issue.dependencies.length})</span>
                </div>

                {/* Internal Dependencies */}
                {internalDependencies.length > 0 && (
                  <div className={dependencyContainerStyles}>
                    <div className={dependencyHeaderStyles}>Internal dependencies ({internalDependencies.length})</div>
                    {internalDependencies.map((dep) => (
                      <div key={dep.id} className={dependencyCardStyles}>
                        <div className={dependencyTitleStyles}>
                          <div className={dependencyKeyStyles}>
                            {getIssueTypeIcon(dep.issueType?.type || 'story')}
                            <span>{dep.issueKey}</span>
                          </div>
                          <div className={dependencySummaryStyles}>{dep.summary}</div>
                          <div className={dependencyStatusStyles}>
                            <Badge>{dep.status}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* External Dependencies */}
                {externalDependencies.length > 0 && (
                  <div className={dependencyContainerStyles}>
                    <div className={dependencyHeaderStyles}>External dependencies ({externalDependencies.length})</div>
                    {externalDependencies.map((dep) => (
                      <div key={dep.id} className={dependencyCardStyles}>
                        <div className={dependencyTitleStyles}>
                          <div className={dependencyKeyStyles}>
                            {getIssueTypeIcon(dep.issueType?.type || 'story')}
                            <span>{dep.issueKey}</span>
                          </div>
                          <div className={dependencySummaryStyles}>{dep.summary}</div>
                          <div className={dependencyStatusStyles}>
                            <Badge>{dep.status}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={footerStyles}>
            <UiButton variant="secondary" onClick={handleClose}>
              Close
            </UiButton>
          </div>
        </Drawer>
      )}
    </>
  );
}
