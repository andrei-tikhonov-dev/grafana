import { Configuration } from '@architeq/core-api-client';

const DEFAULT_BASE_PATH = 'http://localhost:8080';

/**
 * Validates that Configuration has basePath set.
 * Logs warning if using default fallback.
 *
 * @param config - The Configuration instance to validate
 * @param clientName - Name of the client for logging purposes
 */
export function validateConfiguration(config: Configuration, clientName: string): void {
  if (!config.basePath || config.basePath === DEFAULT_BASE_PATH) {
    console.warn(
      `[${clientName}] Configuration basePath is undefined or default. Requests may fail or use wrong endpoint.`
    );
  }
}
