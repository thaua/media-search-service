import express from 'express';
import { ListProviderExpressController } from '@presentation/controllers/list-provider-express.controller';
import {
  listProviderUseCase,
  searchMediaUseCase,
} from '@infrastructure/bootstrap/usecases.bootstrap';
import { SearchMediaExpressController } from '@presentation/controllers/search-media.express-controller';

export const listProviderExpressController = new ListProviderExpressController(listProviderUseCase);
export const searchMediaExpressController = new SearchMediaExpressController(searchMediaUseCase);

export const appRouter = express.Router();

appRouter.get('/provider', (req, res) => listProviderExpressController.handle(req, res));
appRouter.get('/provider/:provider/search', (req, res) =>
  searchMediaExpressController.handle(req, res),
);
