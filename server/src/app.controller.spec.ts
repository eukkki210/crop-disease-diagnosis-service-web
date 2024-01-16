import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Response } from 'express';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the main page', () => {
      const mockResponse: Partial<Response> = {
        send: jest.fn(),
      };

      const response = appController.getRoot(mockResponse as Response);
      expect(response).toContain('Welcome to the main page');
    });
  });
});
