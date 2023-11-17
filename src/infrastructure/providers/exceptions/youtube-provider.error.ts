import { InfrastructureError } from '@infrastructure/exceptions/infrastructure.error';

export class YoutubeProviderError extends InfrastructureError {
  constructor(public readonly error: Error) {
    super('Error on getting media from YouTube.', error);
    this.name = 'YoutubeProviderError';
  }
}
