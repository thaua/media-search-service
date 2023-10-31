import SpotifyMediaSearchProvider from '@infrastructure/providers/spotify-media-search.provider';

describe('SpotifyMediaSearchProvider', () => {
  it('returns empty result', () => {
    const term = '';

    const provider = new SpotifyMediaSearchProvider();

    const result = provider.search(term);

    expect(result).toEqual([]);
  });
});
