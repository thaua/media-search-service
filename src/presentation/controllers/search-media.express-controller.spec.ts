import { SearchMediaExpressController } from '@presentation/controllers/search-media.express-controller';
import SearchMediaUseCase from '@application/usecases/search-media-usecase';
import express from 'express';
import { MediaProviderType } from '@domain/media-provider.type';
import { RequiredFieldError } from '@presentation/exceptions/required-field.error';

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

    jest
      .spyOn(searchMediaExpressController, 'handle')
      .mockImplementation(() => {});
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

  it('should execute use case', () => {
    searchMediaExpressController.executeUseCase(mockRequest);

    expect(mockedSearchMediaUseCase.search).toHaveBeenCalledWith(
      mockedProviderType,
      mockedTerm,
    );
  });
});
