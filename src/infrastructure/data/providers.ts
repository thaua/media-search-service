import SpotifyMediaSearchProvider from '@infrastructure/providers/spotify-media-search.provider';
import YoutubeMediaSearchProvider from '@infrastructure/providers/youtube-media-search.provider';
import { ProviderListType } from '@domain/provider-list.type';

export const Providers: ProviderListType = {
  youtube: YoutubeMediaSearchProvider,
  spotify: SpotifyMediaSearchProvider,
};
