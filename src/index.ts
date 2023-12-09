import SearchMediaUseCase from '@application/usecases/search-media-usecase';
import { AppConfig } from '@infrastructure/data/app-config';
import MediaProviderStrategyFactory from '@application/factories/media-provider-strategy-factory';
import { Providers } from '@infrastructure/data/providers';
import { expressServer } from '@presentation/express/server';

export const searchMediaUseCase = new SearchMediaUseCase(
  AppConfig,
  new MediaProviderStrategyFactory(AppConfig, Providers),
);

expressServer(searchMediaUseCase);
