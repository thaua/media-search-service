import { Config } from '@infrastructure/data/interfaces/config.interface';

export const AppConfig: Config = {
  serverPort: process.env.PORT || '3000',
  minSearchTerm: Number(process.env.MIN_SEARCH_TERM || 3),
  maxResults: Number(process.env.MAX_RESULTS || 10),
  youtube: { token: process.env.YOUTUBE_TOKEN || '' },
  spotify: { token: process.env.SPOTIFY_TOKEN || '' },
};