import MediaProviderStrategy from '@application/strategies/media-provider-strategy.interface';
import Media from '@domain/media';

export default class YoutubeMediaSearchProvider
  implements MediaProviderStrategy
{
  search(term: string): Media[] {
    console.info(`[YouTube] Searching for ${term}.`);
    return [];
  }
}
