import MediaProviderStrategy from '@application/strategies/media-provider-strategy.interface';
import Media from '@domain/media';
import { Config } from '@infrastructure/data/interfaces/config.interface';

export default class SpotifyMediaSearchProvider implements MediaProviderStrategy {
  constructor(private readonly appConfig: Config) {}

  search(term: string): Media[] {
    console.info(`[Spotify] Searching for ${term}.`);
    return [];
  }
}
