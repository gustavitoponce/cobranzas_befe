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
const unidad_service_1 = require("../unidad/unidad.service");
const auth_service_1 = require("../auth/auth.service");
const cresponse_1 = require("../utils/cresponse");
const UnidadDto_1 = require("../dto/UnidadDto");
let UnidadController = class UnidadController {
    constructor(authService, unidadService) {
        this.authService = authService;
        this.unidadService = unidadService;
    }
    getAll(response, incluirInactivos) {
        this.unidadService
            .getAll(incluirInactivos)
            .then((unidades) => {
            if (unidades.length > 0) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, unidades));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, 'No hay unidades registradas', this.authService.token));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al obtener el listado de unidades', this.authService.token, {}, error));
        });
    }
    get(response, id) {
        this.unidadService
            .getById(id)
            .then((unidad) => {
            if (unidad) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, unidad));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, `La unidad con ID: ${id.toString()} no existe`), this.authService.token);
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al obtener la unidad', this.authService.token, {}, error));
        });
    }
    create(body, response) {
        this.unidadService
            .create(body)
            .then((unidad) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Unidad creada correctamente', this.authService.token, unidad));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al crear la unidad', this.authService.token, {}, error));
        });
    }
    update(unidaddto, response, id) {
        this.unidadService
            .update(id, unidaddto)
            .then((unidad) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Unidad actualizada con exito', this.authService.token, unidad));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al actualizar la unidad', this.authService.token, {}, error));
        });
    }
    delete(response, id) {
        this.unidadService
            .delete(id)
            .then(() => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Unidad borrada con exito', this.authService.token));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al borrar la unidad', this.authService.token, {}, error));
        });
    }
    search(response, term, incluirInactivos) {
        this.unidadService
            .search(term, incluirInactivos)
            .then((unidades) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, unidades));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al buscar unidades', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()), __param(1, common_1.Query('inactivos')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UnidadController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UnidadController.prototype, "get", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UnidadDto_1.UnidadDto, Object]),
    __metadata("design:returntype", void 0)
], UnidadController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UnidadDto_1.UnidadDto, Object, Object]),
    __metadata("design:returntype", void 0)
], UnidadController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], UnidadController.prototype, "delete", null);
__decorate([
    common_1.Get('buscar/:term'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('term')),
    __param(2, common_1.Query('inactivos')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], UnidadController.prototype, "search", null);
UnidadController = __decorate([
    common_1.Controller('unidad'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        unidad_service_1.UnidadService])
], UnidadController);
exports.UnidadController = UnidadController;
//# sourceMappingURL=unidad.controller.js.map