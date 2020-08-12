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
const producto_entity_1 = require("./producto.entity");
const typeorm_2 = require("typeorm");
let Inventario = class Inventario {
};
__decorate([
    typeorm_2.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Inventario.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne(type => producto_entity_1.Producto, producto => producto.id, {
        eager: true,
    }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", producto_entity_1.Producto)
], Inventario.prototype, "producto", void 0);
__decorate([
    typeorm_1.ManyToOne(type => empresa_entity_1.Empresa),
    __metadata("design:type", empresa_entity_1.Empresa)
], Inventario.prototype, "empresa", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Inventario.prototype, "stock", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Inventario.prototype, "fechamodificacion", void 0);
__decorate([
    typeorm_1.ManyToOne(type => usuario_entity_1.Usuario, usuario => usuario.id),
    __metadata("design:type", usuario_entity_1.Usuario)
], Inventario.prototype, "usuariomodificacion", void 0);
Inventario = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(['producto'])
], Inventario);
exports.Inventario = Inventario;
//# sourceMappingURL=inventario.entity.js.map