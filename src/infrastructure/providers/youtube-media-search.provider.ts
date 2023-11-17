import MediaProviderStrategy from '@application/strategies/media-provider-strategy.interface';
import Media from '@domain/media';
import { Config } from '@infrastructure/data/interfaces/config.interface';
import { YoutubeResponse } from '@infrastructure/providers/interfaces/youtube-response.interface';
import { YoutubeResponseItem } from '@infrastructure/providers/interfaces/youtube-response-item.interface';
import { YoutubeProviderError } from '@infrastructure/providers/exceptions/youtube-provider.error';

export default class YoutubeMediaSearchProvider implements MediaProviderStrategy {
  constructor(private readonly appConfig: Config) {}

  async search(term: string): Promise<Media[]> {
    console.info(`[YouTube] Searching for ${term}.`);

    const url = `${this.appConfig.youtube.url}?q=${term}&part=snippet&key=${this.appConfig.youtube.token}&type=video&maxResults=${this.appConfig.maxResults}`;

    return await fetch(url)
      .then((response: Response) =>
        response
          .json()
          .then((youtubeResponse: YoutubeResponse) =>
            youtubeResponse.items.map(this.mapYoutubeResponseToApplicationFormat),
          ),
      )
      .catch((e) => {
        throw new YoutubeProviderError(e);
      });
  }

  private mapYoutubeResponseToApplicationFormat(youtubeResponseItem: YoutubeResponseItem): Media {
    return {
      code: youtubeResponseItem.id.videoId,
      title: youtubeResponseItem.snippet.title,
      thumbnail: youtubeResponseItem.snippet.thumbnails.default.url,
      time: 0,
    } as Media;
  }
}
