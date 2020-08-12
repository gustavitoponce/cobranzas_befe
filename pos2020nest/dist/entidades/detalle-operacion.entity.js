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
const operacion_entity_1 = require("./operacion.entity");
const producto_entity_1 = require("./producto.entity");
let DetalleOperacion = class DetalleOperacion {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], DetalleOperacion.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => empresa_entity_1.Empresa, empresa => empresa.id),
    __metadata("design:type", empresa_entity_1.Empresa)
], DetalleOperacion.prototype, "empresa", void 0);
__decorate([
    typeorm_1.ManyToOne(type => operacion_entity_1.Operacion, operacion => operacion.id),
    __metadata("design:type", operacion_entity_1.Operacion)
], DetalleOperacion.prototype, "operacion", void 0);
__decorate([
    typeorm_1.ManyToOne(type => producto_entity_1.Producto, producto => producto.id, {
        eager: true,
    }),
    __metadata("design:type", producto_entity_1.Producto)
], DetalleOperacion.prototype, "producto", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], DetalleOperacion.prototype, "cantidad", void 0);
__decorate([
    typeorm_1.Column('decimal', { precision: 8, scale: 2 }),
    __metadata("design:type", Number)
], DetalleOperacion.prototype, "total", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], DetalleOperacion.prototype, "fechamodificacion", void 0);
__decorate([
    typeorm_1.ManyToOne(type => usuario_entity_1.Usuario, usuario => usuario.id),
    __metadata("design:type", usuario_entity_1.Usuario)
], DetalleOperacion.prototype, "usuariomodificacion", void 0);
DetalleOperacion = __decorate([
    typeorm_1.Entity()
], DetalleOperacion);
exports.DetalleOperacion = DetalleOperacion;
//# sourceMappingURL=detalle-operacion.entity.js.map