import { Test, TestingModule } from '@nestjs/testing';
import { TipoOperacionController } from './tipo-operacion.controller';

describe('TipoOperacion Controller', () => {
  let controller: TipoOperacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoOperacionController],
    }).compile();

    controller = module.get<TipoOperacionController>(TipoOperacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
