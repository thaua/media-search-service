import { SpotifyResponseItem } from '@infrastructure/providers/interfaces/spotify-response-item.interface';

export interface SpotifyResponse {
  tracks: {
    items: SpotifyResponseItem[];
  };
}
