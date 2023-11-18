import { SpotifyResponseItemThumbnail } from '@infrastructure/providers/interfaces/spotify-response-item-thumbnail.interface';
import { SpotifyResponseItemArtist } from '@infrastructure/providers/interfaces/spotify-response-item-artist.interface';

export interface SpotifyResponseItem {
  id: string;
  name: string;
  artists: SpotifyResponseItemArtist[];
  album: {
    images: SpotifyResponseItemThumbnail[];
  };
}
