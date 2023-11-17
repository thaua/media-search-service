import express from 'express';
import { Controller } from '@presentation/interfaces/controller.interface';
import { HttpResponseError } from '@presentation/response/http-response-error';
import { UseCaseError } from '../../core/exceptions/use-case.error';

export abstract class ExpressControllerTemplate<T> implements Controller {
  async handle(request: express.Request, response: express.Response): Promise<void> {
    try {
      response.json(await this.executeUseCase(request));
    } catch (e) {
      if (e instanceof UseCaseError) {
        response.status(400).json(new HttpResponseError(e));
      } else {
        console.error(e);

        response.status(500).json(
          new HttpResponseError({
            message: 'Internal Server Error.',
          } as Error),
        );
      }
    }
  }

  abstract executeUseCase(request: express.Request): T;
}
