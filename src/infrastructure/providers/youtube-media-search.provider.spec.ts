import YoutubeMediaSearchProvider from '@infrastructure/providers/youtube-media-search.provider';
import { Config } from '@infrastructure/data/interfaces/config.interface';

describe('YoutubeMediaSearchProvider', () => {
  beforeEach(() => {
    console.info = jest.fn();
  });

  it('returns empty result', () => {
    const term = '';

    const provider = new YoutubeMediaSearchProvider({} as Config);

    const result = provider.search(term);

    expect(result).toEqual([]);
  });
});
