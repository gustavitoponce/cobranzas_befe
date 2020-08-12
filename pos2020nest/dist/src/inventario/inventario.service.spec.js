"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const inventario_service_1 = require("./inventario.service");
describe('InventarioService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [inventario_service_1.InventarioService],
        }).compile();
        service = module.get(inventario_service_1.InventarioService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=inventario.service.spec.js.map