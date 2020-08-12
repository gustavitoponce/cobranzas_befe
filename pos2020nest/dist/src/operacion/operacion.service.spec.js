"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const operacion_service_1 = require("./operacion.service");
describe('OperacionService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [operacion_service_1.OperacionService],
        }).compile();
        service = module.get(operacion_service_1.OperacionService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=operacion.service.spec.js.map