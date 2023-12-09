import { UseCaseError } from '../../core/exceptions/use-case.error';
import { InfrastructureError } from '@infrastructure/exceptions/infrastructure.error';
import { Response } from 'express';

export const expressErrorHandler = (error: any, response: Response) => {
  const httpResponseError = { error };

  if (error instanceof UseCaseError) {
    response.status(400).json(httpResponseError);
  } else if (error instanceof InfrastructureError) {
    console.error(error.message, error.details);

    response.status(502).json(httpResponseError);
  } else {
    console.error('Unknown error caught.', error);

    response.status(500).json({ error: 'Internal Server Error.' });
  }
};
