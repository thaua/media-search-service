import { InfrastructureError } from '@infrastructure/exceptions/infrastructure.error';

export class SpotifyProviderError extends InfrastructureError {
  constructor(public readonly details: any) {
    super('Error on getting media from Spotify.', details);
    this.name = 'SpotifyProviderError';
  }
}
