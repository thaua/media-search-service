import ListProviderUseCase from '@application/usecases/list-provider-usecase';

describe('ListProviderUseCase', () => {
  const listProviderUseCase = new ListProviderUseCase();

  describe('creating', () => {
    it('sets class correctly', () => {
      expect(listProviderUseCase).toBeDefined();
    });
  });

  describe('list', () => {
    it('lists current providers', () => {
      const providers = listProviderUseCase.list();

      expect(providers).toEqual(['YOUTUBE', 'SPOTIFY']);
    });
  });
});
