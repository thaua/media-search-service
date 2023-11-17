import * as core from 'express-serve-static-core';
import express from 'express';
import { AppConfig } from '@infrastructure/data/app-config';
import { appRouter } from '@presentation/routes/app.router';

const app: core.Express = express();

app.use('/', appRouter);

app.listen(AppConfig.serverPort, () => {
  console.info(`Server running at http://localhost:${AppConfig.serverPort}`);
});
