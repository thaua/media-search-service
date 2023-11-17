import MediaProviderStrategy from '@application/strategies/media-provider-strategy.interface';
import { Config } from '@infrastructure/data/interfaces/config.interface';

export type ProviderListType = {
  [key: string]: new (appConfig: Config) => MediaProviderStrategy;
};
