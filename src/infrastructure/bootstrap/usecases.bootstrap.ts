import SearchMediaUseCase from '@application/usecases/search-media-usecase';
import MediaProviderStrategyFactory from '@application/factories/media-provider-strategy-factory';
import { Providers } from '@infrastructure/data/providers';
import ListProviderUseCase from '@application/usecases/list-provider-usecase';
import { AppConfig } from '@infrastructure/data/app-config';

export const searchMediaUseCase = new SearchMediaUseCase(
  AppConfig,
  new MediaProviderStrategyFactory(AppConfig, Providers),
);
export const listProviderUseCase = new ListProviderUseCase(Providers);
