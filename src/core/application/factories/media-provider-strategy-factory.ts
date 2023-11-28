import { MediaProviderType } from '@application/types/media-provider.type';
import MediaProviderStrategy from '@application/interfaces/media-provider-strategy.interface';
import { ProviderListType } from '@application/types/provider-list.type';
import { Config } from '@application/interfaces/config.interface';

export default class MediaProviderStrategyFactory {
  constructor(
    private readonly appConfig: Config,
    private readonly providerList: ProviderListType,
  ) {}

  createProvider(provider: MediaProviderType): MediaProviderStrategy | null {
    const providerClass: new (appConfig: Config) => MediaProviderStrategy =
      this.providerList[provider];

    if (!providerClass) {
      return null;
    }

    return new providerClass(this.appConfig);
  }
}
