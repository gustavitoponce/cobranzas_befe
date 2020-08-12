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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const prestamo_entity_1 = require("../entidades/prestamo.entity");
let PrestamoService = class PrestamoService {
    constructor(prestamoRepo) {
        this.prestamoRepo = prestamoRepo;
    }
    async getAll(incluirInactivos = 'false') {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = 'Prestamo.estatus = true ';
        }
        else {
            strEstatus = '1=1';
        }
        return await this.prestamoRepo.find({ where: `${strEstatus}`,
            relations: [
                'usuarioestatus',
                'usuariomodificacion',
            ],
        });
    }
    async getById(id) {
        return await this.prestamoRepo.findOne(id, { relations: [
                'usuarioestatus',
                'usuariomodificacion',
            ],
        });
    }
    async create(prestamo) {
        console.log('paso por el metodo create gfp');
        console.log(JSON.stringify(prestamo));
        const nuevo = new prestamo_entity_1.Prestamo();
        nuevo.observacion = "Prueba";
        nuevo.cliente = prestamo.cliente;
        nuevo.importe = prestamo.importe;
        nuevo.interes = prestamo.interes;
        nuevo.tipo = prestamo.tipo;
        nuevo.tasa = prestamo.tasa;
        nuevo.fecha = new Date();
        nuevo.zona = prestamo.zona;
        console.log(nuevo.zona);
        nuevo.estatus = prestamo.estatus;
        nuevo.cuotas = prestamo.cuotas;
        console.log(nuevo.estado);
        nuevo.estado = prestamo.estado;
        nuevo.usuarioAlta = prestamo.usuarioAlta;
        return await this.prestamoRepo.save(nuevo);
    }
    async update(id, prestamo) {
        const prestamoActualizar = await this.prestamoRepo.findOne(id);
        console.log('llego al puto servicio con id sssss ', id);
        console.log("viva Peron y evita");
        prestamoActualizar.observacion = "viva Peron y evita";
        return await this.prestamoRepo.save(prestamoActualizar);
    }
    async delete(id) {
        return await this.prestamoRepo.delete(id);
    }
};
PrestamoService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(prestamo_entity_1.Prestamo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PrestamoService);
exports.PrestamoService = PrestamoService;
//# sourceMappingURL=prestamo.service.js.map