"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const operacion_entity_1 = require("../entidades/operacion.entity");
const auth_service_1 = require("../auth/auth.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const producto_service_1 = require("../producto/producto.service");
const persona_service_1 = require("../persona/persona.service");
const tipo_operacion_service_1 = require("../tipo-operacion/tipo-operacion.service");
const usuario_entity_1 = require("../entidades/usuario.entity");
let OperacionService = class OperacionService {
    constructor(operacionRepo, authService, productoService, personaService, tipoOperacionService) {
        this.operacionRepo = operacionRepo;
        this.authService = authService;
        this.productoService = productoService;
        this.personaService = personaService;
        this.tipoOperacionService = tipoOperacionService;
    }
    async getAll() {
        return await this.operacionRepo.find({
            where: 'Operacion.empresa = 1',
            order: {
                id: 'ASC',
            },
        });
    }
    async create(operacionDto) {
        return new Promise(async (resolve, reject) => {
            const queryRunner = typeorm_1.getConnection().createQueryRunner();
            await queryRunner.startTransaction();
            try {
                let operacion = new operacion_entity_1.Operacion();
                const detalle = [];
                const mensajesStockAgotado = [];
                operacion.empresa = this.authService.empresaActiva;
                operacion.usuariomodificacion = this.authService.usuarioActivo;
                console.log(operacion.usuariomodificacion);
                operacion.persona = await this.personaService.getById(operacionDto.personaId);
                operacion.total = operacionDto.total;
                operacion.tipooperacion = await this.tipoOperacionService.getById(operacionDto.tipooperacionId);
                console.log('usuario');
                console.log(this.authService.usuarioActivo);
                const usuariomod = new usuario_entity_1.Usuario();
                usuariomod.id = 1;
                operacion.usuariomodificacion = usuariomod;
                console.log('guardar detalle');
                console.log(operacion);
                const operacionGuardarda1 = await queryRunner.query("SELECT * FROM operacion");
                const operacionGuardarda = await queryRunner.manager.save(operacion);
                await queryRunner.commitTransaction();
                await queryRunner.release();
                resolve(operacionGuardarda);
                console.log(operacionGuardarda1);
            }
            catch (error) {
                await queryRunner.rollbackTransaction();
                await queryRunner.release();
                console.log('error ', error);
                reject(error);
            }
        });
    }
};
OperacionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(operacion_entity_1.Operacion)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        auth_service_1.AuthService,
        producto_service_1.ProductoService,
        persona_service_1.PersonaService,
        tipo_operacion_service_1.TipoOperacionService])
], OperacionService);
exports.OperacionService = OperacionService;
//# sourceMappingURL=operacion.service.js.map