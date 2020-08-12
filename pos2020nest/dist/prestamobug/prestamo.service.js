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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const prestamo_entity_1 = require("../entidades/prestamo.entity");
const detalle_prestamo_entity_1 = require("../entidades/detalle-prestamo.entity");
let PrestamoService = class PrestamoService {
    constructor(prestamoRepo, detalleprestamoRepo) {
        this.prestamoRepo = prestamoRepo;
        this.detalleprestamoRepo = detalleprestamoRepo;
    }
    async getAll(incluirInactivos = 'false') {
        const queryRunner = typeorm_2.getConnection().createQueryRunner();
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = 'Prestamo.estatus = true ';
        }
        else {
            strEstatus = '1=1';
        }
        return await this.prestamoRepo.find({
            where: `${strEstatus}`,
        });
    }
    async getDetail(id) {
        console.log('getDetail');
        const queryRunner = typeorm_2.getConnection().createQueryRunner();
        let strEstatus;
        console.log('llego a getDetail y el id es' + id);
        const _id = id.toString;
        strEstatus = 'detalleprestamo.prestamoid = ' + id.toString();
        console.log(strEstatus);
        return await this.detalleprestamoRepo.find({
            where: `${strEstatus}`,
        });
    }
    async getById(id) {
        return await this.prestamoRepo.findOne(id, {});
    }
    async create(prestamoDto) {
        return new Promise(async (resolve, reject) => {
            const queryRunner = typeorm_2.getConnection().createQueryRunner();
            var i = 0;
            try {
                const detalle = [];
                let nuevo = new prestamo_entity_1.Prestamo();
                let fecha = new Date();
                nuevo.cliente = prestamoDto.cliente;
                nuevo.importe = prestamoDto.importe;
                nuevo.interes = prestamoDto.interes;
                nuevo.tipo = prestamoDto.tipo;
                nuevo.fecha = new Date();
                nuevo.zona = prestamoDto.zona;
                console.log(prestamoDto.estado);
                nuevo.estado = prestamoDto.estado;
                nuevo.estatus = true;
                nuevo.cuotas = 1;
                nuevo.tasa = 80;
                nuevo.observacion = "prestamoDto.observacion";
                console.log(nuevo.tasa);
                const prestamoGuardardo = await queryRunner.manager.save(nuevo);
                console.log('metodo create');
                const det = new detalle_prestamo_entity_1.DetallePrestamo();
                queryRunner.release();
                resolve(prestamoGuardardo);
                console.log(prestamoGuardardo.id);
            }
            catch (error) {
                console.log('el error es', error);
                await queryRunner.rollbackTransaction();
                await queryRunner.release();
                console.log('error ', error);
                reject(error);
            }
        });
    }
    async delete(id) {
        return await this.prestamoRepo.delete(id);
    }
};
PrestamoService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(prestamo_entity_1.Prestamo)),
    __param(1, typeorm_1.InjectRepository(detalle_prestamo_entity_1.DetallePrestamo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PrestamoService);
exports.PrestamoService = PrestamoService;
//# sourceMappingURL=prestamo.service.js.map