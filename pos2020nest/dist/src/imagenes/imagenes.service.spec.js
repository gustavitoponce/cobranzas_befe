"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const imagenes_service_1 = require("./imagenes.service");
describe('ImagenesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [imagenes_service_1.ImagenesService],
        }).compile();
        service = module.get(imagenes_service_1.ImagenesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=imagenes.service.spec.js.map