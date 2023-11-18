import MediaProviderStrategy from '@application/strategies/media-provider-strategy.interface';
import Media from '@domain/media';
import { Config } from '@infrastructure/data/interfaces/config.interface';
import { YoutubeResponse } from '@infrastructure/providers/interfaces/youtube-response.interface';
import { YoutubeResponseItem } from '@infrastructure/providers/interfaces/youtube-response-item.interface';
import { YoutubeProviderError } from '@infrastructure/providers/exceptions/youtube-provider.error';
import { YoutubeResponseError } from '@infrastructure/providers/interfaces/youtube-response-error.interface';

export default class YoutubeMediaSearchProvider implements MediaProviderStrategy {
  constructor(private readonly appConfig: Config) {}

  async search(term: string): Promise<Media[]> {
    const url = `${this.appConfig.youtube.url}?q=${term}&part=snippet&key=${this.appConfig.youtube.token}&type=video&maxResults=${this.appConfig.maxResults}`;

    return await fetch(url)
      .then((response: Response) =>
        response.json().then((youtubeResponse: YoutubeResponse | YoutubeResponseError) => {
          if ((youtubeResponse as YoutubeResponseError).error) {
            throw new YoutubeProviderError((youtubeResponse as YoutubeResponseError).error);
          } else {
            return (youtubeResponse as YoutubeResponse).items.map((i) =>
              this.mapYoutubeResponseToApplicationFormat(i),
            );
          }
        }),
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
