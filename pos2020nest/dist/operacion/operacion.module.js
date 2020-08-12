"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const operacion_service_1 = require("./operacion.service");
const operacion_controller_1 = require("./operacion.controller");
const typeorm_1 = require("@nestjs/typeorm");
const tipo_operacion_entity_1 = require("../entidades/tipo-operacion.entity");
const auth_module_1 = require("../auth/auth.module");
const operacion_entity_1 = require("../entidades/operacion.entity");
const auth_service_1 = require("../auth/auth.service");
const producto_service_1 = require("../producto/producto.service");
const persona_service_1 = require("../persona/persona.service");
const tipo_operacion_service_1 = require("../tipo-operacion/tipo-operacion.service");
const producto_entity_1 = require("../entidades/producto.entity");
const marca_service_1 = require("../marca/marca.service");
const categoria_service_1 = require("../categoria/categoria.service");
const unidad_service_1 = require("../unidad/unidad.service");
const inventario_service_1 = require("../inventario/inventario.service");
const persona_entity_1 = require("../entidades/persona.entity");
const marca_entity_1 = require("../entidades/marca.entity");
const categoria_entity_1 = require("../entidades/categoria.entity");
const unidad_entity_1 = require("../entidades/unidad.entity");
const inventario_entity_1 = require("../entidades/inventario.entity");
let OperacionModule = class OperacionModule {
};
OperacionModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                operacion_entity_1.Operacion,
                producto_entity_1.Producto,
                persona_entity_1.Persona,
                tipo_operacion_entity_1.TipoOperacion,
                marca_entity_1.Marca,
                categoria_entity_1.Categoria,
                unidad_entity_1.Unidad,
                inventario_entity_1.Inventario,
            ]),
            auth_module_1.AuthModule,
        ],
        providers: [
            operacion_service_1.OperacionService,
            auth_service_1.AuthService,
            producto_service_1.ProductoService,
            persona_service_1.PersonaService,
            tipo_operacion_service_1.TipoOperacionService,
            marca_service_1.MarcaService,
            categoria_service_1.CategoriaService,
            unidad_service_1.UnidadService,
            inventario_service_1.InventarioService,
        ],
        controllers: [operacion_controller_1.OperacionController],
    })
], OperacionModule);
exports.OperacionModule = OperacionModule;
//# sourceMappingURL=operacion.module.js.map