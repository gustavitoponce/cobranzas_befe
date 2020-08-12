"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("./auth.service");
const usuario_service_1 = require("../usuario/usuario.service");
const auth_controller_1 = require("./auth.controller");
const usuario_entity_1 = require("../entidades/usuario.entity");
const usuario_module_1 = require("../usuario/usuario.module");
const empresa_module_1 = require("../empresa/empresa.module");
const empresa_service_1 = require("../empresa/empresa.service");
const empresa_entity_1 = require("../entidades/empresa.entity");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([usuario_entity_1.Usuario, empresa_entity_1.Empresa]),
            usuario_module_1.UsuarioModule,
            empresa_module_1.EmpresaModule,
        ],
        providers: [auth_service_1.AuthService, usuario_service_1.UsuarioService, empresa_service_1.EmpresaService],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map