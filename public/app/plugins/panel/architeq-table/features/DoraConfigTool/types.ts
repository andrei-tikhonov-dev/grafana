export interface MetricThreshold {
  low: number;
  medium: number;
  high: number;
  elite: number;
}

export interface DoraThresholds {
  deploymentFrequency: MetricThreshold;
  leadTime: MetricThreshold;
  changeFailureRate: MetricThreshold;
  timeToRestore: MetricThreshold;
}

export interface DoraThresholdsCellValue {
  thresholds: DoraThresholds | Record<string, never>;
  defaultThresholds: DoraThresholds;
}

export interface DoraConfigToolMetaType {
  custom: {
    projectId: number;
    defaultThresholds: DoraThresholds;
    defaultBugTypes?: string[];
    defaultBugPriorities?: string[];
    availableBugTypes?: string[];
    availableBugPriorities?: string[];
    availableBugComponentNames?: string[];
  };
}

export interface DoraConfigToolUpdatePayload {
  id: number;
  propertyName: string;
  value: any;
}

export interface DoraConfigToolCreatePayload {
  projectId: number;
  technicalServiceName: string;
  bitbucketProjectKey: string;
  bitbucketRepositorySlug: string;
  splunkProjectTags?: string;
  bugTypes: string[];
  bugPriorities: string[];
  bugComponentNames: string[];
}

export interface DoraConfigToolCreateFormData {
  technicalServiceName: string;
  bitbucketProjectKey: string;
  bitbucketRepositorySlug: string;
  splunkProjectTags: string;
  bugTypes: string[];
  bugPriorities: string[];
  bugComponentNames: string[];
}
