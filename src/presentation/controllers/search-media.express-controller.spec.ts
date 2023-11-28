import { SearchMediaExpressController } from '@presentation/controllers/search-media.express-controller';
import SearchMediaUseCase from '@application/usecases/search-media-usecase';
import express from 'express';
import { MediaProviderType } from '@application/types/media-provider.type';

describe('SearchMediaExpressController', () => {
  const mockedSearchMediaUseCase = {
    search: jest.fn(),
  };
  let searchMediaExpressController: SearchMediaExpressController;
  let mockRequest: express.Request;
  let mockedTerm: string;
  let mockedProviderType: MediaProviderType;

  beforeEach(() => {
    mockedTerm = '1234';
    mockedProviderType = 'anyProvider';

    searchMediaExpressController = new SearchMediaExpressController(
      mockedSearchMediaUseCase as unknown as SearchMediaUseCase,
    );

    jest.spyOn(searchMediaExpressController, 'handle').mockResolvedValue();
  });

  beforeEach(() => {
    mockRequest = {
      query: {
        term: mockedTerm,
      },
      params: {
        provider: mockedProviderType,
      },
    } as unknown as express.Request;
  });

  it('should execute use case', async () => {
    await searchMediaExpressController.executeUseCase(mockRequest);

    expect(mockedSearchMediaUseCase.search).toHaveBeenCalledWith(mockedProviderType, mockedTerm);
  });
});
