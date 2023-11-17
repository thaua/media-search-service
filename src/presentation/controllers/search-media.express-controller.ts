import express from 'express';
import SearchMediaUseCase from '@application/usecases/search-media-usecase';
import { ExpressControllerTemplate } from '@presentation/controllers/templates/express-controller.template';
import Media from '@domain/media';
import { RequiredFieldError } from '@presentation/exceptions/required-field.error';

export class SearchMediaExpressController extends ExpressControllerTemplate<
  Media[]
> {
  constructor(private readonly searchMediaUseCase: SearchMediaUseCase) {
    super();
  }

  executeUseCase(request: express.Request): Media[] {
    const term = request.query?.term;

    // TODO: Move this validation to use case
    if (!term) {
      throw new RequiredFieldError('term');
    }

    return this.searchMediaUseCase.search(
      request.params['provider'],
      String(request.query['term']),
    );
  }
}
