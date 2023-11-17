export class RequiredFieldError extends Error {
  constructor(public readonly field: string) {
    super();
  }
}
