import SearchMediaUseCase from '@application/usecases/search-media-usecase';
import MediaProviderStrategyFactory from '@application/factories/media-provider-strategy-factory';
import { Providers } from '@infrastructure/data/providers';
import ListProviderUseCase from '@application/usecases/list-provider-usecase';
import { AppConfig } from '@infrastructure/data/app-config';

const mediaProviderStrategyFactory = new MediaProviderStrategyFactory(AppConfig, Providers);

export const searchMediaUseCase = new SearchMediaUseCase(AppConfig, mediaProviderStrategyFactory);
export const listProviderUseCase = new ListProviderUseCase(Providers);
