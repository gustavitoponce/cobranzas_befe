"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const documentacion_service_1 = require("./documentacion.service");
describe('DocumentacionService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [documentacion_service_1.DocumentacionService],
        }).compile();
        service = module.get(documentacion_service_1.DocumentacionService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=documentacion.service.spec.js.map