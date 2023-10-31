import YoutubeMediaSearchProvider from '@infrastructure/providers/youtube-media-search.provider';

describe('YoutubeMediaSearchProvider', () => {
  it('returns empty result', () => {
    const term = '';

    const provider = new YoutubeMediaSearchProvider();

    const result = provider.search(term);

    expect(result).toEqual([]);
  });
});
