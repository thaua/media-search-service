import YoutubeMediaSearchProvider from '@infrastructure/providers/youtube-media-search.provider';
import { Config } from '@infrastructure/data/interfaces/config.interface';
import Media from '@domain/media';
import { YoutubeResponse } from '@infrastructure/providers/interfaces/youtube-response.interface';
import { YoutubeProviderError } from '@infrastructure/providers/exceptions/youtube-provider.error';
import { YoutubeResponseError } from '@infrastructure/providers/interfaces/youtube-response-error.interface';

describe('YoutubeMediaSearchProvider', () => {
  let provider: YoutubeMediaSearchProvider;
  let mockedConfig: Config;
  let mockedTerm: string;
  let result: Media[];

  beforeEach(async () => {
    mockedTerm = 'test';
    mockedConfig = {
      maxResults: 100,
      youtube: {
        url: 'http://url',
        token: 'token',
      },
    } as Config;

    provider = new YoutubeMediaSearchProvider(mockedConfig);

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        items: [
          {
            id: { videoId: 'testVideoId1' },
            snippet: {
              title: 'testTitle1',
              description: 'testDescription1',
              thumbnails: {
                default: {
                  url: 'http://thumbnail1',
                  height: 10,
                  width: 10,
                },
              },
            },
          },
          {
            id: { videoId: 'testVideoId2' },
            snippet: {
              title: 'testTitle2',
              description: 'testDescription2',
              thumbnails: {
                default: {
                  url: 'http://thumbnail2',
                  height: 10,
                  width: 10,
                },
              },
            },
          },
        ],
      } as YoutubeResponse),
    } as any);

    result = await provider.search(mockedTerm);
  });

  it('should call correct url', async () => {
    const expectedUrl = `${mockedConfig.youtube.url}?q=${mockedTerm}&part=snippet&key=${mockedConfig.youtube.token}&type=video&maxResults=${mockedConfig.maxResults}`;

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
  });

  describe('with error response', () => {
    describe('on correct response', () => {
      let mockedError: Error;

      beforeEach(() => {
        mockedError = new Error('error');
        (global.fetch as jest.Mocked<any>).mockRejectedValue(mockedError);
      });

      it('should throw YoutubeProviderError', async () => {
        return expect(async () => {
          await provider.search(mockedTerm);
        }).rejects.toThrowError(new YoutubeProviderError(mockedError));
      });
    });

    describe('on exception', () => {
      let mockedErrorResponse: any;

      beforeEach(() => {
        mockedErrorResponse = {
          code: 400,
          message: 'test',
          details: 'details',
        };

        (global.fetch as jest.Mocked<any>).mockResolvedValue({
          json: jest.fn().mockResolvedValue({
            error: mockedErrorResponse,
          } as YoutubeResponseError),
        });
      });

      it('should throw YoutubeProviderError', async () => {
        return expect(async () => {
          await provider.search(mockedTerm);
        }).rejects.toThrowError(new YoutubeProviderError(mockedErrorResponse));
      });
    });
  });

  describe('with success response', () => {
    it('should return mapped medias', async () => {
      expect(result.length).toBe(2);
      expect(result[0]).toStrictEqual({
        code: 'testVideoId1',
        title: 'testTitle1',
        thumbnail: 'http://thumbnail1',
        time: 0,
      });
      expect(result[1]).toStrictEqual({
        code: 'testVideoId2',
        title: 'testTitle2',
        thumbnail: 'http://thumbnail2',
        time: 0,
      });
    });
  });
});
