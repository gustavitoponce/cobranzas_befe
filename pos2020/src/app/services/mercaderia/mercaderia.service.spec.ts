import { TestBed } from '@angular/core/testing';

import { MercaderiaService } from './mercaderia.service';

describe('MercaderiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MercaderiaService = TestBed.get(MercaderiaService);
    expect(service).toBeTruthy();
  });
});
