import SearchMediaUseCase from '@application/usecases/search-media-usecase';
import { Provider } from '@domain/provider';

// TODO Implement route to use case adapter
export default class SearchController {
  constructor(private readonly searchMediaUseCase: SearchMediaUseCase) {}

  handle(req: any, res: any) {
    res.send(
      this.searchMediaUseCase.search(
        (Provider as any)[req.params['provider']],
        req.query['term'],
      ),
    );
  }
}
