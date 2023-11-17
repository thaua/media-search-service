import { AttributeLengthUseCaseError } from '@application/usecases/exceptions/attribute-length.use-case-error';

describe('AttributeLengthUseCaseError', () => {
  it('should create an error message for minimum length', () => {
    const field = 'exampleField';
    const minLength = 5;

    const error = new AttributeLengthUseCaseError(field, minLength);

    expect(error.message).toBe(
      `'${field}' attribute must have at least ${minLength} characters.`,
    );
    expect(error.field).toBe(field);
    expect(error.minLength).toBe(minLength);
    expect(error.maxLength).toBeUndefined();
  });

  it('should create an error message for a range of length', () => {
    const field = 'exampleField';
    const minLength = 5;
    const maxLength = 10;

    const error = new AttributeLengthUseCaseError(field, minLength, maxLength);

    expect(error.message).toBe(
      `'${field}' attribute's length must be between ${minLength} and ${maxLength} characters.`,
    );
    expect(error.field).toBe(field);
    expect(error.minLength).toBe(minLength);
    expect(error.maxLength).toBe(maxLength);
  });
});
