import ListProviderUseCase from './list-provider-usecase';

describe('ListProviderUseCase', () => {
  const mockedProviders = {
    youtube: {} as any,
    spotify: {} as any,
  };

  const listProviderUseCase = new ListProviderUseCase(mockedProviders);

  describe('creating', () => {
    it('sets class correctly', () => {
      expect(listProviderUseCase).toBeDefined();
    });
  });

  describe('list', () => {
    it('lists current strategies', () => {
      const providers = listProviderUseCase.list();

      expect(providers).toEqual(['youtube', 'spotify']);
    });
  });
});
