import express from 'express';
import * as core from 'express-serve-static-core';
import { Routes } from './routes';

export default class Server {
  private readonly app: core.Express = express();

  constructor(private readonly port: string) {}

  start(): void {
    // TODO Implement route to use case adapter
    for (const route of Routes) {
      switch (route.method) {
        case 'get':
          this.app.get(route.path, (req, res) =>
            route.controller.handle(req, res),
          );
          break;
        default:
          throw Error('Invalid route.');
      }
    }

    this.app.listen(this.port, () => {
      console.info(`Server running at http://localhost:${this.port}`);
    });
  }
}
