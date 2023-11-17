import { MediaProviderType } from '@domain/media-provider.type';
import MediaProviderStrategy from '@application/strategies/media-provider-strategy.interface';
import { ProviderListType } from '@domain/provider-list.type';
import { Config } from '@infrastructure/data/interfaces/config.interface';

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
