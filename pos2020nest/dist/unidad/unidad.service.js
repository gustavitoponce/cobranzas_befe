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
const typeorm_1 = require("typeorm");
const unidad_entity_1 = require("../entidades/unidad.entity");
const auth_service_1 = require("../auth/auth.service");
const typeorm_2 = require("@nestjs/typeorm");
let UnidadService = class UnidadService {
    constructor(unidadRepo, authService) {
        this.unidadRepo = unidadRepo;
        this.authService = authService;
    }
    async getAll(incluirInactivos = 'false') {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = ' Unidad.estatus = true ';
        }
        else {
            strEstatus = '1=1';
        }
        return await this.unidadRepo.find({
            where: `${strEstatus}`,
            relations: ['usuariomodificacion'],
            order: {
                id: 'ASC',
            },
        });
    }
    async getById(id) {
        return await this.unidadRepo.findOne(id, {
            relations: ['usuariomodificacion'],
        });
    }
    async create(unidad) {
        const nuevaUnidad = new unidad_entity_1.Unidad();
        nuevaUnidad.codigo = unidad.codigo;
        nuevaUnidad.descripcion = unidad.descripcion;
        nuevaUnidad.estatus = unidad.estatus;
        nuevaUnidad.usuariomodificacion = unidad.usuariomodificacion;
        return await this.unidadRepo.save(nuevaUnidad);
    }
    async update(id, unidad) {
        const unidadActualizar = await this.unidadRepo.findOne(id);
        unidadActualizar.codigo = unidad.codigo;
        unidadActualizar.descripcion = unidad.descripcion;
        unidadActualizar.estatus = unidad.estatus;
        unidadActualizar.usuariomodificacion = unidad.usuariomodificacion;
        return await this.unidadRepo.save(unidadActualizar);
    }
    async delete(id) {
        return this.unidadRepo.delete(id);
    }
    async search(term, incluirInactivos) {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = 'AND Unidad.estatus = true ';
        }
        else {
            strEstatus = '';
        }
        return await this.unidadRepo.find({
            where: `(LOWER(Unidad.codigo) LIKE '%${term.toLowerCase()}%'
             OR LOWER(Unidad.descripcion) LIKE '%${term.toLowerCase()}%') ${strEstatus}`,
            relations: ['usuariomodificacion'],
        });
    }
};
UnidadService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(unidad_entity_1.Unidad)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        auth_service_1.AuthService])
], UnidadService);
exports.UnidadService = UnidadService;
//# sourceMappingURL=unidad.service.js.map