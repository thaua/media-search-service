import SearchMediaUseCase from '@application/usecases/search-media-usecase';
import MediaProviderStrategyFactory from '@application/factories/media-provider-strategy-factory';
import { Providers } from '@infrastructure/data/providers';
import ListProviderUseCase from '@application/usecases/list-provider-usecase';

export const searchMediaUseCase = new SearchMediaUseCase(
  new MediaProviderStrategyFactory(Providers),
);

export const listProviderUseCase = new ListProviderUseCase(Providers);
