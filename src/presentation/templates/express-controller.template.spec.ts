import express from 'express';
import { HttpResponseError } from '@presentation/response/http-response-error';
import { ExpressControllerTemplate } from '@presentation/templates/express-controller.template';
import { UseCaseError } from '../../core/exceptions/use-case.error';
import { InfrastructureError } from '@infrastructure/exceptions/infrastructure.error';

class MockExpressController extends ExpressControllerTemplate<any> {
  executeUseCase(): any {
    return {};
  }
}

class MockedUseCaseError extends UseCaseError {}
class MockedInfrastructureError extends InfrastructureError {}

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
    const useCaseError = new MockedUseCaseError('Error message');

    jest.spyOn(mockExpressController, 'executeUseCase').mockImplementation(() => {
      throw useCaseError;
    });

    await mockExpressController.handle(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(new HttpResponseError(useCaseError));
  });

  it('should handle InfrastructureError and return a 502 response', async () => {
    const mockedErrorDetails = new Error('test');
    const mockedErrorMessage = 'Error message';
    const infrastructureError = new MockedInfrastructureError(
      mockedErrorMessage,
      mockedErrorDetails,
    );

    jest.spyOn(mockExpressController, 'executeUseCase').mockImplementation(() => {
      throw infrastructureError;
    });

    await mockExpressController.handle(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(502);
    expect(mockResponse.json).toHaveBeenCalledWith(new HttpResponseError(infrastructureError));
  });

  it('should handle other exceptions and return a 500 response', async () => {
    const otherError = new Error('Some unexpected error');
    jest.spyOn(mockExpressController, 'executeUseCase').mockImplementation(() => {
      throw otherError;
    });

    await mockExpressController.handle(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      new HttpResponseError({ message: 'Internal Server Error.' } as Error),
    );
    expect(console.error).toHaveBeenCalledWith(otherError);
  });
});
