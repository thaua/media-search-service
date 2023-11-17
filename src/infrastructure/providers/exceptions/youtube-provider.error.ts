import { InfrastructureError } from '@infrastructure/exceptions/infrastructure.error';

export class YoutubeProviderError extends InfrastructureError {
  constructor(public readonly details: any) {
    super('Error on getting media from YouTube.', details);
    this.name = 'YoutubeProviderError';
  }
}
