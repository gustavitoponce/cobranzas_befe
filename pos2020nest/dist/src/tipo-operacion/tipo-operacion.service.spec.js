"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const tipo_operacion_service_1 = require("./tipo-operacion.service");
describe('TipoOperacionService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [tipo_operacion_service_1.TipoOperacionService],
        }).compile();
        service = module.get(tipo_operacion_service_1.TipoOperacionService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=tipo-operacion.service.spec.js.map