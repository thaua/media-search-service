import { Request, Response } from 'express';
import SearchMediaUseCase from '@application/usecases/search-media-usecase';
import * as routes from './routes';
import { Providers } from '@infrastructure/data/providers';

const mockSearchMediaUseCase = {
  search: jest.fn(),
};
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('Routes', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleListProvidersRoute', () => {
    it('should respond with available providers', () => {
      const mockRequest = {} as Request;

      routes.handleListProvidersRoute(mockRequest, mockResponse as unknown as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(Object.keys(Providers));
    });
  });

  describe('handleSearchMediaRoute', () => {
    it('should handle search request', async () => {
      const mockRequest = {
        params: { provider: 'providerName' },
        query: { term: 'searchTerm' },
      } as Partial<Request>;

      const mockSearchResult = [
        {
          code: '1',
          title: 'title1',
          thumbnail: '',
        },
        {
          code: '2',
          title: 'title2',
          thumbnail: '',
        },
      ];

      mockSearchMediaUseCase.search.mockResolvedValue(mockSearchResult);

      await routes.handleSearchMediaRoute(
        mockRequest as Request,
        mockResponse as unknown as Response,
        mockSearchMediaUseCase as unknown as SearchMediaUseCase,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockSearchResult);
      expect(mockSearchMediaUseCase.search).toHaveBeenCalledWith('providerName', 'searchTerm');
    });

    it('should handle search request error', async () => {
      const mockRequest = {
        params: { provider: 'providerName' },
        query: { term: 'searchTerm' },
      } as Partial<Request>;
      const mockError = new Error('Search error');

      mockSearchMediaUseCase.search.mockRejectedValue(mockError);

      await routes.handleSearchMediaRoute(
        mockRequest as Request,
        mockResponse as unknown as Response,
        mockSearchMediaUseCase as unknown as SearchMediaUseCase,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error.' });
      expect(mockSearchMediaUseCase.search).toHaveBeenCalledWith('providerName', 'searchTerm');
    });
  });
});
