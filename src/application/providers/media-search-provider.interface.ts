import Media from '@domain/media';

export default interface MediaSearchProvider {
  search(term: string): Media[];
}
