export const enum DoraConfigToolFields {
  ID = 'ID',
  TechnicalServiceName = 'Technical Service Name',
  BitbucketProjectKey = 'Bitbucket Project Key',
  BitbucketRepositorySlug = 'Bitbucket Repository Slug',
  SplunkProjectTags = 'Splunk Project Tags',
  DoraThresholds = 'DORA Thresholds',
  BugTypes = 'Bug Types',
  BugPriorities = 'Bug Priorities',
  BugComponentNames = 'Bug Component Names',
}

export const hiddenFields = [DoraConfigToolFields.ID];

export const PROPERTY_NAME_MAP: Record<string, string> = {
  [DoraConfigToolFields.TechnicalServiceName]: 'name',
  [DoraConfigToolFields.BitbucketProjectKey]: 'bitbucketProjectKey',
  [DoraConfigToolFields.BitbucketRepositorySlug]: 'bitbucketRepositorySlug',
  [DoraConfigToolFields.SplunkProjectTags]: 'splunkProjectTags',
  [DoraConfigToolFields.DoraThresholds]: 'doraThresholds',
  [DoraConfigToolFields.BugTypes]: 'bugTypes',
  [DoraConfigToolFields.BugPriorities]: 'bugPriorities',
  [DoraConfigToolFields.BugComponentNames]: 'bugComponentNames',
};
