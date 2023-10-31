import express from 'express';
import * as core from 'express-serve-static-core';
import { Routes } from './routes';

export default class Server {
  private readonly app: core.Express = express();

  constructor(private readonly port: string) {}

  start(): void {
    for (const route of Routes) {
      switch (route.method) {
        case 'get':
          this.app.get(route.path, route.controller.handle);
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
