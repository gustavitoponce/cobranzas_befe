"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const inventario_controller_1 = require("./inventario.controller");
describe('Inventario Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [inventario_controller_1.InventarioController],
        }).compile();
        controller = module.get(inventario_controller_1.InventarioController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=inventario.controller.spec.js.map