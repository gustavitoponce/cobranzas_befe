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
let Categoria = class Categoria {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Categoria.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => empresa_entity_1.Empresa, empresa => empresa.id),
    __metadata("design:type", empresa_entity_1.Empresa)
], Categoria.prototype, "empresa", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Categoria.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Categoria.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Categoria.prototype, "estatus", void 0);
__decorate([
    typeorm_1.ManyToOne(type => usuario_entity_1.Usuario, usuario => usuario.id),
    __metadata("design:type", usuario_entity_1.Usuario)
], Categoria.prototype, "usuarioestatus", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Categoria.prototype, "fechamodificacion", void 0);
__decorate([
    typeorm_1.ManyToOne(type => usuario_entity_1.Usuario, usuario => usuario.id),
    __metadata("design:type", usuario_entity_1.Usuario)
], Categoria.prototype, "usuariomodificacion", void 0);
Categoria = __decorate([
    typeorm_1.Entity()
], Categoria);
exports.Categoria = Categoria;
//# sourceMappingURL=categoria.entity.js.map