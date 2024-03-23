import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { RootTestModule } from './root-test.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RootTestModule],
      controllers: [AppController],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
