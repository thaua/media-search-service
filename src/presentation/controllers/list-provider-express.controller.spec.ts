import ListProviderUseCase from '@application/usecases/list-provider-usecase';
import { ListProviderExpressController } from '@presentation/controllers/list-provider-express.controller';

describe('ListProviderExpressController', () => {
  const mockedListProviderUseCase = {
    list: jest.fn(),
  };
  let listProviderExpressController: ListProviderExpressController;

  beforeEach(() => {
    listProviderExpressController = new ListProviderExpressController(
      mockedListProviderUseCase as unknown as ListProviderUseCase,
    );

    jest
      .spyOn(listProviderExpressController, 'handle')
      .mockImplementation(() => {});
  });

  it('should execute use case', () => {
    listProviderExpressController.executeUseCase();

    expect(mockedListProviderUseCase.list).toHaveBeenCalled();
  });
});
