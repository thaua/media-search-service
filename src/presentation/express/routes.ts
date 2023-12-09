import { Request, Response } from 'express';
import { Providers } from '@infrastructure/data/providers';
import SearchMediaUseCase from '@application/usecases/search-media-usecase';
import { expressErrorHandler } from '@presentation/express/error-handler';

export const handleListProvidersRoute = (_: any, response: Response) => {
  response.status(200).json(Object.keys(Providers));
};

export const handleSearchMediaRoute = async (
  request: Request,
  response: Response,
  searchMediaUseCase: SearchMediaUseCase,
) => {
  try {
    const provider = request.params['provider'] as string;
    const term = request.query.term as string;

    response.status(200).json(await searchMediaUseCase.search(provider, term));
  } catch (error) {
    expressErrorHandler(error, response);
  }
};
