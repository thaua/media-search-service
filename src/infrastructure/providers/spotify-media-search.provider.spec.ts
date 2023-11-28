import SpotifyMediaSearchProvider from '@infrastructure/providers/spotify-media-search.provider';
import { Config } from '@application/interfaces/config.interface';
import { SpotifyResponseItem } from '@infrastructure/providers/interfaces/spotify-response-item.interface';
import { SpotifyResponseItemArtist } from '@infrastructure/providers/interfaces/spotify-response-item-artist.interface';
import { SpotifyResponseItemThumbnail } from '@infrastructure/providers/interfaces/spotify-response-item-thumbnail.interface';
import { SpotifyResponseToken } from '@infrastructure/providers/interfaces/spotify-response-token.interface';
import { SpotifyResponseError } from '@infrastructure/providers/interfaces/spotify-response-error.interface';
import { SpotifyProviderError } from '@infrastructure/providers/exceptions/spotify-provider.error';
import { SpotifyResponse } from '@infrastructure/providers/interfaces/spotify-response-tracks.interface';
import Media from '@domain/media';

const mockFetchResponse = (v: any) => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(v),
  });
};

const mockFetchError = (v: any) => {
  global.fetch = jest.fn().mockRejectedValue({
    json: jest.fn().mockResolvedValue(v),
  });
};

describe('SpotifyMediaSearchProvider', () => {
  let provider: SpotifyMediaSearchProvider;
  let mockedConfig: Config;
  let mockAccessToken: string;
  let mockDate: number;
  let mockExpiresIn: number;

  beforeEach(() => {
    mockedConfig = {
      spotify: {
        url: 'http://url',
        tokenUrl: 'http://token-url',
        clientId: 'clientId',
        clientSecret: 'clientSecret',
      },
      maxResults: 10,
    } as Config;
    mockAccessToken = 'mockAccessToken';
    mockDate = 1637312400000;
    mockExpiresIn = 3600;

    global.Date = jest.fn(() => ({
      getTime: jest.fn(() => mockDate),
    })) as any;

    provider = new SpotifyMediaSearchProvider(mockedConfig);
  });

  describe('searching', () => {
    let mockAuthenticationToken: string;
    let mockSpotifyResponse: SpotifyResponse;
    let mockMappedMedia: Media;
    let mockSpotifyItem: SpotifyResponseItem;
    let term: string;
    let result: Media[];

    beforeEach(async () => {
      term = 'term';
      mockAuthenticationToken = 'mockAccessToken';
      mockSpotifyItem = {
        id: '12345',
        artists: [{} as SpotifyResponseItemArtist],
        album: {},
        name: 'name',
      } as SpotifyResponseItem;

      mockSpotifyResponse = {
        tracks: {
          items: [mockSpotifyItem],
        },
      } as SpotifyResponse;

      mockMappedMedia = {
        code: 'code',
        time: 0,
        thumbnail: 'http://thumbnail',
        title: 'title',
      } as Media;

      (provider as any).getAuthenticationToken = jest
        .fn()
        .mockResolvedValue(mockAuthenticationToken);
      (provider as any).mapSpotifyResponseToApplicationFormat = jest
        .fn()
        .mockReturnValue(mockMappedMedia);

      mockFetchResponse(mockSpotifyResponse);
    });

    describe('with error response', () => {
      describe('on http request', () => {
        let mockedErrorResponse: Error;

        beforeEach(() => {
          mockedErrorResponse = new Error('spotify request error');

          mockFetchError(mockedErrorResponse);
        });

        it('should throw SpotifyProviderError', async () => {
          return expect(async () => {
            await provider.search(term);
          }).rejects.toThrowError(new SpotifyProviderError(mockedErrorResponse));
        });
      });

      describe('on body response', () => {
        let mockedErrorResponse: SpotifyResponseError;

        beforeEach(() => {
          mockedErrorResponse = {
            error: { message: 'error from body' },
          } as SpotifyResponseError;

          mockFetchResponse(mockedErrorResponse);
        });

        it('should throw SpotifyProviderError', async () => {
          return expect(async () => {
            await provider.search(term);
          }).rejects.toThrowError(new SpotifyProviderError(mockedErrorResponse));
        });
      });
    });

    describe('with success response', () => {
      beforeEach(async () => {
        result = await provider.search(term);
      });

      it('should return mapped medias', () => {
        expect(result).toStrictEqual([mockMappedMedia]);
      });

      it('should call url correctly', () => {
        expect(global.fetch).toHaveBeenCalledWith(
          `${mockedConfig.spotify.url}?q=${term}&type=track&limit=${mockedConfig.maxResults}`,
          {
            headers: {
              Authorization: `Bearer ${mockAuthenticationToken}`,
            },
          },
        );
      });

      it('should call  method to get authentication correctly', () => {
        expect((provider as any).getAuthenticationToken).toHaveBeenCalled();
      });

      it('should call mapper', () => {
        expect((provider as any).mapSpotifyResponseToApplicationFormat).toHaveBeenCalledWith(
          mockSpotifyItem,
        );
      });
    });
  });

  describe('#getAuthenticationToken', () => {
    describe('on error getting token', () => {
      describe('from http request', () => {
        it('should throw SpotifyProviderError', async () => {
          (SpotifyMediaSearchProvider as any).nextTokenExpirationTimestamp = undefined;
          (SpotifyMediaSearchProvider as any).currentAuthenticationToken = undefined;

          const mockTokenError = new Error('spotifyTokenError');

          mockFetchError(mockTokenError);

          return expect(async () => {
            await (provider as any).getAuthenticationToken();
          }).rejects.toThrowError(new SpotifyProviderError(mockTokenError));
        });
      });

      describe('from body response', () => {
        it('should throw SpotifyProviderError', async () => {
          const mockedErrorBody = { message: 'bodyError' };

          (SpotifyMediaSearchProvider as any).nextTokenExpirationTimestamp = undefined;
          (SpotifyMediaSearchProvider as any).currentAuthenticationToken = undefined;

          const mockTokenResponse: SpotifyResponseError = {
            error: mockedErrorBody,
          } as SpotifyResponseError;

          mockFetchResponse(mockTokenResponse);

          return expect(async () => {
            await (provider as any).getAuthenticationToken();
          }).rejects.toThrowError(new SpotifyProviderError(mockedErrorBody));
        });
      });
    });

    describe('on success getting token', () => {
      let mockTokenResponse: SpotifyResponseToken;

      beforeEach(() => {
        mockTokenResponse = {
          access_token: mockAccessToken,
          expires_in: mockExpiresIn,
        } as SpotifyResponseToken;

        mockFetchResponse(mockTokenResponse);
      });

      describe('when no token exist yet', () => {
        it('should get authentication token successfully', async () => {
          (SpotifyMediaSearchProvider as any).nextTokenExpirationTimestamp = undefined;
          (SpotifyMediaSearchProvider as any).currentAuthenticationToken = undefined;

          const token = await (provider as any).getAuthenticationToken();

          expect(token).toEqual(mockAccessToken);
          expect((SpotifyMediaSearchProvider as any).nextTokenExpirationTimestamp).toEqual(
            mockDate + (mockExpiresIn - 10) * 1000,
          );
          expect((SpotifyMediaSearchProvider as any).currentAuthenticationToken).toEqual(
            mockAccessToken,
          );
          expect(global.fetch).toHaveBeenCalledWith(mockedConfig.spotify.tokenUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=client_credentials&client_id=${mockedConfig.spotify.clientId}&client_secret=${mockedConfig.spotify.clientSecret}`,
          });
        });
      });

      describe('when there is already a token', () => {
        describe('and time expired', () => {
          it('should get authentication token successfully', async () => {
            (SpotifyMediaSearchProvider as any).nextTokenExpirationTimestamp = mockDate - 1;
            (SpotifyMediaSearchProvider as any).currentAuthenticationToken = 'alreadyHaveToken';

            const token = await (provider as any).getAuthenticationToken();

            expect(token).toEqual(mockTokenResponse.access_token);
            expect((SpotifyMediaSearchProvider as any).currentAuthenticationToken).toEqual(
              mockAccessToken,
            );
            expect((SpotifyMediaSearchProvider as any).nextTokenExpirationTimestamp).toEqual(
              mockDate + (mockExpiresIn - 10) * 1000,
            );
            expect(global.fetch).toHaveBeenCalledWith(mockedConfig.spotify.tokenUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: `grant_type=client_credentials&client_id=${mockedConfig.spotify.clientId}&client_secret=${mockedConfig.spotify.clientSecret}`,
            });
          });
        });

        describe('but time not expired', () => {
          it('should get authentication token successfully', async () => {
            const currentToken = 'alreadyHaveToken';

            (SpotifyMediaSearchProvider as any).nextTokenExpirationTimestamp = mockDate + 100;
            (SpotifyMediaSearchProvider as any).currentAuthenticationToken = currentToken;

            const token = await (provider as any).getAuthenticationToken();

            expect(token).toEqual(currentToken);
            expect((SpotifyMediaSearchProvider as any).currentAuthenticationToken).toEqual(
              currentToken,
            );
            expect((SpotifyMediaSearchProvider as any).nextTokenExpirationTimestamp).toEqual(
              mockDate + 100,
            );
            expect(global.fetch).not.toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe('#mapSpotifyResponseToApplicationFormat', () => {
    it('should map Spotify response to application format', () => {
      const spotifyResponseItem: SpotifyResponseItem = {
        id: 'some-id',
        name: 'Some Song',
        artists: [
          { name: 'Artist 1' } as SpotifyResponseItemArtist,
          { name: 'Artist 2' } as SpotifyResponseItemArtist,
        ],
        album: {
          images: [
            { url: 'image-url-1' } as SpotifyResponseItemThumbnail,
            { url: 'image-url-2' } as SpotifyResponseItemThumbnail,
            { url: 'image-url-3' } as SpotifyResponseItemThumbnail,
          ],
        },
      };

      const result = (provider as any).mapSpotifyResponseToApplicationFormat(spotifyResponseItem);

      expect(result).toEqual({
        code: 'some-id',
        title: 'Artist 1, Artist 2 - Some Song',
        thumbnail: 'image-url-3',
        time: 0,
      });
    });
  });
});
