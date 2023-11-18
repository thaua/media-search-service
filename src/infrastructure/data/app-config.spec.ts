import { Config } from '@infrastructure/data/interfaces/config.interface';

describe('AppConfig', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('creating', () => {
    const mockedServerPort: string | undefined = '1000';
    const mockedMinSearchTerm: number | undefined = 5;
    const mockedMaxResults: number | undefined = 20;
    const mockedYoutubeUrl: string | undefined = 'youtubeUrlTest';
    const mockedYoutubeToken: string | undefined = 'youtubeTokenTest';
    const mockedSpotifyUrl: string | undefined = 'spotifyUrl';
    const mockedSpotifyTokenUrl: string | undefined = 'spotifyTokenUrl';
    const mockedSpotifyClientId: string | undefined = 'spotifyClientId';
    const mockedSpotifyClientSecret: string | undefined = 'spotifyClientSecret';

    let AppConfig: Config;

    beforeEach(() => {
      process.env.PORT = mockedServerPort;
      process.env.MIN_SEARCH_TERM = String(mockedMinSearchTerm);
      process.env.MAX_RESULTS = String(mockedMaxResults);
      process.env.YOUTUBE_URL = mockedYoutubeUrl;
      process.env.YOUTUBE_TOKEN = mockedYoutubeToken;
      process.env.SPOTIFY_URL = mockedSpotifyUrl;
      process.env.SPOTIFY_TOKEN_URL = mockedSpotifyTokenUrl;
      process.env.SPOTIFY_CLIENT_ID = mockedSpotifyClientId;
      process.env.SPOTIFY_CLIENT_SECRET = mockedSpotifyClientSecret;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      AppConfig = require('@infrastructure/data/app-config').AppConfig;
    });

    describe('with environment variables', () => {
      it('defines object', async () => {
        expect(AppConfig).toBeDefined();
      });

      it('defines port', async () => {
        expect(AppConfig.serverPort).toEqual(mockedServerPort);
      });

      it('defines minSearchTerm', async () => {
        expect(AppConfig.minSearchTerm).toEqual(mockedMinSearchTerm);
      });

      it('defines maxResults', async () => {
        expect(AppConfig.maxResults).toEqual(mockedMaxResults);
      });

      it('defines youtube url', async () => {
        expect(AppConfig.youtube.url).toEqual(mockedYoutubeUrl);
      });

      it('defines youtube token', async () => {
        expect(AppConfig.youtube.token).toEqual(mockedYoutubeToken);
      });

      it('defines spotify url', async () => {
        expect(AppConfig.spotify.url).toEqual(mockedSpotifyUrl);
      });

      it('defines spotify token url', async () => {
        expect(AppConfig.spotify.tokenUrl).toEqual(mockedSpotifyTokenUrl);
      });

      it('defines spotify client id', async () => {
        expect(AppConfig.spotify.clientId).toEqual(mockedSpotifyClientId);
      });

      it('defines spotify client secret', async () => {
        expect(AppConfig.spotify.clientSecret).toEqual(mockedSpotifyClientSecret);
      });
    });
  });

  describe('with no environment variables', () => {
    let AppConfig: Config;

    beforeEach(() => {
      delete process.env.PORT;
      delete process.env.MIN_SEARCH_TERM;
      delete process.env.MAX_RESULTS;
      delete process.env.YOUTUBE_URL;
      delete process.env.YOUTUBE_TOKEN;
      delete process.env.SPOTIFY_URL;
      delete process.env.SPOTIFY_TOKEN_URL;
      delete process.env.SPOTIFY_CLIENT_ID;
      delete process.env.SPOTIFY_CLIENT_SECRET;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      AppConfig = require('@infrastructure/data/app-config').AppConfig;
    });

    it('defines object', async () => {
      expect(AppConfig).toBeDefined();
    });

    it('defines port with default value', async () => {
      expect(AppConfig.serverPort).toEqual('3000');
    });

    it('defines minSearchTerm with default value', async () => {
      expect(AppConfig.minSearchTerm).toEqual(3);
    });

    it('defines maxResults with default value', async () => {
      expect(AppConfig.maxResults).toEqual(10);
    });

    it('defines youtube url with default value', async () => {
      expect(AppConfig.youtube.url).toBe('');
    });

    it('defines youtube token with default value', async () => {
      expect(AppConfig.youtube.token).toBe('');
    });

    it('defines spotify url with default value', async () => {
      expect(AppConfig.spotify.url).toBe('');
    });

    it('defines spotify token url with default value', async () => {
      expect(AppConfig.spotify.tokenUrl).toBe('');
    });

    it('defines spotify client id with default value', async () => {
      expect(AppConfig.spotify.clientId).toBe('');
    });

    it('defines spotify client secret with default value', async () => {
      expect(AppConfig.spotify.clientSecret).toBe('');
    });
  });
});
