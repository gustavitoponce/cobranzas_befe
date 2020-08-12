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
const usuario_entity_1 = require("../entidades/usuario.entity");
const typeorm_2 = require("@nestjs/typeorm");
const fs = require("fs");
const path = require("path");
let UsuarioService = class UsuarioService {
    constructor(usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }
    async getAll(incluirInactivos = 'false') {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = ' Usuario.estatus = true ';
        }
        else {
            strEstatus = '';
        }
        return await this.usuarioRepo.find({
            where: `${strEstatus}`,
        });
    }
    async getById(id) {
        return await this.usuarioRepo.findOne(id);
    }
    async getByEmail(email) {
        return await this.usuarioRepo.findOne({ email });
    }
    async create(usuario) {
        const nuevo = new usuario_entity_1.Usuario();
        nuevo.email = usuario.email;
        nuevo.google = usuario.google;
        nuevo.img = usuario.img;
        nuevo.nombre = usuario.nombre;
        nuevo.password = usuario.password;
        nuevo.role = usuario.role;
        nuevo.estatus = usuario.estatus;
        return await this.usuarioRepo.save(nuevo);
    }
    async update(id, usuario) {
        const usuarioActualizar = await this.usuarioRepo.findOne(id);
        usuarioActualizar.email = usuario.email;
        usuarioActualizar.google = usuario.google;
        usuarioActualizar.img = usuario.img;
        usuarioActualizar.nombre = usuario.nombre;
        usuarioActualizar.password = usuario.password;
        usuarioActualizar.estatus = usuario.estatus;
        usuarioActualizar.role = usuario.role;
        return await this.usuarioRepo.save(usuarioActualizar);
    }
    async delete(id) {
        return await this.usuarioRepo.delete(id);
    }
    async updateImage(imageName, id) {
        const usuarioActualizar = await this.usuarioRepo.findOne(id);
        if (usuarioActualizar.img) {
            const oldPath = path.resolve('./uploads/usuario/' + usuarioActualizar.img);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }
        usuarioActualizar.img = imageName;
        return await this.usuarioRepo.save(usuarioActualizar);
    }
    async search(term, incluirInactivos) {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = 'AND Usuario.estatus = true ';
        }
        else {
            strEstatus = '';
        }
        return await this.usuarioRepo.find({
            where: `(LOWER(Usuario.email) LIKE '%${term.toLowerCase()}%' OR LOWER(Usuario.nombre) LIKE '%${term.toLowerCase()}%')
        ${strEstatus}`,
        });
    }
};
UsuarioService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsuarioService);
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map