"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const documentacion_controller_1 = require("./documentacion.controller");
describe('Documentacion Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [documentacion_controller_1.DocumentacionController],
        }).compile();
        controller = module.get(documentacion_controller_1.DocumentacionController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=documentacion.controller.spec.js.map