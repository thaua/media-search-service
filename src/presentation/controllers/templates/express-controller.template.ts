import express from 'express';
import { Controller } from '@presentation/controllers/interface/controller.interface';
import { HttpResponseError } from '@presentation/response/http-response-error';
import { UseCaseError } from '../../../core/exceptions/use-case.error';

export abstract class ExpressControllerTemplate<T> implements Controller {
  handle(request: express.Request, response: express.Response): void {
    try {
      response.json(this.executeUseCase(request));
    } catch (e) {
      if (e instanceof UseCaseError) {
        response.status(400).json(new HttpResponseError(e));
      } else {
        console.error(e);
        response
          .status(500)
          .json(new HttpResponseError(new Error('Internal Server Error.')));
      }
    }
  }

  abstract executeUseCase(request: express.Request): T;
}
