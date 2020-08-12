"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const empresa_controller_1 = require("./empresa.controller");
describe('Empresa Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [empresa_controller_1.EmpresaController],
        }).compile();
        controller = module.get(empresa_controller_1.EmpresaController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=empresa.controller.spec.js.map