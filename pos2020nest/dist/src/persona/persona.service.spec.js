"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const persona_service_1 = require("./persona.service");
describe('PersonaService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [persona_service_1.PersonaService],
        }).compile();
        service = module.get(persona_service_1.PersonaService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=persona.service.spec.js.map