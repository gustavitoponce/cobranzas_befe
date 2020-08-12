"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const producto_controller_1 = require("./producto.controller");
describe('Producto Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [producto_controller_1.ProductoController],
        }).compile();
        controller = module.get(producto_controller_1.ProductoController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=producto.controller.spec.js.map