import MediaProviderStrategyFactory from '@application/factories/media-provider-strategy-factory';
import MediaProviderStrategy from '@application/strategies/media-provider-strategy.interface';
import Media from '@domain/media';

class MockedMediaProviderStrategy1 implements MediaProviderStrategy {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search(term: string): Media[] {
    return [];
  }
}

class MockedMediaProviderStrategy2 implements MediaProviderStrategy {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search(term: string): Media[] {
    return [];
  }
}

describe('MediaProviderStrategyFactory', () => {
  const mediaSearchProviderFactory = new MediaProviderStrategyFactory({
    provider1: MockedMediaProviderStrategy1,
    provider2: MockedMediaProviderStrategy2,
  });

  describe('with invalid provider', () => {
    it('returns null', () => {
      const result = mediaSearchProviderFactory.createProvider('provider3');

      expect(result).toBeNull();
    });
  });

  describe('with valid provider', () => {
    it('creates a Provider1 class', () => {
      const result = mediaSearchProviderFactory.createProvider('provider1');

      expect(result).toBeInstanceOf(MockedMediaProviderStrategy1);
    });

    it('creates a Provider2 class', () => {
      const result = mediaSearchProviderFactory.createProvider('provider2');

      expect(result).toBeInstanceOf(MockedMediaProviderStrategy2);
    });
  });
});
