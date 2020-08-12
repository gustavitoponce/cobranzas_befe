"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const unidad_controller_1 = require("./unidad.controller");
describe('Unidad Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [unidad_controller_1.UnidadController],
        }).compile();
        controller = module.get(unidad_controller_1.UnidadController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=unidad.controller.spec.js.map