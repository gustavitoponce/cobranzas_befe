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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity");
const empresa_entity_1 = require("./empresa.entity");
const marca_entity_1 = require("./marca.entity");
const categoria_entity_1 = require("./categoria.entity");
const unidad_entity_1 = require("./unidad.entity");
let Producto = class Producto {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Producto.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => empresa_entity_1.Empresa, empresa => empresa.id, {
        eager: true,
    }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Producto.prototype, "empresa", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Producto.prototype, "codigo", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Producto.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Producto.prototype, "barcode", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Producto.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.Column('decimal', { precision: 8, scale: 2 }),
    __metadata("design:type", Number)
], Producto.prototype, "costo", void 0);
__decorate([
    typeorm_1.Column('decimal', { precision: 8, scale: 2 }),
    __metadata("design:type", Number)
], Producto.prototype, "precio", void 0);
__decorate([
    typeorm_1.ManyToOne(type => unidad_entity_1.Unidad, unidad => unidad.id, {
        eager: true,
    }),
    __metadata("design:type", unidad_entity_1.Unidad)
], Producto.prototype, "unidad", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Producto.prototype, "stockminimo", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Producto.prototype, "imagen", void 0);
__decorate([
    typeorm_1.ManyToOne(type => marca_entity_1.Marca, marca => marca.id, {
        eager: true,
    }),
    __metadata("design:type", marca_entity_1.Marca)
], Producto.prototype, "marca", void 0);
__decorate([
    typeorm_1.ManyToOne(type => categoria_entity_1.Categoria, categoria => categoria.id, {
        eager: true,
    }),
    __metadata("design:type", categoria_entity_1.Categoria)
], Producto.prototype, "categoria", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Producto.prototype, "estatus", void 0);
__decorate([
    typeorm_1.ManyToOne(type => usuario_entity_1.Usuario, usuario => usuario.id, {
        eager: true,
    }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Producto.prototype, "usuarioestatus", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Producto.prototype, "fechamodificacion", void 0);
__decorate([
    typeorm_1.ManyToOne(type => usuario_entity_1.Usuario, usuario => usuario.id, {
        eager: true,
    }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Producto.prototype, "usuariomodificacion", void 0);
Producto = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(['empresa', 'codigo'])
], Producto);
exports.Producto = Producto;
//# sourceMappingURL=producto.entity.js.map