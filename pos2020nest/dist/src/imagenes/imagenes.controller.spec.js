"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const imagenes_controller_1 = require("./imagenes.controller");
describe('Imagenes Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [imagenes_controller_1.ImagenesController],
        }).compile();
        controller = module.get(imagenes_controller_1.ImagenesController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=imagenes.controller.spec.js.map