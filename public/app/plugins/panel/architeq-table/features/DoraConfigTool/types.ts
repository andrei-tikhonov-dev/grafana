export interface MetricThreshold {
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
}

export interface DoraConfigToolCreateFormData {
  technicalServiceName: string;
  bitbucketProjectKey: string;
  bitbucketRepositorySlug: string;
  splunkProjectTags: string;
}
