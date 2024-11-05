import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

import { getDefaultTimeRange, MetricFindValue, TimeRange } from '@grafana/data';
import { BackendDataSourceResponse } from '@grafana/runtime';

import { DataSource } from './DataSource';
import { doFetch } from './doFetch';
import { ResponseParser } from './response_parser';

export class MetricFindQuery {
  range: TimeRange;
  responseParser: ResponseParser;

  constructor(
    private datasource: DataSource,
    private query: string
  ) {
    this.datasource = datasource;
    this.query = query;
    this.range = getDefaultTimeRange();
    this.responseParser = new ResponseParser();
  }

  process(timeRange: TimeRange | undefined = getDefaultTimeRange()): Promise<MetricFindValue[]> {
    return lastValueFrom(
      doFetch<BackendDataSourceResponse>(this.datasource, {
        url: `${this.datasource.url}/variable`,
        data: {
          payload: this.query,
          range: timeRange,
        },
        method: 'POST',
      }).pipe(map((response) => this.responseParser.transformMetricFindResponse(response)))
    );
  }
}
