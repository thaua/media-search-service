import express from 'express';
import SearchMediaUseCase from '@application/usecases/search-media-usecase';
import { expressServer } from '@presentation/express/server';

const mockSearchMediaUseCase = {
  search: jest.fn(),
};

jest.mock('express', () => {
  const expressMock = {
    get: jest.fn(),
    listen: jest.fn(),
  };
  return jest.fn(() => expressMock);
});

describe('expressServer', () => {
  it('should create express app with routes', () => {
    expressServer(mockSearchMediaUseCase as unknown as SearchMediaUseCase);

    expect(express().get).toHaveBeenCalledWith('/provider', expect.any(Function));
    expect(express().get).toHaveBeenCalledWith('/provider/:provider/search', expect.any(Function));
    expect(express().listen).toHaveBeenCalled();
  });
});
