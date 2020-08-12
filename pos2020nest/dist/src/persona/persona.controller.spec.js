"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const persona_controller_1 = require("./persona.controller");
describe('Persona Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [persona_controller_1.PersonaController],
        }).compile();
        controller = module.get(persona_controller_1.PersonaController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=persona.controller.spec.js.map