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
const categoria_entity_1 = require("../entidades/categoria.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const auth_service_1 = require("../auth/auth.service");
let CategoriaService = class CategoriaService {
    constructor(categoriaRepo, authService) {
        this.categoriaRepo = categoriaRepo;
        this.authService = authService;
        this.relaciones = ['usuarioestatus', 'usuariomodificacion'];
    }
    async getAll(incluirInactivos = 'false') {
        console.log(' paso por este metodo ............' +
            JSON.stringify(this.authService.empresaActiva));
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = ' AND Categoria.estatus = true ';
        }
        else {
            strEstatus = '';
        }
        return await this.categoriaRepo.find({
            relations: this.relaciones,
            order: {
                id: 'ASC',
            },
        });
    }
    async getById(id) {
        return await this.categoriaRepo.findOne(id, {
            relations: this.relaciones,
        });
    }
    async create(categoria) {
        const nuevaCategoria = new categoria_entity_1.Categoria();
        nuevaCategoria.empresa = categoria.empresa;
        nuevaCategoria.nombre = categoria.nombre;
        nuevaCategoria.descripcion = categoria.descripcion;
        nuevaCategoria.estatus = categoria.estatus;
        nuevaCategoria.usuarioestatus = categoria.usuarioestatus;
        nuevaCategoria.usuariomodificacion = categoria.usuariomodificacion;
        console.log(JSON.stringify(nuevaCategoria));
        return await this.categoriaRepo.save(nuevaCategoria);
    }
    async update(id, categoria) {
        const categoriaActualizar = await this.categoriaRepo.findOne(id);
        categoriaActualizar.nombre = categoria.nombre;
        categoriaActualizar.descripcion = categoria.descripcion;
        if (categoriaActualizar.estatus !== categoria.estatus) {
            categoriaActualizar.estatus = categoria.estatus;
            categoriaActualizar.usuarioestatus = categoria.usuarioestatus;
        }
        categoriaActualizar.usuariomodificacion = categoria.usuariomodificacion;
        return await this.categoriaRepo.save(categoriaActualizar);
    }
    async delete(id) {
        return await this.categoriaRepo.delete(id);
    }
    async search(term, incluirInactivos) {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = 'AND Categoria.estatus = true ';
        }
        else {
            strEstatus = 'AND 1=1';
        }
        return await this.categoriaRepo.find({
            where: ` (LOWER(Categoria.nombre) LIKE '%${term.toLowerCase()}%'
             OR LOWER(Categoria.descripcion) LIKE '%${term.toLowerCase()}%') ${strEstatus}`,
            relations: this.relaciones,
        });
    }
};
CategoriaService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(categoria_entity_1.Categoria)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        auth_service_1.AuthService])
], CategoriaService);
exports.CategoriaService = CategoriaService;
//# sourceMappingURL=categoria.service.js.map