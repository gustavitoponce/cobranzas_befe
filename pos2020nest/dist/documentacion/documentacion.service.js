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
let DocumentacionService = class DocumentacionService {
    constructor(documentacionRepo, authService, marcaService, categoriaService, unidadService, inventarioService) {
        this.documentacionRepo = documentacionRepo;
        this.authService = authService;
        this.marcaService = marcaService;
        this.categoriaService = categoriaService;
        this.unidadService = unidadService;
        this.inventarioService = inventarioService;
        this.ROOT_APP = __dirname;
        this.relaciones = [];
    }
    async getAll(id) {
        let strEstatus;
        console.log('llego con el id ') + id.toString();
        strEstatus = 'documentacion.idprestamo = ' + id.toString();
        return await this.documentacionRepo.find({
            where: `${strEstatus}`,
            relations: this.relaciones,
            order: {
                id: 'ASC',
            },
        });
    }
    async getdoc(id) {
        let strEstatus;
        console.log('getdoc');
        strEstatus = 'documentacion.idprestamo = ' + id.toString();
        return await this.documentacionRepo.find({
            where: `${strEstatus}`,
            relations: this.relaciones,
            order: {
                id: 'ASC',
            },
        });
    }
    async getById(id) {
        return await this.documentacionRepo.findOne(id, {});
    }
    async getByCode(codigo) {
        return await this.documentacionRepo.findOne({
            where: {
                empresa: typeorm_1.Equal(this.authService.empresaActiva.id),
                codigo,
            },
        });
    }
    async create(documentacion) {
        return new Promise(async (resolve, reject) => {
            const queryRunner = typeorm_1.getConnection().createQueryRunner();
            await queryRunner.startTransaction();
            try {
                const nuevoDocumentacion = new documentacion_entity_1.Documentacion();
                const inventario = new inventario_entity_1.Inventario();
                nuevoDocumentacion.nombre = documentacion.nombre;
                nuevoDocumentacion.descripcion = documentacion.descripcion;
                nuevoDocumentacion.imagen = documentacion.imagen;
                nuevoDocumentacion.idprestamo = documentacion.idprestamo;
                nuevoDocumentacion.requerido = true;
                nuevoDocumentacion.estatus = true;
                nuevoDocumentacion.usuarioestatus = documentacion.usuarioestatus;
                nuevoDocumentacion.usuariomodificacion = documentacion.usuariomodificacion;
                const documentacionBD = await queryRunner.manager.save(nuevoDocumentacion);
                inventario.empresa = this.authService.empresaActiva;
                inventario.stock = 0;
                inventario.usuariomodificacion = this.authService.usuarioActivo;
                await queryRunner.manager.getRepository(inventario_entity_1.Inventario).save(inventario);
                await queryRunner.commitTransaction();
                await queryRunner.release();
                console.log('JSON ' + JSON.stringify(documentacionBD));
                resolve(documentacionBD);
            }
            catch (error) {
                await queryRunner.rollbackTransaction();
                await queryRunner.release();
                reject(error);
            }
        });
    }
    async update(id, documentacion) {
        const documentacionActualizar = await this.documentacionRepo.findOne(id);
        documentacionActualizar.nombre = documentacion.nombre;
        documentacionActualizar.descripcion = documentacion.descripcion;
        documentacionActualizar.imagen = documentacion.imagen;
        if (documentacionActualizar.estatus !== documentacion.estatus) {
            documentacionActualizar.estatus = documentacion.estatus;
            documentacionActualizar.usuarioestatus = this.authService.usuarioActivo;
        }
        documentacionActualizar.usuariomodificacion = this.authService.usuarioActivo;
        return await this.documentacionRepo.save(documentacionActualizar);
    }
    async delete(id) {
        return await this.documentacionRepo.delete(id);
    }
    async updateImage(imageName, id) {
        return imageName;
    }
    async search(term, incluirInactivos) {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = 'AND Documentacion.estatus = true ';
        }
        else {
            strEstatus = 'AND 1=1';
        }
        return await this.documentacionRepo.find({
            where: `Documentacion.empresa = ${this.authService.empresaActiva.id}
             AND (LOWER(Documentacion.codigo) LIKE '%${term.toLowerCase()}%'
             OR LOWER(Documentacion.nombre) LIKE '%${term.toLowerCase()}%'
             OR LOWER(Documentacion.descripcion) LIKE '%${term.toLowerCase()}%') ${strEstatus}`,
            relations: this.relaciones,
        });
    }
};
DocumentacionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(documentacion_entity_1.Documentacion)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        auth_service_1.AuthService,
        marca_service_1.MarcaService,
        categoria_service_1.CategoriaService,
        unidad_service_1.UnidadService,
        inventario_service_1.InventarioService])
], DocumentacionService);
exports.DocumentacionService = DocumentacionService;
//# sourceMappingURL=documentacion.service.js.map