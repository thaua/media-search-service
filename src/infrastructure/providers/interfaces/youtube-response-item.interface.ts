import { YoutubeResponseItemThumbnail } from '@infrastructure/providers/interfaces/youtube-response-item-thumbnail.interface';

export interface YoutubeResponseItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    publishTime: string;
    channelId: string;
    channelTitle: string;
    title: string;
    description: string;
    liveBroadcastContent: string;
    thumbnails: {
      default: YoutubeResponseItemThumbnail;
      medium: YoutubeResponseItemThumbnail;
      high: YoutubeResponseItemThumbnail;
    };
  };
}
