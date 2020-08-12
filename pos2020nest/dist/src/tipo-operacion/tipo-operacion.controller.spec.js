"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const tipo_operacion_controller_1 = require("./tipo-operacion.controller");
describe('TipoOperacion Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [tipo_operacion_controller_1.TipoOperacionController],
        }).compile();
        controller = module.get(tipo_operacion_controller_1.TipoOperacionController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=tipo-operacion.controller.spec.js.map