import { Provider } from '@domain/provider';

describe('Provider', () => {
  it('should have defined values', () => {
    expect(Provider.YOUTUBE).toBeDefined();
    expect(Provider.SPOTIFY).toBeDefined();
  });

  it('should have the correct values', () => {
    expect(Provider.YOUTUBE).toBe('youtube');
    expect(Provider.SPOTIFY).toBe('spotify');
  });
});
