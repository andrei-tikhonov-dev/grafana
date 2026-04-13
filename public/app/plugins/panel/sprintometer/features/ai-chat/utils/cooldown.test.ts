import { createCooldownKey, isBannerEligible, recordBannerInteraction } from './cooldown';

describe('cooldown', () => {
  let getItemSpy: jest.SpyInstance;
  let setItemSpy: jest.SpyInstance;

  beforeEach(() => {
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('createCooldownKey', () => {
    it('should create key with prefix and all parts', () => {
      expect(createCooldownKey('user1', 'team1', 'daily', 'proj1')).toBe(
        'sprintometer-banner-cooldown-user1-team1-daily-proj1'
      );
    });
  });

  describe('isBannerEligible', () => {
    it('should return true when no entry exists', () => {
      expect(isBannerEligible('test-key')).toBe(true);
    });

    it('should return false when count is below threshold', () => {
      getItemSpy.mockReturnValue(JSON.stringify({ count: 2 }));
      expect(isBannerEligible('test-key')).toBe(false);
    });

    it('should return false when count is just below threshold', () => {
      getItemSpy.mockReturnValue(JSON.stringify({ count: 4 }));
      expect(isBannerEligible('test-key')).toBe(false);
    });

    it('should return true when count reaches threshold', () => {
      getItemSpy.mockReturnValue(JSON.stringify({ count: 5 }));
      expect(isBannerEligible('test-key')).toBe(true);
    });

    it('should return true when count exceeds threshold', () => {
      getItemSpy.mockReturnValue(JSON.stringify({ count: 7 }));
      expect(isBannerEligible('test-key')).toBe(true);
    });

    it('should return true when localStorage value is invalid JSON', () => {
      getItemSpy.mockReturnValue('not-json');
      expect(isBannerEligible('test-key')).toBe(true);
    });
  });

  describe('recordBannerInteraction', () => {
    it('should create entry with count 1 when no entry exists', () => {
      recordBannerInteraction('test-key');

      expect(setItemSpy).toHaveBeenCalledWith('test-key', JSON.stringify({ count: 1 }));
    });

    it('should increment counter when below threshold', () => {
      getItemSpy.mockReturnValue(JSON.stringify({ count: 2 }));

      recordBannerInteraction('test-key');

      expect(setItemSpy).toHaveBeenCalledWith('test-key', JSON.stringify({ count: 3 }));
    });

    it('should reset counter to 0 when at threshold', () => {
      getItemSpy.mockReturnValue(JSON.stringify({ count: 5 }));

      recordBannerInteraction('test-key');

      expect(setItemSpy).toHaveBeenCalledWith('test-key', JSON.stringify({ count: 0 }));
    });

    it('should reset counter to 0 when above threshold', () => {
      getItemSpy.mockReturnValue(JSON.stringify({ count: 7 }));

      recordBannerInteraction('test-key');

      expect(setItemSpy).toHaveBeenCalledWith('test-key', JSON.stringify({ count: 0 }));
    });
  });
});
