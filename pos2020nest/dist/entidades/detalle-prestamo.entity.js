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
const prestamo_entity_1 = require("./prestamo.entity");
let DetallePrestamo = class DetallePrestamo {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], DetallePrestamo.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => prestamo_entity_1.Prestamo, prestamo => prestamo.id, {
        eager: true,
    }),
    __metadata("design:type", prestamo_entity_1.Prestamo)
], DetallePrestamo.prototype, "prestamo", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], DetallePrestamo.prototype, "nrocuota", void 0);
__decorate([
    typeorm_1.Column('decimal', { precision: 8, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], DetallePrestamo.prototype, "capital", void 0);
__decorate([
    typeorm_1.Column('decimal', { precision: 8, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], DetallePrestamo.prototype, "interes", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], DetallePrestamo.prototype, "vencimiento", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], DetallePrestamo.prototype, "fechapago", void 0);
DetallePrestamo = __decorate([
    typeorm_1.Entity()
], DetallePrestamo);
exports.DetallePrestamo = DetallePrestamo;
//# sourceMappingURL=detalle-prestamo.entity.js.map