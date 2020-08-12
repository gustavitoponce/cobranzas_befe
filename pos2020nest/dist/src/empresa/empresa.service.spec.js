"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const empresa_service_1 = require("./empresa.service");
describe('EmpresaService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [empresa_service_1.EmpresaService],
        }).compile();
        service = module.get(empresa_service_1.EmpresaService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=empresa.service.spec.js.map