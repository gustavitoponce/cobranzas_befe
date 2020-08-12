"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const persona_controller_1 = require("./persona.controller");
const persona_service_1 = require("./persona.service");
const persona_entity_1 = require("../entidades/persona.entity");
const auth_module_1 = require("../auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("../auth/auth.service");
let PersonaModule = class PersonaModule {
};
PersonaModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([persona_entity_1.Persona]), auth_module_1.AuthModule],
        controllers: [persona_controller_1.PersonaController],
        providers: [persona_service_1.PersonaService, auth_service_1.AuthService],
    })
], PersonaModule);
exports.PersonaModule = PersonaModule;
//# sourceMappingURL=persona.module.js.map