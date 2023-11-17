import { RequiredAttributeUseCaseError } from '@application/usecases/exceptions/required-attribute.use-case-error';

describe('RequiredAttributeUseCaseError', () => {
  it('should create an error message for a missing attribute', () => {
    const field = 'exampleField';
    const error = new RequiredAttributeUseCaseError(field);

    expect(error.message).toBe(`Missing '${field}' attribute.`);
    expect(error.field).toBe(field);
  });
});
