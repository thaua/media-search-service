import { AttributeLengthUseCaseError } from '@application/exceptions/attribute-length.use-case-error';

describe('AttributeLengthUseCaseError', () => {
  let error: AttributeLengthUseCaseError;
  const field = 'exampleField';
  let minLength: number;
  let maxLength: number | undefined;

  beforeEach(() => {
    error = new AttributeLengthUseCaseError(field, minLength, maxLength);
  });

  describe('with maxLength parameter', () => {
    beforeAll(() => {
      minLength = 5;
      maxLength = 10;
    });

    it('should create an error message for a range of length', () => {
      const error = new AttributeLengthUseCaseError(field, minLength, maxLength);

      expect(error.message).toBe(
        `The '${field}' attribute's length must be between 5 and 10 characters.`,
      );
      expect(error.field).toBe(field);
      expect(error.minLength).toBe(minLength);
      expect(error.maxLength).toBe(maxLength);
      expect(error.name).toBe('AttributeLengthUseCaseError');
    });
  });

  describe('with no maxLength parameter', () => {
    beforeAll(() => {
      minLength = 1;
      maxLength = undefined;
    });

    it('should create an error message for minimum length only', () => {
      expect(error.message).toBe(`The '${field}' attribute must have at least 1 characters.`);
      expect(error.field).toBe(field);
      expect(error.minLength).toBe(minLength);
      expect(error.maxLength).toBeUndefined();
      expect(error.name).toBe('AttributeLengthUseCaseError');
    });
  });
});
