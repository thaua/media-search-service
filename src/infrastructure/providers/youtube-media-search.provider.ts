import MediaSearchProvider from '@application/providers/media-search-provider.interface';
import Media from '@domain/media';

export default class YoutubeMediaSearchProvider implements MediaSearchProvider {
  search(term: string): Media[] {
    console.info(`Searching for ${term}.`);
    return [];
  }
}
