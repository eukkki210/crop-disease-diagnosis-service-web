import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
      const mockResponse = {
        send: (data: string) => data,
      };

      const response = appController.getRoot(mockResponse);
      expect(response).toContain('Welcome to the main page');
    });
  });
});
