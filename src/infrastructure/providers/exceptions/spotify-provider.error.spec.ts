import { SpotifyProviderError } from '@infrastructure/providers/exceptions/spotify-provider.error';

describe('SpotifyProviderError', () => {
  it('should create an instance of SpotifyProviderError', () => {
    const errorObject = new Error('Spotify test error message');
    const error = new SpotifyProviderError(errorObject);

    expect(error).toBeInstanceOf(SpotifyProviderError);
    expect(error.details).toBe(errorObject);
    expect(error.message).toBe('Error on getting media from Spotify.');
    expect(error.name).toBe('SpotifyProviderError');
  });
});
