import { YoutubeProviderError } from '@infrastructure/providers/exceptions/youtube-provider.error';

describe('YoutubeProviderError', () => {
  it('should create an instance of YoutubeProviderError', () => {
    const errorObject = new Error('Youtube test error message');
    const error = new YoutubeProviderError(errorObject);

    expect(error).toBeInstanceOf(YoutubeProviderError);
    expect(error.details).toBe(errorObject);
    expect(error.message).toBe('Error on getting media from YouTube.');
    expect(error.name).toBe('YoutubeProviderError');
  });
});
