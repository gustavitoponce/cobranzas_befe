"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const unidad_service_1 = require("./unidad.service");
describe('UnidadService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [unidad_service_1.UnidadService],
        }).compile();
        service = module.get(unidad_service_1.UnidadService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=unidad.service.spec.js.map