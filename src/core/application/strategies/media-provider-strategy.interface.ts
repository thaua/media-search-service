import Media from '@domain/media';

export default interface MediaProviderStrategy {
  search(term: string): Promise<Media[]>;
}
