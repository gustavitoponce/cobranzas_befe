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
const zona_entity_1 = require("../entidades/zona.entity");
let ZonaService = class ZonaService {
    constructor(zonaRepo) {
        this.zonaRepo = zonaRepo;
    }
    async getAll(incluirInactivos = 'false') {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = 'Zona.estatus = true ';
        }
        else {
            strEstatus = '1=1';
        }
        return await this.zonaRepo.find({
            where: `${strEstatus}`,
            relations: ['usuarioestatus', 'usuariomodificacion'],
        });
    }
    async getById(id) {
        return await this.zonaRepo.findOne(id, {
            relations: ['usuarioestatus', 'usuariomodificacion'],
        });
    }
    async create(zona) {
        const nuevo = new zona_entity_1.Zona();
        nuevo.nombre = zona.nombre;
        nuevo.rfc = zona.rfc;
        nuevo.direccion = zona.direccion;
        nuevo.logo = zona.logo;
        nuevo.estatus = zona.estatus;
        return await this.zonaRepo.save(nuevo);
    }
    async update(id, zona) {
        const zonaActualizar = await this.zonaRepo.findOne(id);
        zonaActualizar.nombre = zona.nombre;
        zonaActualizar.rfc = zona.rfc;
        zonaActualizar.direccion = zona.direccion;
        zonaActualizar.logo = zona.logo;
        zonaActualizar.estatus = zona.estatus;
        return await this.zonaRepo.save(zonaActualizar);
    }
    async delete(id) {
        return await this.zonaRepo.delete(id);
    }
    async updateImage(imageName, id) {
        const zonaActualizar = await this.zonaRepo.findOne(id);
        zonaActualizar.logo = imageName;
        return await this.zonaRepo.save(zonaActualizar);
    }
};
ZonaService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(zona_entity_1.Zona)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ZonaService);
exports.ZonaService = ZonaService;
//# sourceMappingURL=zona.service.js.map