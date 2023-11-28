import Media from '@domain/media';
import { MediaProviderType } from '@application/types/media-provider.type';
import MediaProviderStrategyFactory from '@application/factories/media-provider-strategy-factory';
import { Config } from '@application/interfaces/config.interface';
import { RequiredAttributeUseCaseError } from '@application/usecases/exceptions/required-attribute.use-case-error';
import { AttributeLengthUseCaseError } from '@application/usecases/exceptions/attribute-length.use-case-error';
import MediaProviderStrategy from '@application/interfaces/media-provider-strategy.interface';
import { InvalidProviderUseCaseError } from '@application/usecases/exceptions/invalid-provider.use-case-error';

export default class SearchMediaUseCase {
  constructor(
    private readonly appConfig: Config,
    private readonly mediaProviderStrategyFactory: MediaProviderStrategyFactory,
  ) {}

  async search(provider: MediaProviderType, term: string): Promise<Media[]> {
    const providerStrategy: MediaProviderStrategy | null =
      this.mediaProviderStrategyFactory.createProvider(provider);

    if (!providerStrategy) {
      throw new InvalidProviderUseCaseError(provider);
    }

    if (!term) {
      throw new RequiredAttributeUseCaseError('term');
    }

    if (term.length < this.appConfig.minSearchTerm) {
      throw new AttributeLengthUseCaseError('term', this.appConfig.minSearchTerm);
    }

    return await providerStrategy!.search(term);
  }
}
