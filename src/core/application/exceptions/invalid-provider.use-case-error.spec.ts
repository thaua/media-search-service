import { InvalidProviderUseCaseError } from '@application/exceptions/invalid-provider.use-case-error';

describe('InvalidProviderUseCaseError', () => {
  it('should create an error message for a missing attribute', () => {
    const provider = 'exampleProvider';
    const error = new InvalidProviderUseCaseError(provider);

    expect(error.message).toBe(`Invalid provider: '${provider}'.`);
    expect(error.provider).toBe(provider);
    expect(error.name).toBe('InvalidProviderUseCaseError');
  });
});
