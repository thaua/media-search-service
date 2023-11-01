import { Provider } from '@domain/provider';

export default class ListProviderUseCase {
  list(): string[] {
    return Object.keys(Provider);
  }
}
