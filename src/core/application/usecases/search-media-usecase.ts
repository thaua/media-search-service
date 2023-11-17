import Media from '@domain/media';
import { MediaProviderType } from '@domain/media-provider.type';
import MediaProviderStrategyFactory from '@application/factories/media-provider-strategy-factory';

export default class SearchMediaUseCase {
  constructor(
    private readonly mediaProviderStrategyFactory: MediaProviderStrategyFactory,
  ) {}

  search(provider: MediaProviderType, term: string): Media[] {
    return this.mediaProviderStrategyFactory
      .createProvider(provider)
      .search(term);
  }
}
