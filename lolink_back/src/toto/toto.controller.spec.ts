import { Test, TestingModule } from '@nestjs/testing';
import { TotoController } from './toto.controller';

describe('TotoController', () => {
  let controller: TotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TotoController],
    }).compile();

    controller = module.get<TotoController>(TotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
