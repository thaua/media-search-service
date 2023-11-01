import ListProviderUseCase from '@application/usecases/list-provider-usecase';

// TODO Implement route to use case adapter
export default class ProviderController {
  constructor(private readonly listProviderUseCase: ListProviderUseCase) {}

  handle(req: any, res: any) {
    res.send(this.listProviderUseCase.list());
  }
}
