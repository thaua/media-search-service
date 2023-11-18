import MediaProviderStrategy from '@application/strategies/media-provider-strategy.interface';
import Media from '@domain/media';
import { Config } from '@infrastructure/data/interfaces/config.interface';
import { SpotifyResponseToken } from '@infrastructure/providers/interfaces/spotify-response-token.interface';
import { SpotifyResponseError } from '@infrastructure/providers/interfaces/spotify-response-error.interface';
import { SpotifyProviderError } from '@infrastructure/providers/exceptions/spotify-provider.error';
import { SpotifyResponse } from '@infrastructure/providers/interfaces/spotify-response-tracks.interface';
import { SpotifyResponseItem } from '@infrastructure/providers/interfaces/spotify-response-item.interface';

export default class SpotifyMediaSearchProvider implements MediaProviderStrategy {
  private static nextTokenExpirationTimestamp: number | undefined;
  private static currentAuthenticationToken: string | undefined;

  constructor(private readonly appConfig: Config) {}

  async search(term: string): Promise<Media[]> {
    const authenticationToken = await this.getAuthenticationToken();
    const url = `${this.appConfig.spotify.url}?q=${term}&type=track&limit=${this.appConfig.maxResults}`;

    return await fetch(url, {
      headers: {
        Authorization: `Bearer ${authenticationToken}`,
      },
    })
      .then((response: Response) =>
        response.json().then((spotifyResponse: SpotifyResponse | SpotifyResponseError) => {
          if ((spotifyResponse as SpotifyResponseError).error) {
            throw new SpotifyProviderError((spotifyResponse as SpotifyResponseError).error);
          } else {
            return (spotifyResponse as SpotifyResponse).tracks.items.map((i) =>
              this.mapSpotifyResponseToApplicationFormat(i),
            );
          }
        }),
      )
      .catch((e) => {
        throw new SpotifyProviderError(e);
      });
  }

  private async getAuthenticationToken(): Promise<string> {
    if (this.needsAuthentication()) {
      await this.updateToken();
    }

    return SpotifyMediaSearchProvider.currentAuthenticationToken!;
  }

  private needsAuthentication(): boolean {
    return (
      !SpotifyMediaSearchProvider.currentAuthenticationToken ||
      !SpotifyMediaSearchProvider.nextTokenExpirationTimestamp ||
      SpotifyMediaSearchProvider.nextTokenExpirationTimestamp <= new Date().getTime()
    );
  }

  private async updateToken(): Promise<void> {
    await fetch(this.appConfig.spotify.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=client_credentials&client_id=${this.appConfig.spotify.clientId}&client_secret=${this.appConfig.spotify.clientSecret}`,
    })
      .then((response: Response) =>
        response
          .json()
          .then((spotifyTokenResponse: SpotifyResponseToken | SpotifyResponseError) => {
            if ((spotifyTokenResponse as SpotifyResponseError).error) {
              throw new SpotifyProviderError((spotifyTokenResponse as SpotifyResponseError).error);
            } else {
              const expiresIn = (spotifyTokenResponse as SpotifyResponseToken).expires_in;

              SpotifyMediaSearchProvider.nextTokenExpirationTimestamp =
                new Date().getTime() + (expiresIn - 10) * 1000;
              SpotifyMediaSearchProvider.currentAuthenticationToken = (
                spotifyTokenResponse as SpotifyResponseToken
              ).access_token;
            }
          }),
      )
      .catch((e) => {
        throw new SpotifyProviderError(e);
      });
  }

  private mapSpotifyResponseToApplicationFormat(spotifyResponseItem: SpotifyResponseItem): Media {
    return {
      code: spotifyResponseItem.id,
      title: `${spotifyResponseItem.artists.map((a) => a.name).join(', ')} - ${
        spotifyResponseItem.name
      }`,
      thumbnail: spotifyResponseItem.album.images[spotifyResponseItem.album.images.length - 1].url,
      time: 0,
    } as Media;
  }
}
