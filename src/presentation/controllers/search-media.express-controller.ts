import express from 'express';
import SearchMediaUseCase from '@application/usecases/search-media-usecase';
import { ExpressControllerTemplate } from '@presentation/templates/express-controller.template';
import Media from '@domain/media';

export class SearchMediaExpressController extends ExpressControllerTemplate<Promise<Media[]>> {
  constructor(private readonly searchMediaUseCase: SearchMediaUseCase) {
    super();
  }

  async executeUseCase(request: express.Request): Promise<Media[]> {
    const provider = request.params['provider'] as string;
    const term = request.query.term as string;

    return this.searchMediaUseCase.search(provider, term);
  }
}
