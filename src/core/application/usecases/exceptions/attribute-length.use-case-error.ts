import { UseCaseError } from '../../../exceptions/use-case.error';

export class AttributeLengthUseCaseError extends UseCaseError {
  constructor(
    public readonly field: string,
    public readonly minLength: number,
    public readonly maxLength?: number,
  ) {
    let errorMessage: string;

    if (!maxLength) {
      errorMessage = `'${field}' attribute must have at least ${minLength} characters.`;
    } else {
      errorMessage = `'${field}' attribute's length must be between ${minLength} and ${maxLength} characters.`;
    }

    super(errorMessage);
  }
}
