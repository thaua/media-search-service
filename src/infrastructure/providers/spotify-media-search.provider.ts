import MediaProviderStrategy from '@application/strategies/media-provider-strategy.interface';
import Media from '@domain/media';

export default class SpotifyMediaSearchProvider
  implements MediaProviderStrategy
{
  search(term: string): Media[] {
    console.info(`[Spotify] Searching for ${term}.`);
    return [];
  }
}
