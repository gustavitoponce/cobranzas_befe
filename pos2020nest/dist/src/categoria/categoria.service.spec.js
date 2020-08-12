"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const categoria_service_1 = require("./categoria.service");
describe('CategoriaService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [categoria_service_1.CategoriaService],
        }).compile();
        service = module.get(categoria_service_1.CategoriaService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=categoria.service.spec.js.map