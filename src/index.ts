import * as core from 'express-serve-static-core';
import express from 'express';
import { SearchMediaExpressController } from '@presentation/controllers/express/search-media.express-controller';
import {
  listProviderUseCase,
  searchMediaUseCase,
} from '@infrastructure/bootstrap/usecases.bootstrap';
import { ListProviderExpressController } from '@presentation/controllers/express/list-provider-express.controller';
import { AppConfig } from '@infrastructure/data/app-config';

export const listProviderExpressController = new ListProviderExpressController(
  listProviderUseCase,
);
export const searchMediaExpressController = new SearchMediaExpressController(
  searchMediaUseCase,
);

const app: core.Express = express();

app.get('/provider', (req, res) =>
  listProviderExpressController.handle(req, res),
);
app.get('/provider/:provider/search', (req, res) =>
  searchMediaExpressController.handle(req, res),
);

app.listen(AppConfig.serverPort, () => {
  console.info(`Server running at http://localhost:${AppConfig.serverPort}`);
});
