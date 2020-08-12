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
const estado_entity_1 = require("../entidades/estado.entity");
let EstadoService = class EstadoService {
    constructor(estadoRepo) {
        this.estadoRepo = estadoRepo;
    }
    async getAll(incluirInactivos = 'false') {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = 'Estado.estatus = true ';
        }
        else {
            strEstatus = '1=1';
        }
        return await this.estadoRepo.find({
            where: `${strEstatus}`,
            relations: ['usuarioestatus', 'usuariomodificacion'],
        });
    }
    async getById(id) {
        console.log('1111');
        return await this.estadoRepo.findOne(id, {
            relations: ['usuarioestatus', 'usuariomodificacion'],
        });
    }
    async create(estado) {
        const nuevo = new estado_entity_1.Estado();
        return await this.estadoRepo.save(nuevo);
    }
    async update(id, estado) {
        const estadoActualizar = await this.estadoRepo.findOne(id);
        estadoActualizar.estatus = estado.estatus;
        return await this.estadoRepo.save(estadoActualizar);
    }
    async delete(id) {
        return await this.estadoRepo.delete(id);
    }
    async updateImage(imageName, id) {
        const zonaActualizar = await this.estadoRepo.findOne(id);
        return await this.estadoRepo.save(zonaActualizar);
    }
};
EstadoService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(estado_entity_1.Estado)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EstadoService);
exports.EstadoService = EstadoService;
//# sourceMappingURL=estado.service.js.map