"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const marca_controller_1 = require("./marca.controller");
describe('Marca Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [marca_controller_1.MarcaController],
        }).compile();
        controller = module.get(marca_controller_1.MarcaController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=marca.controller.spec.js.map