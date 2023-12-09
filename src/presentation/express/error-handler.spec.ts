import { UseCaseError } from '../../core/exceptions/use-case.error';
import { InfrastructureError } from '@infrastructure/exceptions/infrastructure.error';
import { Response } from 'express';
import { expressErrorHandler } from '@presentation/express/error-handler';

const mockResponse: any = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(),
};

class MockedUseCaseError extends UseCaseError {}

class MockedInfrastructureError extends InfrastructureError {}

describe('expressErrorHandler', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle UseCaseError', () => {
    const useCaseError = new MockedUseCaseError('UseCaseError message');

    expressErrorHandler(useCaseError, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: useCaseError });
  });

  it('should handle InfrastructureError', () => {
    const mockedMessage = 'InfrastructureError message';
    const errorDetails = new Error('details');
    const infrastructureError = new MockedInfrastructureError(mockedMessage, errorDetails);

    expressErrorHandler(infrastructureError, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(502);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: infrastructureError });
    expect(console.error).toHaveBeenCalledWith(mockedMessage, errorDetails);
  });

  it('should handle unknown errors', () => {
    const unknownError = new Error('Unknown error message');

    expressErrorHandler(unknownError, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error.' });
    expect(console.error).toHaveBeenCalledWith('Unknown error caught.', unknownError);
  });
});
