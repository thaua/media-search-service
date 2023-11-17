import { HttpResponseError } from '@presentation/response/http-response-error';

describe('HttpResponseError', () => {
  it('should create an instance of HttpResponseError with proper error object', () => {
    const errorObject = new Error('Example error message');
    const httpResponseError = new HttpResponseError(errorObject);

    expect(httpResponseError).toBeInstanceOf(HttpResponseError);
    expect(httpResponseError).toHaveProperty('error', errorObject);
  });
});
