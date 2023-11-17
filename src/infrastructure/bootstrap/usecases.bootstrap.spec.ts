import {
  listProviderUseCase,
  searchMediaUseCase,
} from '@infrastructure/bootstrap/usecases.bootstrap';

describe('UseCases bootstrap', () => {
  it('should set SearchMediaUseCase', async () => {
    expect(searchMediaUseCase).toBeDefined();
  });
  it('should set ListProviderUseCase', async () => {
    expect(listProviderUseCase).toBeDefined();
  });
});
