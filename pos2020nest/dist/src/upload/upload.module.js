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
const upload_service_1 = require("./upload.service");
const upload_controller_1 = require("./upload.controller");
const empresa_entity_1 = require("../entidades/empresa.entity");
const usuario_module_1 = require("../usuario/usuario.module");
const usuario_entity_1 = require("../entidades/usuario.entity");
const usuario_service_1 = require("../usuario/usuario.service");
const empresa_module_1 = require("../empresa/empresa.module");
const empresa_service_1 = require("../empresa/empresa.service");
const auth_module_1 = require("../auth/auth.module");
const auth_service_1 = require("../auth/auth.service");
const producto_service_1 = require("../producto/producto.service");
const producto_entity_1 = require("../entidades/producto.entity");
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
let UploadModule = class UploadModule {
};
UploadModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                usuario_entity_1.Usuario,
                empresa_entity_1.Empresa,
                producto_entity_1.Producto,
                marca_entity_1.Marca,
                categoria_entity_1.Categoria,
                unidad_entity_1.Unidad,
                inventario_entity_1.Inventario,
                operacion_entity_1.Operacion,
                tipo_operacion_entity_1.TipoOperacion,
            ]),
            usuario_module_1.UsuarioModule,
            empresa_module_1.EmpresaModule,
            auth_module_1.AuthModule,
        ],
        providers: [
            upload_service_1.UploadService,
            usuario_service_1.UsuarioService,
            empresa_service_1.EmpresaService,
            auth_service_1.AuthService,
            producto_service_1.ProductoService,
            marca_service_1.MarcaService,
            categoria_service_1.CategoriaService,
            unidad_service_1.UnidadService,
            inventario_service_1.InventarioService,
            tipo_operacion_service_1.TipoOperacionService,
        ],
        controllers: [upload_controller_1.UploadController],
    })
], UploadModule);
exports.UploadModule = UploadModule;
//# sourceMappingURL=upload.module.js.map