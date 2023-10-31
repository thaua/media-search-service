import { Provider } from '@domain/provider';
import MediaSearchProviderFactory from '@application/factories/media-search-provider-factory.interface';
import MediaSearchProvider from '@application/providers/media-search-provider.interface';
import SpotifyMediaSearchProvider from '../providers/spotify-media-search.provider';
import YoutubeMediaSearchProvider from '../providers/youtube-media-search.provider';

export default class MediaSearchProviderFactoryImpl
  implements MediaSearchProviderFactory
{
  createProvider(provider: Provider): MediaSearchProvider {
    switch (provider) {
      case Provider.YOUTUBE:
        return new YoutubeMediaSearchProvider();
      case Provider.SPOTIFY:
        return new SpotifyMediaSearchProvider();
      default:
        throw new Error('Invalid media search providers.');
    }
  }
}
