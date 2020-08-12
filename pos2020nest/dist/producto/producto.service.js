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
const producto_entity_1 = require("../entidades/producto.entity");
const auth_service_1 = require("../auth/auth.service");
const marca_service_1 = require("../marca/marca.service");
const categoria_service_1 = require("../categoria/categoria.service");
const unidad_service_1 = require("../unidad/unidad.service");
const typeorm_2 = require("@nestjs/typeorm");
const inventario_entity_1 = require("../entidades/inventario.entity");
const inventario_service_1 = require("../inventario/inventario.service");
let ProductoService = class ProductoService {
    constructor(productoRepo, authService, marcaService, categoriaService, unidadService, inventarioService) {
        this.productoRepo = productoRepo;
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
            strEstatus = ' AND Producto.estatus = true ';
        }
        else {
            strEstatus = '';
        }
        return await this.productoRepo.find({
            relations: this.relaciones,
            order: {
                id: 'ASC',
            },
        });
    }
    async getById(id) {
        return await this.productoRepo.findOne(id, {});
    }
    async getByCode(codigo) {
        return await this.productoRepo.findOne({
            where: {
                empresa: typeorm_1.Equal(this.authService.empresaActiva.id),
                codigo,
            },
        });
    }
    async create(producto) {
        return new Promise(async (resolve, reject) => {
            const queryRunner = typeorm_1.getConnection().createQueryRunner();
            await queryRunner.startTransaction();
            try {
                const nuevoProducto = new producto_entity_1.Producto();
                const inventario = new inventario_entity_1.Inventario();
                nuevoProducto.empresa = producto.empresa;
                nuevoProducto.codigo = producto.codigo;
                nuevoProducto.nombre = producto.nombre;
                nuevoProducto.descripcion = producto.descripcion;
                nuevoProducto.costo = producto.costo;
                nuevoProducto.precio = producto.precio;
                nuevoProducto.imagen = producto.imagen;
                console.log(producto.barcode);
                nuevoProducto.barcode = producto.barcode;
                nuevoProducto.unidad = await this.unidadService.getById(producto.unidadId);
                nuevoProducto.stockminimo = producto.stockminimo;
                console.log(await this.marcaService.getById(producto.marcaId));
                nuevoProducto.marca = await this.marcaService.getById(producto.marcaId);
                nuevoProducto.categoria = await this.categoriaService.getById(producto.categoriaId);
                nuevoProducto.estatus = producto.estatus;
                nuevoProducto.usuarioestatus = producto.usuarioestatus;
                nuevoProducto.usuariomodificacion = producto.usuariomodificacion;
                const productoBD = await queryRunner.manager.save(nuevoProducto);
                inventario.empresa = this.authService.empresaActiva;
                inventario.producto = productoBD;
                inventario.stock = 0;
                inventario.usuariomodificacion = this.authService.usuarioActivo;
                await queryRunner.manager.getRepository(inventario_entity_1.Inventario).save(inventario);
                await queryRunner.commitTransaction();
                await queryRunner.release();
                console.log('JSON ' + JSON.stringify(productoBD));
                resolve(productoBD);
            }
            catch (error) {
                await queryRunner.rollbackTransaction();
                await queryRunner.release();
                reject(error);
            }
        });
    }
    async update(id, producto) {
        const productoActualizar = await this.productoRepo.findOne(id);
        productoActualizar.codigo = producto.codigo;
        productoActualizar.nombre = producto.nombre;
        productoActualizar.descripcion = producto.descripcion;
        productoActualizar.imagen = producto.imagen;
        console.log(producto.barcode);
        productoActualizar.barcode = producto.barcode;
        productoActualizar.costo = producto.costo;
        productoActualizar.precio = producto.precio;
        productoActualizar.unidad = await this.unidadService.getById(producto.unidadId);
        productoActualizar.stockminimo = producto.stockminimo;
        productoActualizar.marca = await this.marcaService.getById(producto.marcaId);
        productoActualizar.categoria = await this.categoriaService.getById(producto.categoriaId);
        if (productoActualizar.estatus !== producto.estatus) {
            productoActualizar.estatus = producto.estatus;
            productoActualizar.usuarioestatus = this.authService.usuarioActivo;
            if (!producto.estatus) {
                const inventario = await this.inventarioService.getByProductForSale(productoActualizar.codigo);
                if (inventario.stock > 0) {
                    throw new Error(`El producto no puede ser dado de baja hasta que se agote su stock,
                     actualmente hay en existencia ${inventario.stock}`);
                }
            }
        }
        productoActualizar.usuariomodificacion = this.authService.usuarioActivo;
        return await this.productoRepo.save(productoActualizar);
    }
    async delete(id) {
        return await this.productoRepo.delete(id);
    }
    async updateImage(imageName, id) {
        return imageName;
    }
    async search(term, incluirInactivos) {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = 'AND Producto.estatus = true ';
        }
        else {
            strEstatus = 'AND 1=1';
        }
        return await this.productoRepo.find({
            where: `Producto.empresa = ${this.authService.empresaActiva.id}
             AND (LOWER(Producto.codigo) LIKE '%${term.toLowerCase()}%'
             OR LOWER(Producto.nombre) LIKE '%${term.toLowerCase()}%'
             OR LOWER(Producto.descripcion) LIKE '%${term.toLowerCase()}%') ${strEstatus}`,
            relations: this.relaciones,
        });
    }
};
ProductoService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        auth_service_1.AuthService,
        marca_service_1.MarcaService,
        categoria_service_1.CategoriaService,
        unidad_service_1.UnidadService,
        inventario_service_1.InventarioService])
], ProductoService);
exports.ProductoService = ProductoService;
//# sourceMappingURL=producto.service.js.map