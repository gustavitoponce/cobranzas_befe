import { Empresa.Entity } from './empresa.entity';

describe('Empresa.Entity', () => {
  it('should be defined', () => {
    expect(new Empresa.Entity()).toBeDefined();
  });
});
