import { Test, TestingModule } from '@nestjs/testing';
import { TipoOperacionService } from './tipo-operacion.service';

describe('TipoOperacionService', () => {
  let service: TipoOperacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoOperacionService],
    }).compile();

    service = module.get<TipoOperacionService>(TipoOperacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
