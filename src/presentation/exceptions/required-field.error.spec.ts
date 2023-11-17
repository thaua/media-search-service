import { RequiredFieldError } from '@presentation/exceptions/required-field.error';

describe('RequiredFieldError', () => {
  it('should create an instance of RequiredFieldError with proper field attribute', () => {
    const field = 'anyField';
    const requiredFieldError = new RequiredFieldError(field);

    expect(requiredFieldError).toBeInstanceOf(RequiredFieldError);
    expect(requiredFieldError).toHaveProperty('field', field);
  });
});
