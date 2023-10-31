import { Provider } from '@domain/provider';
import Media from '@domain/media';
import SearchMediaUseCase from '@application/usecases/search-media-usecase';

const mockMediaSearchProviderFactory: any = {
  createProvider: jest.fn(),
};

describe('SearchMediaUseCase', () => {
  const searchMediaUseCase = new SearchMediaUseCase(
    mockMediaSearchProviderFactory,
  );

  describe('creating', () => {
    it('sets factory correctly', () => {
      expect((searchMediaUseCase as any)['mediaSearchProviderFactory']).toEqual(
        mockMediaSearchProviderFactory,
      );
    });
  });

  describe('search', () => {
    const provider = Provider.YOUTUBE;
    const term = 'exampleTerm';
    const mockedMedia: Media[] = [
      { code: '1' } as Media,
      { code: '' } as Media,
    ];
    let mockedMediaSearchProvider: any;
    let result: Media[];

    beforeEach(() => {
      mockedMediaSearchProvider = {
        search: jest.fn(),
      };
      mockedMediaSearchProvider.search.mockReturnValue(mockedMedia);
      mockMediaSearchProviderFactory.createProvider.mockReturnValue(
        mockedMediaSearchProvider,
      );

      result = searchMediaUseCase.search(provider, term);
    });

    it('calls the createProvider method with the correct arguments', () => {
      expect(
        mockMediaSearchProviderFactory.createProvider,
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
