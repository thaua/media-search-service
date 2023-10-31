import express, { Request, Response } from 'express';
import * as core from 'express-serve-static-core';

export default class Server {
  private readonly app: core.Express = express();

  constructor(private readonly port: string) {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Hello!');
    });
  }

  start(): void {
    this.app.listen(this.port, () => {
      console.info(`Server running at http://localhost:${this.port}`);
    });
  }
}
