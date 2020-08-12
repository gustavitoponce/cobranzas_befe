"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const categoria_controller_1 = require("./categoria.controller");
describe('Categoria Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [categoria_controller_1.CategoriaController],
        }).compile();
        controller = module.get(categoria_controller_1.CategoriaController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=categoria.controller.spec.js.map