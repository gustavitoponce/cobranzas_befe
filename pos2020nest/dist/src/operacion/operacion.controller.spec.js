"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const operacion_controller_1 = require("./operacion.controller");
describe('Operacion Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [operacion_controller_1.OperacionController],
        }).compile();
        controller = module.get(operacion_controller_1.OperacionController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=operacion.controller.spec.js.map