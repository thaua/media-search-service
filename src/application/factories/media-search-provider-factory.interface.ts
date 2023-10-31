import { Provider } from '@domain/provider';
import MediaSearchProvider from '@application/providers/media-search-provider.interface';

export default interface MediaSearchProviderFactory {
  createProvider(provider: Provider): MediaSearchProvider;
}
