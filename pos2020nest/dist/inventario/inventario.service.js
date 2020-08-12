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
const auth_service_1 = require("../auth/auth.service");
const typeorm_1 = require("@nestjs/typeorm");
const inventario_entity_1 = require("../entidades/inventario.entity");
const typeorm_2 = require("typeorm");
const operacion_entity_1 = require("../entidades/operacion.entity");
const detalle_operacion_entity_1 = require("../entidades/detalle-operacion.entity");
const tipo_operacion_service_1 = require("../tipo-operacion/tipo-operacion.service");
let InventarioService = class InventarioService {
    constructor(authService, tipoOperacionService, inventarioRepo, operacionRepo) {
        this.authService = authService;
        this.tipoOperacionService = tipoOperacionService;
        this.inventarioRepo = inventarioRepo;
        this.operacionRepo = operacionRepo;
        this.relaciones = ['empresa', 'producto', 'usuariomodificacion'];
    }
    async getAll() {
        return await this.inventarioRepo.find({
            where: {},
            relations: this.relaciones,
        });
    }
    async getById(id) {
        return await this.inventarioRepo.findOne(id, {
            where: {},
            relations: this.relaciones,
        });
    }
    async getByCode(codigo) {
        return await this.inventarioRepo.findOne({
            where: {
                codigo: typeorm_2.Equal(codigo),
            },
            relations: this.relaciones,
        });
    }
    async getByProductForSale(codigo) {
        return await typeorm_2.getRepository(inventario_entity_1.Inventario)
            .createQueryBuilder('inventario')
            .innerJoinAndSelect('inventario.producto', 'producto')
            .where('producto.codigo = :codigo', { codigo })
            .getOne();
    }
    async supply(idInventario, inventarioDto) {
        const operacion = new operacion_entity_1.Operacion();
        const detalleOperacion = new detalle_operacion_entity_1.DetalleOperacion();
        const inventarioActualizar = await this.inventarioRepo.findOne(idInventario);
        const tipoOperacionAbastecimiento = await this.tipoOperacionService.getByCode('ABASTECIMIENTO');
        inventarioActualizar.stock += inventarioDto.incremento;
        inventarioActualizar.usuariomodificacion = this.authService.usuarioActivo;
        return await this.inventarioRepo.save(inventarioActualizar);
    }
    async delete(id) {
        return await this.inventarioRepo.delete(id);
    }
};
InventarioService = __decorate([
    common_1.Injectable(),
    __param(2, typeorm_1.InjectRepository(inventario_entity_1.Inventario)),
    __param(3, typeorm_1.InjectRepository(operacion_entity_1.Operacion)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        tipo_operacion_service_1.TipoOperacionService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], InventarioService);
exports.InventarioService = InventarioService;
//# sourceMappingURL=inventario.service.js.map