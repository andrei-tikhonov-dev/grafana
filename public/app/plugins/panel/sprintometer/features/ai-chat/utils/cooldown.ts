const COOLDOWN_THRESHOLD = 5;
const STORAGE_KEY_PREFIX = 'sprintometer-banner-cooldown';

interface CooldownEntry {
  count: number;
}

/**
 * Builds the shared chat scope identifier.
 * Used to scope message history, cooldown, and other per-scope state.
 */
export function createChatScopeId(userId: string, teamId: string, boardType: string, project: string): string {
  return `${userId}-${teamId}-${boardType}-${project}`;
}

/**
 * Creates a localStorage key for banner cooldown tracking.
 */
export function createCooldownKey(userId: string, teamId: string, boardType: string, project: string): string {
  return `${STORAGE_KEY_PREFIX}-${createChatScopeId(userId, teamId, boardType, project)}`;
}

function getEntry(key: string): CooldownEntry | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as CooldownEntry;
  } catch {
    return null;
  }
}

function setEntry(key: string, entry: CooldownEntry): void {
  localStorage.setItem(key, JSON.stringify(entry));
}

/**
 * Returns true if the banner should be shown — either no entry exists
 * or the interaction count has reached/exceeded the cooldown threshold.
 */
export function isBannerEligible(key: string): boolean {
  const entry = getEntry(key);
  if (!entry) {
    return true;
  }
  return entry.count >= COOLDOWN_THRESHOLD;
}

/**
 * Records a banner interaction (e.g., dismissal).
 * Increments the counter, or resets to 0 if at/above the threshold.
 */
export function recordBannerInteraction(key: string): void {
  const entry = getEntry(key);

  if (!entry) {
    setEntry(key, { count: 1 });
    return;
  }

  if (entry.count >= COOLDOWN_THRESHOLD) {
    setEntry(key, { count: 0 });
    return;
  }

  setEntry(key, { count: entry.count + 1 });
}
