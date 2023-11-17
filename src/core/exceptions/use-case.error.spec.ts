import { UseCaseError } from './use-case.error';

class MockedUseCaseError extends UseCaseError {}

describe('UseCaseError', () => {
  it('should create an instance of UseCaseError', () => {
    const errorMessage = 'Test error message';
    const error = new MockedUseCaseError(errorMessage);

    expect(error).toBeInstanceOf(UseCaseError);
    expect(error.message).toBe(errorMessage);
  });
});
