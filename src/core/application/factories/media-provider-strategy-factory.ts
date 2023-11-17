import { MediaProviderType } from '@domain/media-provider.type';
import MediaProviderStrategy from '@application/strategies/media-provider-strategy.interface';
import { ProviderListType } from '@domain/provider-list.type';

export default class MediaProviderStrategyFactory {
  constructor(private readonly providerList: ProviderListType) {}

  createProvider(provider: MediaProviderType): MediaProviderStrategy | null {
    const providerClass: new () => MediaProviderStrategy =
      this.providerList[provider];

    if (!providerClass) {
      return null;
    }

    return new providerClass();
  }
}
