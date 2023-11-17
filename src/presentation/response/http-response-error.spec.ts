import { HttpResponseError } from '@presentation/response/http-response-error';

describe('HttpResponseError', () => {
  it('should create an instance of HttpResponseError with proper error object', () => {
    const errorMessage = 'Example error message';
    const httpResponseError = new HttpResponseError(errorMessage);

    expect(httpResponseError).toBeInstanceOf(HttpResponseError);
    expect(httpResponseError).toHaveProperty('error', errorMessage);
  });
});
