export class UseCaseError extends Error {
  constructor(public readonly message: string) {
    super();
    this.name = 'UseCaseError';
  }
}
