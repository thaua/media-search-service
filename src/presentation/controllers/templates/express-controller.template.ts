import express from 'express';
import { Controller } from '@presentation/controllers/interface/controller.interface';
import { RequiredFieldError } from '@presentation/exceptions/required-field.error';
import { HttpResponseError } from '@presentation/response/http-response-error';

export abstract class ExpressControllerTemplate<T> implements Controller {
  handle(request: express.Request, response: express.Response): void {
    try {
      response.json(this.executeUseCase(request));
    } catch (e) {
      if (e instanceof RequiredFieldError) {
        response
          .status(400)
          .json(new HttpResponseError(`Query param '${e.field}' is missing.`));
      } else {
        console.error(e);
        response
          .status(500)
          .json(new HttpResponseError('Internal Server Error.'));
      }
    }
  }

  abstract executeUseCase(request: express.Request): T;
}
