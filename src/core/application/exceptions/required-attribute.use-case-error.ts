import { UseCaseError } from '../../exceptions/use-case.error';

export class RequiredAttributeUseCaseError extends UseCaseError {
  constructor(public readonly field: string) {
    super(`Missing '${field}' attribute.`);
    this.name = 'RequiredAttributeUseCaseError';
  }
}
