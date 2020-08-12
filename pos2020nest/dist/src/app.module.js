"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const empresa_module_1 = require("./empresa/empresa.module");
const usuario_module_1 = require("./usuario/usuario.module");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const upload_module_1 = require("./upload/upload.module");
const imagenes_service_1 = require("./imagenes/imagenes.service");
const imagenes_controller_1 = require("./imagenes/imagenes.controller");
const categoria_module_1 = require("./categoria/categoria.module");
const marca_module_1 = require("./marca/marca.module");
const unidad_module_1 = require("./unidad/unidad.module");
const persona_module_1 = require("./persona/persona.module");
const producto_module_1 = require("./producto/producto.module");
const inventario_module_1 = require("./inventario/inventario.module");
const tipo_operacion_module_1 = require("./tipo-operacion/tipo-operacion.module");
const operacion_module_1 = require("./operacion/operacion.module");
const zona_module_1 = require("./zona/zona.module");
const prestamo_module_1 = require("./prestamo/prestamo.module");
const documentacion_module_1 = require("./documentacion/documentacion.module");
const detalleprestamo_module_1 = require("./detalleprestamo/detalleprestamo.module");
const estado_module_1 = require("./estado/estado.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(),
            empresa_module_1.EmpresaModule,
            usuario_module_1.UsuarioModule,
            auth_module_1.AuthModule,
            upload_module_1.UploadModule,
            categoria_module_1.CategoriaModule,
            marca_module_1.MarcaModule,
            unidad_module_1.UnidadModule,
            persona_module_1.PersonaModule,
            producto_module_1.ProductoModule,
            inventario_module_1.InventarioModule,
            tipo_operacion_module_1.TipoOperacionModule,
            zona_module_1.ZonaModule,
            prestamo_module_1.PrestamoModule,
            documentacion_module_1.DocumentacionModule,
            detalleprestamo_module_1.DetallePrestamoModule,
            operacion_module_1.OperacionModule,
            estado_module_1.EstadoModule,
        ],
        controllers: [app_controller_1.AppController, imagenes_controller_1.ImagenesController],
        providers: [app_service_1.AppService, imagenes_service_1.ImagenesService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map