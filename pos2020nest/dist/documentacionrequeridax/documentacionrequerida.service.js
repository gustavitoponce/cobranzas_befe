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
const documentacion_entity_1 = require("../entidades/documentacion.entity");
const auth_service_1 = require("../auth/auth.service");
const marca_service_1 = require("../marca/marca.service");
const categoria_service_1 = require("../categoria/categoria.service");
const unidad_service_1 = require("../unidad/unidad.service");
const typeorm_2 = require("@nestjs/typeorm");
const inventario_entity_1 = require("../entidades/inventario.entity");
const inventario_service_1 = require("../inventario/inventario.service");
let DocumentacionRequeridaService = class DocumentacionRequeridaService {
    constructor(documentacionrequeridaRepo, authService, marcaService, categoriaService, unidadService, inventarioService) {
        this.documentacionrequeridaRepo = documentacionrequeridaRepo;
        this.authService = authService;
        this.marcaService = marcaService;
        this.categoriaService = categoriaService;
        this.unidadService = unidadService;
        this.inventarioService = inventarioService;
        this.ROOT_APP = __dirname;
        this.relaciones = [];
    }
    async getAll(incluirInactivos = 'false') {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = ' AND DocumentacionRequerida.estatus = true ';
        }
        else {
            strEstatus = '';
        }
        return await this.documentacionrequeridaRepo.find({
            relations: this.relaciones,
            order: {
                id: 'ASC',
            },
        });
    }
    async getById(id) {
        return await this.documentacionrequeridaRepo.findOne(id, {});
    }
    async getByCode(codigo) {
        return await this.documentacionrequeridaRepo.findOne({
            where: {
                empresa: typeorm_1.Equal(this.authService.empresaActiva.id),
                codigo,
            },
        });
    }
    async create(documentacionrequerida) {
        return new Promise(async (resolve, reject) => {
            const queryRunner = typeorm_1.getConnection().createQueryRunner();
            await queryRunner.startTransaction();
            try {
                const nuevoDocumentacionRequerida = new documentacion_entity_1.DocumentacionRequerida();
                const inventario = new inventario_entity_1.Inventario();
                nuevoDocumentacionRequerida.nombre = documentacionrequerida.nombre;
                nuevoDocumentacionRequerida.descripcion = documentacionrequerida.descripcion;
                nuevoDocumentacionRequerida.imagen = documentacionrequerida.imagen;
                nuevoDocumentacionRequerida.estatus = documentacionrequerida.estatus;
                nuevoDocumentacionRequerida.usuarioestatus = documentacionrequerida.usuarioestatus;
                nuevoDocumentacionRequerida.usuariomodificacion = documentacionrequerida.usuariomodificacion;
                const documentacionrequeridaBD = await queryRunner.manager.save(nuevoDocumentacionRequerida);
                await queryRunner.commitTransaction();
                await queryRunner.release();
                console.log('JSON ' + JSON.stringify(documentacionrequeridaBD));
                resolve(documentacionrequeridaBD);
            }
            catch (error) {
                await queryRunner.rollbackTransaction();
                await queryRunner.release();
                reject(error);
            }
        });
    }
    async update(id, documentacionrequerida) {
        const documentacionrequeridaActualizar = await this.documentacionrequeridaRepo.findOne(id);
        documentacionrequeridaActualizar.nombre = documentacionrequerida.nombre;
        documentacionrequeridaActualizar.descripcion = documentacionrequerida.descripcion;
        documentacionrequeridaActualizar.imagen = documentacionrequerida.imagen;
        documentacionrequeridaActualizar.usuariomodificacion = this.authService.usuarioActivo;
        return await this.documentacionrequeridaRepo.save(documentacionrequeridaActualizar);
    }
    async delete(id) {
        return await this.documentacionrequeridaRepo.delete(id);
    }
    async updateImage(imageName, id) {
        return imageName;
    }
    async search(term, incluirInactivos) {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = 'AND DocumentacionRequerida.estatus = true ';
        }
        else {
            strEstatus = 'AND 1=1';
        }
        return await this.documentacionrequeridaRepo.find({
            where: `DocumentacionRequerida.empresa = ${this.authService.empresaActiva.id}
             AND (LOWER(DocumentacionRequerida.codigo) LIKE '%${term.toLowerCase()}%'
             OR LOWER(DocumentacionRequerida.nombre) LIKE '%${term.toLowerCase()}%'
             OR LOWER(DocumentacionRequerida.descripcion) LIKE '%${term.toLowerCase()}%') ${strEstatus}`,
            relations: this.relaciones,
        });
    }
};
DocumentacionRequeridaService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(documentacion_entity_1.DocumentacionRequerida)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        auth_service_1.AuthService,
        marca_service_1.MarcaService,
        categoria_service_1.CategoriaService,
        unidad_service_1.UnidadService,
        inventario_service_1.InventarioService])
], DocumentacionRequeridaService);
exports.DocumentacionRequeridaService = DocumentacionRequeridaService;
//# sourceMappingURL=documentacionrequerida.service.js.map