import Media from '@domain/media';
import MediaSearchProviderFactory from '@application/factories/media-search-provider-factory.interface';
import { Provider } from '@domain/provider';

export default class SearchMediaUseCase {
  constructor(
    private readonly mediaSearchProviderFactory: MediaSearchProviderFactory,
  ) {}

  search(provider: Provider, term: string): Media[] {
    return this.mediaSearchProviderFactory
      .createProvider(provider)
      .search(term);
  }
}
