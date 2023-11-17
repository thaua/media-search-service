import { HttpResponseError } from '@presentation/response/http-response-error';

describe('HttpResponseError', () => {
  it('should format error by deleting details property', () => {
    const error = new Error('Sample error');
    (error as any).details = 123;

    const httpResponseError = new HttpResponseError(error);

    const formattedError = httpResponseError.format();

    expect(formattedError).toBe(httpResponseError);
    expect((error as any).details).toBeUndefined();
  });
});
