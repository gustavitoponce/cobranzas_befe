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
const marca_entity_1 = require("../entidades/marca.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const auth_service_1 = require("../auth/auth.service");
let MarcaService = class MarcaService {
    constructor(marcaRepo, authService) {
        this.marcaRepo = marcaRepo;
        this.authService = authService;
        this.relaciones = [
            'empresa',
            'usuarioestatus',
            'usuariomodificacion',
        ];
    }
    async getAll(incluirInactivos = 'false') {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = ' AND Marca.estatus = true ';
        }
        else {
            strEstatus = '';
        }
        return await this.marcaRepo.find({
            relations: this.relaciones,
            order: {
                id: 'ASC',
            },
        });
    }
    async getById(id) {
        return await this.marcaRepo.findOne(id, {
            relations: this.relaciones,
        });
    }
    async create(marca) {
        const nuevamarca = new marca_entity_1.Marca();
        nuevamarca.empresa = marca.empresa;
        nuevamarca.nombre = marca.nombre;
        nuevamarca.descripcion = marca.descripcion;
        nuevamarca.estatus = marca.estatus;
        nuevamarca.usuarioestatus = marca.usuarioestatus;
        nuevamarca.usuariomodificacion = marca.usuariomodificacion;
        return await this.marcaRepo.save(nuevamarca);
    }
    async update(id, marca) {
        const marcaActualizar = await this.marcaRepo.findOne(id);
        marcaActualizar.nombre = marca.nombre;
        marcaActualizar.descripcion = marca.descripcion;
        if (marcaActualizar.estatus !== marca.estatus) {
            marcaActualizar.estatus = marca.estatus;
            marcaActualizar.usuarioestatus = marca.usuarioestatus;
        }
        marcaActualizar.usuariomodificacion = marca.usuariomodificacion;
        return await this.marcaRepo.save(marcaActualizar);
    }
    async delete(id) {
        return await this.marcaRepo.delete(id);
    }
    async search(term, incluirInactivos) {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = 'AND Marca.estatus = true ';
        }
        else {
            strEstatus = 'AND 1=1';
        }
        return await this.marcaRepo.find({
            where: ` (LOWER(Marca.nombre) LIKE '%${term.toLowerCase()}%'
             OR LOWER(Marca.descripcion) LIKE '%${term.toLowerCase()}%') ${strEstatus}`,
            relations: this.relaciones,
        });
    }
};
MarcaService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(marca_entity_1.Marca)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        auth_service_1.AuthService])
], MarcaService);
exports.MarcaService = MarcaService;
//# sourceMappingURL=marca.service.js.map