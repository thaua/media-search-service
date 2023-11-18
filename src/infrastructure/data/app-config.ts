import { Config } from '@infrastructure/data/interfaces/config.interface';

export const AppConfig: Config = {
  serverPort: process.env.PORT || '3000',
  minSearchTerm: Number(process.env.MIN_SEARCH_TERM || 3),
  maxResults: Number(process.env.MAX_RESULTS || 10),
  youtube: { url: process.env.YOUTUBE_URL || '', token: process.env.YOUTUBE_TOKEN || '' },
  spotify: {
    url: process.env.SPOTIFY_URL || '',
    tokenUrl: process.env.SPOTIFY_TOKEN_URL || '',
    clientId: process.env.SPOTIFY_CLIENT_ID || '',
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
  },
};
