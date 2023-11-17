// TODO: Replace this class by an adapter that format data correctly
export class HttpResponseError {
  constructor(private readonly error: Error) {}

  format() {
    delete (this.error as any).details;
    return this;
  }
}
