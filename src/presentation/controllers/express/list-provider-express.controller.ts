import ListProviderUseCase from '@application/usecases/list-provider-usecase';
import { ExpressControllerTemplate } from '@presentation/templates/express-controller.template';

export class ListProviderExpressController extends ExpressControllerTemplate<
  string[]
> {
  constructor(private readonly listProviderUseCase: ListProviderUseCase) {
    super();
  }

  executeUseCase(): string[] {
    return this.listProviderUseCase.list();
  }
}
