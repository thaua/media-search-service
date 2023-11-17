import SpotifyMediaSearchProvider from '@infrastructure/providers/spotify-media-search.provider';
import { Config } from '@infrastructure/data/interfaces/config.interface';

describe('SpotifyMediaSearchProvider', () => {
  beforeEach(() => {
    console.info = jest.fn();
  });

  it('returns empty result', async () => {
    const term = '';

    const provider = new SpotifyMediaSearchProvider({} as Config);

    const result = await provider.search(term);

    expect(result).toEqual([]);
  });
});
