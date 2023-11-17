import { MediaProviderType } from '@domain/media-provider.type';
import MediaProviderStrategy from '@application/strategies/media-provider-strategy.interface';
import { ProviderListType } from '@domain/provider-list.type';

export default class MediaProviderStrategyFactory {
  constructor(private readonly providerList: ProviderListType) {}

  createProvider(provider: MediaProviderType): MediaProviderStrategy {
    const providerClass: new () => MediaProviderStrategy =
      this.providerList[provider];

    if (!providerClass) {
      throw new Error('Invalid media search strategy.');
    }

    return new providerClass();
  }
}
