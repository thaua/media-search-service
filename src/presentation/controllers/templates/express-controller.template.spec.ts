import express from 'express';
import { RequiredFieldError } from '@presentation/exceptions/required-field.error';
import { HttpResponseError } from '@presentation/response/http-response-error';
import { ExpressControllerTemplate } from '@presentation/controllers/templates/express-controller.template';

class MockExpressController extends ExpressControllerTemplate<any> {
  executeUseCase(): any {
    return {};
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

  it('should handle the request and return the result', () => {
    mockExpressController.handle(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalled();
  });

  it('should handle RequiredFieldError and return a 400 response', () => {
    const requiredFieldError = new RequiredFieldError('exampleField');
    jest
      .spyOn(mockExpressController, 'executeUseCase')
      .mockImplementation(() => {
        throw requiredFieldError;
      });

    mockExpressController.handle(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      new HttpResponseError(`Query param 'exampleField' is missing.`),
    );
  });

  it('should handle other exceptions and return a 500 response', () => {
    const otherError = new Error('Some unexpected error');
    jest
      .spyOn(mockExpressController, 'executeUseCase')
      .mockImplementation(() => {
        throw otherError;
      });

    mockExpressController.handle(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      new HttpResponseError('Internal Server Error.'),
    );
    expect(console.error).toHaveBeenCalledWith(otherError);
  });
});
