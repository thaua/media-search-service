import MediaProviderStrategy from '@application/strategies/media-provider-strategy.interface';
import Media from '@domain/media';
import { Config } from '@infrastructure/data/interfaces/config.interface';

export default class YoutubeMediaSearchProvider implements MediaProviderStrategy {
  constructor(private readonly appConfig: Config) {}

  search(term: string): Media[] {
    console.info(`[YouTube] Searching for ${term}.`);
    return [];
  }
}
