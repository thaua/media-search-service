import Media from '@domain/media';
import SearchMediaUseCase from './search-media-usecase';
import { AppConfig } from '@infrastructure/data/app-config';
import { RequiredAttributeUseCaseError } from '@application/usecases/exceptions/required-attribute.use-case-error';
import { AttributeLengthUseCaseError } from '@application/usecases/exceptions/attribute-length.use-case-error';
import { InvalidProviderUseCaseError } from '@application/usecases/exceptions/invalid-provider.use-case-error';

const mockedMediaProviderStrategyFactory: any = {
  createProvider: jest.fn(),
};

describe('SearchMediaUseCase', () => {
  const searchMediaUseCase = new SearchMediaUseCase(AppConfig, mockedMediaProviderStrategyFactory);

  describe('creating', () => {
    it('sets factory correctly', () => {
      expect((searchMediaUseCase as any)['mediaProviderStrategyFactory']).toEqual(
        mockedMediaProviderStrategyFactory,
      );
    });
  });

  describe('search', () => {
    let mockedMediaSearchProvider: any;
    const provider = 'exampleProvider';

    beforeEach(() => {
      mockedMediaSearchProvider = {
        search: jest.fn(),
      };

      mockedMediaProviderStrategyFactory.createProvider.mockReturnValue(mockedMediaSearchProvider);
    });

    describe('with invalid params', () => {
      describe('with invalid provider', () => {
        beforeEach(() => {
          mockedMediaProviderStrategyFactory.createProvider.mockReturnValue(null);
        });

        it('should throw InvalidProviderUseCaseError', async () => {
          const mockedInvalidProvider = 'invalidProvider';

          return expect(async () => {
            await searchMediaUseCase.search(mockedInvalidProvider, '123');
          }).rejects.toThrowError(new InvalidProviderUseCaseError(mockedInvalidProvider));
        });
      });

      describe('with no term param', () => {
        beforeEach(() => {
          mockedMediaSearchProvider.search.mockReturnValue(null);
        });

        it('should throw RequiredAttributeUseCaseError', async () => {
          return expect(async () => {
            await searchMediaUseCase.search(provider, null as unknown as string);
          }).rejects.toThrowError(new RequiredAttributeUseCaseError('term'));
        });
      });

      describe('with short term', () => {
        beforeEach(() => {
          mockedMediaSearchProvider.search.mockReturnValue(null);
        });

        it('should throw AttributeLengthUseCaseError', async () => {
          return expect(async () => {
            await searchMediaUseCase.search(provider, '12');
          }).rejects.toThrowError(new AttributeLengthUseCaseError('term', AppConfig.minSearchTerm));
        });
      });
    });

    describe('with valid params', () => {
      const mockedMedia: Media[] = [{ code: '1' } as Media, { code: '2' } as Media];
      const term = 'exampleTerm';

      let result: Media[];

      beforeEach(async () => {
        mockedMediaSearchProvider.search.mockReturnValue(mockedMedia);
        result = await searchMediaUseCase.search(provider, term);
      });

      it('calls the createProvider method with the correct arguments', () => {
        expect(mockedMediaProviderStrategyFactory.createProvider).toHaveBeenCalledWith(provider);
      });

      it('calls the SearchProvider search method with the correct arguments', () => {
        expect(mockedMediaSearchProvider.search).toHaveBeenCalledWith(term);
      });

      it('returns media from search provider', () => {
        expect(result).toEqual(mockedMedia);
      });
    });
  });
});
