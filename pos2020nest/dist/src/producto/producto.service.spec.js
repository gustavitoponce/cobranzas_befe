"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const producto_service_1 = require("./producto.service");
describe('ProductoService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [producto_service_1.ProductoService],
        }).compile();
        service = module.get(producto_service_1.ProductoService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=producto.service.spec.js.map