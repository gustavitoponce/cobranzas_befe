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
const tipo_operacion_entity_1 = require("./tipo-operacion.entity");
const caja_entity_1 = require("./caja.entity");
const persona_entity_1 = require("./persona.entity");
let Operacion = class Operacion {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Operacion.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => empresa_entity_1.Empresa, empresa => empresa.id),
    __metadata("design:type", empresa_entity_1.Empresa)
], Operacion.prototype, "empresa", void 0);
__decorate([
    typeorm_1.ManyToOne(type => persona_entity_1.Persona, persona => persona.id, {
        eager: true,
        nullable: true,
    }),
    __metadata("design:type", persona_entity_1.Persona)
], Operacion.prototype, "persona", void 0);
__decorate([
    typeorm_1.Column('decimal', { precision: 8, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Operacion.prototype, "total", void 0);
__decorate([
    typeorm_1.ManyToOne(type => tipo_operacion_entity_1.TipoOperacion, operacion => operacion.id, {
        eager: true,
    }),
    __metadata("design:type", tipo_operacion_entity_1.TipoOperacion)
], Operacion.prototype, "tipooperacion", void 0);
__decorate([
    typeorm_1.ManyToOne(type => caja_entity_1.Caja, caja => caja.id),
    __metadata("design:type", caja_entity_1.Caja)
], Operacion.prototype, "caja", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Operacion.prototype, "fechamodificacion", void 0);
__decorate([
    typeorm_1.ManyToOne(type => usuario_entity_1.Usuario, usuario => usuario.id),
    __metadata("design:type", usuario_entity_1.Usuario)
], Operacion.prototype, "usuariomodificacion", void 0);
Operacion = __decorate([
    typeorm_1.Entity()
], Operacion);
exports.Operacion = Operacion;
//# sourceMappingURL=operacion.entity.js.map