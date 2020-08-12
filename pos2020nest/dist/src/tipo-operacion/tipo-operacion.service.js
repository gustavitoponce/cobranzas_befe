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
const tipo_operacion_entity_1 = require("../entidades/tipo-operacion.entity");
const typeorm_2 = require("typeorm");
const auth_service_1 = require("../auth/auth.service");
let TipoOperacionService = class TipoOperacionService {
    constructor(tipoOperacionRepo, authService) {
        this.tipoOperacionRepo = tipoOperacionRepo;
        this.authService = authService;
    }
    async getAll() {
        return await this.tipoOperacionRepo.find({
            relations: ['usuariomodificacion'],
        });
    }
    async getById(id) {
        return await this.tipoOperacionRepo.findOne(id, {
            relations: ['usuariomodificacion'],
        });
    }
    async getByCode(codigo) {
        return await this.tipoOperacionRepo.findOne({ codigo: typeorm_2.Equal(codigo) }, {
            relations: ['usuariomodificacion'],
        });
    }
    async create(tipoOperacion) {
        const nuevaTipoOperacion = new tipo_operacion_entity_1.TipoOperacion();
        nuevaTipoOperacion.codigo = tipoOperacion.codigo;
        nuevaTipoOperacion.naturaleza = tipoOperacion.naturaleza;
        nuevaTipoOperacion.nombre = tipoOperacion.nombre;
        nuevaTipoOperacion.usuariomodificacion = this.authService.usuarioActivo;
        return await this.tipoOperacionRepo.save(nuevaTipoOperacion);
    }
    async update(id, tipoOperacion) {
        const tipoOperacionActualizar = await this.tipoOperacionRepo.findOne(id);
        tipoOperacionActualizar.codigo = tipoOperacion.codigo;
        tipoOperacionActualizar.naturaleza = tipoOperacion.naturaleza;
        tipoOperacionActualizar.nombre = tipoOperacion.nombre;
        tipoOperacionActualizar.usuariomodificacion = this.authService.usuarioActivo;
        return await this.tipoOperacionRepo.save(tipoOperacionActualizar);
    }
    async delete(id) {
        return this.tipoOperacionRepo.delete(id);
    }
    async search(term) {
        return await this.tipoOperacionRepo.find({
            where: `(LOWER(TipoOperacion.codigo) LIKE '%${term.toLowerCase()}%'
             OR LOWER(TipoOperacion.nombre) LIKE '%${term.toLowerCase()}%')`,
            relations: ['usuariomodificacion'],
        });
    }
};
TipoOperacionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(tipo_operacion_entity_1.TipoOperacion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], TipoOperacionService);
exports.TipoOperacionService = TipoOperacionService;
//# sourceMappingURL=tipo-operacion.service.js.map