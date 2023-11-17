import * as core from 'express-serve-static-core';
import express from 'express';
import { SearchMediaExpressController } from '@presentation/controllers/search-media.express-controller';
import {
  listProviderUseCase,
  searchMediaUseCase,
} from '@infrastructure/bootstrap/usecases.bootstrap';
import { ListProviderExpressController } from '@presentation/controllers/list-provider-express.controller';

export const listProviderExpressController = new ListProviderExpressController(
  listProviderUseCase,
);
export const searchMediaExpressController = new SearchMediaExpressController(
  searchMediaUseCase,
);

const PORT = process.env.PORT || '3000';

const app: core.Express = express();

app.get('/provider', (req, res) =>
  listProviderExpressController.handle(req, res),
);
app.get('/provider/:provider/search', (req, res) =>
  searchMediaExpressController.handle(req, res),
);

app.listen(PORT, () => {
  console.info(`Server running at http://localhost:${PORT}`);
});
