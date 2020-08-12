"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tipo_operacion_service_1 = require("./tipo-operacion.service");
const tipo_operacion_controller_1 = require("./tipo-operacion.controller");
const auth_service_1 = require("../auth/auth.service");
const typeorm_1 = require("@nestjs/typeorm");
const tipo_operacion_entity_1 = require("../entidades/tipo-operacion.entity");
const auth_module_1 = require("../auth/auth.module");
let TipoOperacionModule = class TipoOperacionModule {
};
TipoOperacionModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([tipo_operacion_entity_1.TipoOperacion]), auth_module_1.AuthModule],
        providers: [tipo_operacion_service_1.TipoOperacionService, auth_service_1.AuthService],
        controllers: [tipo_operacion_controller_1.TipoOperacionController],
    })
], TipoOperacionModule);
exports.TipoOperacionModule = TipoOperacionModule;
//# sourceMappingURL=tipo-operacion.module.js.map