import { Config } from '@infrastructure/data/interfaces/config.interface';

describe('AppConfig', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('creating', () => {
    const mockedServerPort: string | undefined = '1000';
    const mockedMinSearchTerm: number | undefined = 5;
    const mockedMaxResults: number | undefined = 20;
    const mockedYoutubeToken: string | undefined = 'youtubeTokenTest';
    const mockedSpotifyToken: string | undefined = 'spotifyTokenTest';

    let AppConfig: Config;

    beforeEach(() => {
      process.env.PORT = mockedServerPort;
      process.env.MIN_SEARCH_TERM = String(mockedMinSearchTerm);
      process.env.MAX_RESULTS = String(mockedMaxResults);
      process.env.YOUTUBE_TOKEN = mockedYoutubeToken;
      process.env.SPOTIFY_TOKEN = mockedSpotifyToken;

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

      it('defines youtube token', async () => {
        expect(AppConfig.youtube.token).toEqual(mockedYoutubeToken);
      });

      it('defines spotify token', async () => {
        expect(AppConfig.spotify.token).toEqual(mockedSpotifyToken);
      });
    });
  });

  describe('with no environment variables', () => {
    let AppConfig: Config;

    beforeEach(() => {
      delete process.env.PORT;
      delete process.env.MIN_SEARCH_TERM;
      delete process.env.MAX_RESULTS;
      delete process.env.YOUTUBE_TOKEN;
      delete process.env.SPOTIFY_TOKEN;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      AppConfig = require('@infrastructure/data/app-config').AppConfig;

      console.log(AppConfig);
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

    it('defines youtube token with default value', async () => {
      expect(AppConfig.youtube.token).toBe('');
    });

    it('defines spotify token with default value', async () => {
      expect(AppConfig.spotify.token).toBe('');
    });
  });
});
