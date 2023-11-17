import Media from '@domain/media';
import { MediaProviderType } from '@domain/media-provider.type';
import MediaProviderStrategyFactory from '@application/factories/media-provider-strategy-factory';
import { Config } from '@infrastructure/data/interfaces/config.interface';
import { RequiredAttributeUseCaseError } from '@application/usecases/exceptions/required-attribute.use-case-error';
import { AttributeLengthUseCaseError } from '@application/usecases/exceptions/attribute-length.use-case-error';
import MediaProviderStrategy from '@application/strategies/media-provider-strategy.interface';
import { InvalidProviderUseCaseError } from '@application/usecases/exceptions/invalid-provider.use-case-error';

export default class SearchMediaUseCase {
  constructor(
    private readonly appConfig: Config,
    private readonly mediaProviderStrategyFactory: MediaProviderStrategyFactory,
  ) {}

  search(provider: MediaProviderType, term: string): Media[] {
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

    return providerStrategy!.search(term);
  }
}
