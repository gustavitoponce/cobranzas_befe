"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const inventario_service_1 = require("./inventario.service");
const inventario_controller_1 = require("./inventario.controller");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const auth_service_1 = require("../auth/auth.service");
const inventario_entity_1 = require("../entidades/inventario.entity");
const operacion_entity_1 = require("../entidades/operacion.entity");
const tipo_operacion_service_1 = require("../tipo-operacion/tipo-operacion.service");
const tipo_operacion_entity_1 = require("../entidades/tipo-operacion.entity");
let InventarioModule = class InventarioModule {
};
InventarioModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([inventario_entity_1.Inventario, operacion_entity_1.Operacion, tipo_operacion_entity_1.TipoOperacion]),
            auth_module_1.AuthModule,
        ],
        providers: [inventario_service_1.InventarioService, auth_service_1.AuthService, tipo_operacion_service_1.TipoOperacionService],
        controllers: [inventario_controller_1.InventarioController],
    })
], InventarioModule);
exports.InventarioModule = InventarioModule;
//# sourceMappingURL=inventario.module.js.map