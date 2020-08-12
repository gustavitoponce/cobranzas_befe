"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const documentacionrequerida_service_1 = require("./documentacionrequerida.service");
const documentacionrequerida_controller_1 = require("./documentacionrequerida.controller");
const typeorm_1 = require("@nestjs/typeorm");
const producto_entity_1 = require("../entidades/producto.entity");
const auth_module_1 = require("../auth/auth.module");
const auth_service_1 = require("../auth/auth.service");
const marca_service_1 = require("../marca/marca.service");
const categoria_service_1 = require("../categoria/categoria.service");
const unidad_service_1 = require("../unidad/unidad.service");
const inventario_service_1 = require("../inventario/inventario.service");
const marca_entity_1 = require("../entidades/marca.entity");
const categoria_entity_1 = require("../entidades/categoria.entity");
const unidad_entity_1 = require("../entidades/unidad.entity");
const tipo_operacion_service_1 = require("../tipo-operacion/tipo-operacion.service");
const inventario_entity_1 = require("../entidades/inventario.entity");
const operacion_entity_1 = require("../entidades/operacion.entity");
const tipo_operacion_entity_1 = require("../entidades/tipo-operacion.entity");
let DocumentacionRequeridaModule = class DocumentacionRequeridaModule {
};
DocumentacionRequeridaModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                producto_entity_1.Producto,
                marca_entity_1.Marca,
                categoria_entity_1.Categoria,
                unidad_entity_1.Unidad,
                inventario_entity_1.Inventario,
                operacion_entity_1.Operacion,
                tipo_operacion_entity_1.TipoOperacion,
            ]),
            auth_module_1.AuthModule,
        ],
        providers: [
            documentacionrequerida_service_1.DocumentacionRequeridaService,
            auth_service_1.AuthService,
            marca_service_1.MarcaService,
            categoria_service_1.CategoriaService,
            unidad_service_1.UnidadService,
            inventario_service_1.InventarioService,
            tipo_operacion_service_1.TipoOperacionService,
        ],
        controllers: [documentacionrequerida_controller_1.DocumentacionRequeridaController],
    })
], DocumentacionRequeridaModule);
exports.DocumentacionRequeridaModule = DocumentacionRequeridaModule;
//# sourceMappingURL=documentacionrequerida.module.js.map