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
const persona_entity_1 = require("../entidades/persona.entity");
const typeorm_2 = require("typeorm");
const auth_service_1 = require("../auth/auth.service");
let PersonaService = class PersonaService {
    constructor(personaRepo, authService) {
        this.personaRepo = personaRepo;
        this.authService = authService;
        this.relaciones = [
            'empresa',
            'usuarioestatus',
            'usuariomodificacion',
        ];
    }
    async getAll(incluirInactivos = 'false') {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = ' AND Persona.estatus = true ';
        }
        else {
            strEstatus = '';
        }
        return await this.personaRepo.find({
            relations: this.relaciones,
            order: {
                id: 'ASC',
            },
        });
    }
    async getById(id) {
        return await this.personaRepo.findOne(id, {
            relations: this.relaciones,
        });
    }
    async getPersonaDefaultVenta() {
        console.log(JSON.stringify(this.personaRepo.findOne({
            where: {
                esPersonaVentaPublico: typeorm_2.Equal(true),
            },
            relations: this.relaciones,
        })));
        return await this.personaRepo.findOne({
            where: {
                esPersonaVentaPublico: typeorm_2.Equal(true),
            },
            relations: this.relaciones,
        });
    }
    async create(persona) {
        if (persona.esPersonaVentaPublico) {
            const [personaVEntaPublico, conteo] = await this.personaRepo.findAndCount({
                where: {
                    empresa: typeorm_2.Equal(this.authService.empresaActiva.id),
                    esPersonaVentaPublico: true,
                },
            });
            if (conteo >= 1) {
                throw new Error(`Solo puede haber una persona que represente las ventas al publico, ya existe ${personaVEntaPublico[0].nombre}`);
            }
        }
        const nuevaPersona = new persona_entity_1.Persona();
        nuevaPersona.empresa = persona.empresa;
        nuevaPersona.nombre = persona.nombre;
        nuevaPersona.nombreempresa = persona.nombreempresa;
        nuevaPersona.direccion = persona.direccion;
        nuevaPersona.telefono = persona.telefono;
        nuevaPersona.correo = persona.correo;
        nuevaPersona.tipo = persona.tipo;
        nuevaPersona.estatus = persona.estatus;
        nuevaPersona.usuarioestatus = persona.usuarioestatus;
        nuevaPersona.usuariomodificacion = persona.usuariomodificacion;
        nuevaPersona.esPersonaVentaPublico = persona.esPersonaVentaPublico;
        return await this.personaRepo.save(nuevaPersona);
    }
    async update(id, persona) {
        if (persona.esPersonaVentaPublico) {
            const [personaVEntaPublico, conteo] = await this.personaRepo.findAndCount({
                where: {
                    empresa: typeorm_2.Equal(this.authService.empresaActiva.id),
                    esPersonaVentaPublico: true,
                    id: typeorm_2.Not(id),
                },
            });
            if (conteo >= 1) {
                throw new Error(`Solo puede haber una persona que represente las ventas al publico, ya existe ${personaVEntaPublico[0].nombre}`);
            }
        }
        const personaActualizar = await this.personaRepo.findOne(id);
        personaActualizar.empresa = persona.empresa;
        personaActualizar.nombre = persona.nombre;
        personaActualizar.nombreempresa = persona.nombreempresa;
        personaActualizar.direccion = persona.direccion;
        personaActualizar.telefono = persona.telefono;
        personaActualizar.correo = persona.correo;
        personaActualizar.tipo = persona.tipo;
        if (personaActualizar.estatus !== persona.estatus) {
            personaActualizar.estatus = persona.estatus;
            personaActualizar.usuarioestatus = persona.usuarioestatus;
        }
        personaActualizar.usuarioestatus = persona.usuarioestatus;
        personaActualizar.usuariomodificacion = persona.usuariomodificacion;
        personaActualizar.esPersonaVentaPublico = persona.esPersonaVentaPublico;
        return await this.personaRepo.save(personaActualizar);
    }
    async delete(id) {
        return await this.personaRepo.delete(id);
    }
    async search(term, incluirInactivos) {
        let strEstatus;
        if (incluirInactivos === 'false') {
            strEstatus = 'AND Persona.estatus = true ';
        }
        else {
            strEstatus = 'AND 1=1';
        }
        return await this.personaRepo.find({
            where: `
              (LOWER(Persona.nombre) LIKE '%${term.toLowerCase()}%'
             OR LOWER(Persona.nombreempresa) LIKE '%${term.toLowerCase()}%') ${strEstatus}`,
            relations: this.relaciones,
        });
    }
};
PersonaService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(persona_entity_1.Persona)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], PersonaService);
exports.PersonaService = PersonaService;
//# sourceMappingURL=persona.service.js.map