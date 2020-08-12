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
const estado_entity_1 = require("./estado.entity");
const persona_entity_1 = require("./persona.entity");
let Prestamo = class Prestamo {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Prestamo.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => persona_entity_1.Persona, persona => persona.id, {
        eager: true,
    }),
    __metadata("design:type", persona_entity_1.Persona)
], Prestamo.prototype, "cliente", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Prestamo.prototype, "cuotas", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], Prestamo.prototype, "estatus", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Prestamo.prototype, "fecha", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Prestamo.prototype, "importe", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Prestamo.prototype, "zona", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Prestamo.prototype, "interes", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Prestamo.prototype, "tasa", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Prestamo.prototype, "tipo", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Prestamo.prototype, "usuarioAlta", void 0);
__decorate([
    typeorm_1.Column({ type: "mediumtext", nullable: true }),
    __metadata("design:type", String)
], Prestamo.prototype, "observacion", void 0);
__decorate([
    typeorm_1.ManyToOne(type => usuario_entity_1.Usuario, usuario => usuario.id, {
        eager: true,
    }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Prestamo.prototype, "usuariomodificacion", void 0);
__decorate([
    typeorm_1.ManyToOne(type => estado_entity_1.Estado, estado => estado.id, {
        eager: true,
    }),
    __metadata("design:type", estado_entity_1.Estado)
], Prestamo.prototype, "estado", void 0);
__decorate([
    typeorm_1.ManyToOne(type => usuario_entity_1.Usuario, usuario => usuario.id),
    __metadata("design:type", usuario_entity_1.Usuario)
], Prestamo.prototype, "usuarioestatus", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Prestamo.prototype, "fechamodificacion", void 0);
Prestamo = __decorate([
    typeorm_1.Entity()
], Prestamo);
exports.Prestamo = Prestamo;
//# sourceMappingURL=prestamo.entity.js.map