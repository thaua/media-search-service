import * as core from 'express-serve-static-core';
import express, { Request, Response } from 'express';
import { AppConfig } from '@infrastructure/data/app-config';
import SearchMediaUseCase from '@application/usecases/search-media-usecase';
import { handleListProvidersRoute, handleSearchMediaRoute } from '@presentation/express/routes';

export const expressServer = (searchMediaUseCase: SearchMediaUseCase) => {
  const app: core.Express = express();

  app.get('/provider', (_: any, response: Response) => handleListProvidersRoute(_, response));
  app.get('/provider/:provider/search', (request: Request, response: Response) =>
    handleSearchMediaRoute(request, response, searchMediaUseCase),
  );

  app.listen(AppConfig.serverPort, () =>
    console.info(`Server running at http://localhost:${AppConfig.serverPort}`),
  );
};
