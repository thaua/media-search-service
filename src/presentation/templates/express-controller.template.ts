import express from 'express';
import { HttpResponseError } from '@presentation/interfaces/http-response-error.interface';
import { UseCaseError } from '../../core/exceptions/use-case.error';
import { InfrastructureError } from '@infrastructure/exceptions/infrastructure.error';

export abstract class ExpressControllerTemplate<T> {
  async handle(request: express.Request, response: express.Response): Promise<void> {
    try {
      response.json(await this.executeUseCase(request));
    } catch (e) {
      if (e instanceof UseCaseError) {
        response.status(400).json(this.formatHttpError(e));
      } else if (e instanceof InfrastructureError) {
        console.error(e.message, e.details);

        response.status(502).json(this.formatHttpError(e));
      } else {
        console.error(e);

        response.status(500).json(
          this.formatHttpError({
            message: 'Internal Server Error.',
          } as Error),
        );
      }
    }
  }

  private formatHttpError(error: Error): HttpResponseError {
    const errorWithoutDetails = { ...error };

    delete (errorWithoutDetails as any).details;

    return {
      error: errorWithoutDetails,
    };
  }

  abstract executeUseCase(request: express.Request): T;
}
