import { UseCaseError } from '../../exceptions/use-case.error';

export class InvalidProviderUseCaseError extends UseCaseError {
  constructor(public readonly provider: string) {
    super(`Invalid provider: '${provider}'.`);
    this.name = 'InvalidProviderUseCaseError';
  }
}
