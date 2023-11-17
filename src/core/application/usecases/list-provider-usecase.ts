import { ProviderListType } from '@domain/provider-list.type';

export default class ListProviderUseCase {
  constructor(private readonly providers: ProviderListType) {}

  list(): string[] {
    return Object.keys(this.providers);
  }
}
