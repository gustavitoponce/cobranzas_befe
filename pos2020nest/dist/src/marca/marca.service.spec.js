"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const marca_service_1 = require("./marca.service");
describe('MarcaService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [marca_service_1.MarcaService],
        }).compile();
        service = module.get(marca_service_1.MarcaService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=marca.service.spec.js.map