import MediaProviderStrategy from '@application/strategies/media-provider-strategy.interface';

export type ProviderListType = {
  [key: string]: new () => MediaProviderStrategy;
};
