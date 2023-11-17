import { Providers } from './providers';
import YoutubeMediaSearchProvider from '@infrastructure/providers/youtube-media-search.provider';
import SpotifyMediaSearchProvider from '@infrastructure/providers/spotify-media-search.provider';

describe('Providers', () => {
  it('should contain YoutubeMediaSearchProvider', () => {
    expect(Providers.youtube).toBe(YoutubeMediaSearchProvider);
  });

  it('should contain SpotifyMediaSearchProvider', () => {
    expect(Providers.spotify).toBe(SpotifyMediaSearchProvider);
  });
});
