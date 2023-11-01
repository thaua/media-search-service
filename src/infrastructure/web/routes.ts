import HelloController from './controllers/hello.controller';
import ListProviderUseCase from '@application/usecases/list-provider-usecase';
import ProviderController from '@infrastructure/web/controllers/provider.controller';
import SearchMediaUseCase from '@application/usecases/search-media-usecase';
import MediaSearchProviderFactoryImpl from '@infrastructure/factories/media-search-provider-factory';
import SearchController from '@infrastructure/web/controllers/search.controller';

// TODO Implement route to use case adapter
export const Routes: any[] = [
  { method: 'get', path: '/', controller: new HelloController() },
  {
    method: 'get',
    path: '/provider',
    controller: new ProviderController(new ListProviderUseCase()),
  },
  {
    method: 'get',
    path: '/provider/:provider/search',
    controller: new SearchController(
      new SearchMediaUseCase(new MediaSearchProviderFactoryImpl()),
    ),
  },
];
