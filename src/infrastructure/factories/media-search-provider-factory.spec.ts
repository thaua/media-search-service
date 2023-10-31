import { Provider } from '@domain/provider';
import MediaSearchProviderFactoryImpl from '@infrastructure/factories/media-search-provider-factory';
import YoutubeMediaSearchProvider from '@infrastructure/providers/youtube-media-search.provider';
import SpotifyMediaSearchProvider from '@infrastructure/providers/spotify-media-search.provider';
import MediaSearchProvider from '@application/providers/media-search-provider.interface';

describe('MediaSearchProviderFactoryImpl', () => {
  const mediaSearchProviderFactory = new MediaSearchProviderFactoryImpl();

  it('creates a YoutubeMediaSearchProvider for Provider.YOUTUBE', () => {
    const provider: Provider = Provider.YOUTUBE;
    const result: MediaSearchProvider =
      mediaSearchProviderFactory.createProvider(provider);
    expect(result).toBeInstanceOf(YoutubeMediaSearchProvider);
  });

  it('creates a SpotifyMediaSearchProvider for Provider.SPOTIFY', () => {
    const provider: Provider = Provider.SPOTIFY;
    const result: MediaSearchProvider =
      mediaSearchProviderFactory.createProvider(provider);
    expect(result).toBeInstanceOf(SpotifyMediaSearchProvider);
  });

  it('throws an error for an invalid media search provider', () => {
    const provider = 'INVALID_PROVIDER'; // An invalid provider
    expect(() =>
      mediaSearchProviderFactory.createProvider(provider as any),
    ).toThrowError('Invalid media search providers.');
  });
});
