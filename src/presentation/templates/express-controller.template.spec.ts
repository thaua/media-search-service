import express from 'express';
import { ExpressControllerTemplate } from '@presentation/templates/express-controller.template';
import { UseCaseError } from '../../core/exceptions/use-case.error';
import { InfrastructureError } from '@infrastructure/exceptions/infrastructure.error';

class MockExpressController extends ExpressControllerTemplate<any> {
  executeUseCase(): any {
    return {};
  }
}

class MockedUseCaseError extends UseCaseError {
  constructor() {
    super('Mocked UseCase Error.');
    this.name = 'MockedUseCaseError';
  }
}

class MockedInfrastructureError extends InfrastructureError {
  constructor(public readonly details: Error) {
    super('Mocked Infrastructure Error.', details);
    this.name = 'MockedInfrastructureError';
  }
}

describe('ExpressControllerTemplate', () => {
  let mockExpressController: MockExpressController;
  let mockRequest: express.Request;
  let mockResponse: express.Response;

  beforeEach(() => {
    mockExpressController = new MockExpressController();

    mockRequest = {} as express.Request;
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as express.Response;
    console.error = jest.fn();
  });

  it('should handle the request and return the result', async () => {
    await mockExpressController.handle(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalled();
  });

  it('should handle UseCaseError and return a 400 response', async () => {
    const useCaseError = new MockedUseCaseError();

    jest.spyOn(mockExpressController, 'executeUseCase').mockImplementation(() => {
      throw useCaseError;
    });

    await mockExpressController.handle(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: { message: 'Mocked UseCase Error.', name: 'MockedUseCaseError' },
    });
  });

  it('should handle InfrastructureError and return a 502 response', async () => {
    const mockedErrorDetails = new Error('test');
    const infrastructureError = new MockedInfrastructureError(mockedErrorDetails);

    jest.spyOn(mockExpressController, 'executeUseCase').mockImplementation(() => {
      throw infrastructureError;
    });

    await mockExpressController.handle(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(502);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: { message: 'Mocked Infrastructure Error.', name: 'MockedInfrastructureError' },
    });
  });

  it('should handle other exceptions and return a 500 response', async () => {
    const otherError = new Error('Some unexpected error');
    jest.spyOn(mockExpressController, 'executeUseCase').mockImplementation(() => {
      throw otherError;
    });

    await mockExpressController.handle(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: { message: 'Internal Server Error.' },
    });
    expect(console.error).toHaveBeenCalledWith(otherError);
  });
});
