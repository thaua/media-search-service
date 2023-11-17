import { MediaProviderType } from '@domain/media-provider.type';
import Media from '@domain/media';
import SearchMediaUseCase from './search-media-usecase';

const mockedMediaProviderStrategyFactory: any = {
  createProvider: jest.fn(),
};

describe('SearchMediaUseCase', () => {
  const searchMediaUseCase = new SearchMediaUseCase(
    mockedMediaProviderStrategyFactory,
  );

  describe('creating', () => {
    it('sets factory correctly', () => {
      expect(
        (searchMediaUseCase as any)['mediaProviderStrategyFactory'],
      ).toEqual(mockedMediaProviderStrategyFactory);
    });
  });

  describe('search', () => {
    let mockedMediaSearchProvider: any;
    const mockedMedia: Media[] = [
      { code: '1' } as Media,
      { code: '2' } as Media,
    ];

    const provider = 'exampleProvider';
    const term = 'exampleTerm';

    let result: Media[];

    beforeEach(() => {
      mockedMediaSearchProvider = {
        search: jest.fn(),
      };

      mockedMediaProviderStrategyFactory.createProvider.mockReturnValue(
        mockedMediaSearchProvider,
      );
      mockedMediaSearchProvider.search.mockReturnValue(mockedMedia);

      result = searchMediaUseCase.search(provider, term);
    });

    it('calls the createProvider method with the correct arguments', () => {
      expect(
        mockedMediaProviderStrategyFactory.createProvider,
      ).toHaveBeenCalledWith(provider);
    });

    it('calls the SearchProvider search method with the correct arguments', () => {
      expect(mockedMediaSearchProvider.search).toHaveBeenCalledWith(term);
    });

    it('returns media from search provider', () => {
      expect(result).toEqual(mockedMedia);
    });
  });
});
