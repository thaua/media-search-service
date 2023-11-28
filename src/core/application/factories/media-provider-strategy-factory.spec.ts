import MediaProviderStrategyFactory from '@application/factories/media-provider-strategy-factory';
import { Config } from '@application/interfaces/config.interface';

const MockedMediaProviderStrategy1 = jest.fn();
const MockedMediaProviderStrategy2 = jest.fn();

const MockedConfig: Config = {} as Config;

describe('MediaProviderStrategyFactory', () => {
  const mediaSearchProviderFactory = new MediaProviderStrategyFactory(MockedConfig, {
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
      expect(MockedMediaProviderStrategy1).toHaveBeenCalledWith(MockedConfig);
    });

    it('creates a Provider2 class', () => {
      const result = mediaSearchProviderFactory.createProvider('provider2');

      expect(result).toBeInstanceOf(MockedMediaProviderStrategy2);
      expect(MockedMediaProviderStrategy2).toHaveBeenCalledWith(MockedConfig);
    });
  });
});
