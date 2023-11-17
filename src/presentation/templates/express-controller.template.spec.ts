import express from 'express';
import { HttpResponseError } from '@presentation/response/http-response-error';
import { ExpressControllerTemplate } from '@presentation/templates/express-controller.template';
import { UseCaseError } from '../../core/exceptions/use-case.error';

class MockExpressController extends ExpressControllerTemplate<any> {
  executeUseCase(): any {
    return {};
  }
}

class MockedUseCaseError extends UseCaseError {}

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

  it('should handle the request and return the result', () => {
    mockExpressController.handle(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalled();
  });

  it('should handle UseCaseError and return a 400 response', () => {
    const useCaseError = new MockedUseCaseError('Error message');

    jest.spyOn(mockExpressController, 'executeUseCase').mockImplementation(() => {
      throw useCaseError;
    });

    mockExpressController.handle(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(new HttpResponseError(useCaseError));
  });

  it('should handle other exceptions and return a 500 response', () => {
    const otherError = new Error('Some unexpected error');
    jest.spyOn(mockExpressController, 'executeUseCase').mockImplementation(() => {
      throw otherError;
    });

    mockExpressController.handle(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      new HttpResponseError({ message: 'Internal Server Error.' } as Error),
    );
    expect(console.error).toHaveBeenCalledWith(otherError);
  });
});
