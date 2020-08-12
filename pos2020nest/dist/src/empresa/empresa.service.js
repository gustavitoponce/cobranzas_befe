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
const empresa_entity_1 = require("../entidades/empresa.entity");
let EmpresaService = class EmpresaService {
    constructor(empresaRepo) {
        this.empresaRepo = empresaRepo;
    }
    async getAll(incluirInactivos = 'false') {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = 'Empresa.estatus = true ';
        }
        else {
            strEstatus = '1=1';
        }
        return await this.empresaRepo.find({
            where: `${strEstatus}`,
            relations: ['usuarioestatus', 'usuariomodificacion'],
        });
    }
    async getById(id) {
        return await this.empresaRepo.findOne(id, {
            relations: ['usuarioestatus', 'usuariomodificacion'],
        });
    }
    async create(empresa) {
        const nuevo = new empresa_entity_1.Empresa();
        nuevo.nombre = empresa.nombre;
        nuevo.rfc = empresa.rfc;
        nuevo.direccion = empresa.direccion;
        nuevo.logo = empresa.logo;
        nuevo.estatus = empresa.estatus;
        return await this.empresaRepo.save(nuevo);
    }
    async update(id, empresa) {
        const empresaActualizar = await this.empresaRepo.findOne(id);
        empresaActualizar.nombre = empresa.nombre;
        empresaActualizar.rfc = empresa.rfc;
        empresaActualizar.direccion = empresa.direccion;
        empresaActualizar.logo = empresa.logo;
        empresaActualizar.estatus = empresa.estatus;
        return await this.empresaRepo.save(empresaActualizar);
    }
    async delete(id) {
        return await this.empresaRepo.delete(id);
    }
    async updateImage(imageName, id) {
        const empresaActualizar = await this.empresaRepo.findOne(id);
        empresaActualizar.logo = imageName;
        return await this.empresaRepo.save(empresaActualizar);
    }
};
EmpresaService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(empresa_entity_1.Empresa)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmpresaService);
exports.EmpresaService = EmpresaService;
//# sourceMappingURL=empresa.service.js.map