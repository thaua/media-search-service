import MediaProviderStrategy from '@application/interfaces/media-provider-strategy.interface';
import { Config } from '@application/interfaces/config.interface';

export type ProviderListType = {
  [key: string]: new (appConfig: Config) => MediaProviderStrategy;
};
