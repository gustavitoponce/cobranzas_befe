"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const unidad_controller_1 = require("./unidad.controller");
const unidad_service_1 = require("./unidad.service");
const unidad_entity_1 = require("../entidades/unidad.entity");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const auth_service_1 = require("../auth/auth.service");
let UnidadModule = class UnidadModule {
};
UnidadModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([unidad_entity_1.Unidad]), auth_module_1.AuthModule],
        controllers: [unidad_controller_1.UnidadController],
        providers: [unidad_service_1.UnidadService, auth_service_1.AuthService],
    })
], UnidadModule);
exports.UnidadModule = UnidadModule;
//# sourceMappingURL=unidad.module.js.map