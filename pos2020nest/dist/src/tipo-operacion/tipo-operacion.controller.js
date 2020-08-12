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
const tipo_operacion_service_1 = require("../tipo-operacion/tipo-operacion.service");
const auth_service_1 = require("../auth/auth.service");
const cresponse_1 = require("../utils/cresponse");
const tipo_operacion_dto_1 = require("../dto/tipo-operacion.dto");
let TipoOperacionController = class TipoOperacionController {
    constructor(authService, tipoOperacionService) {
        this.authService = authService;
        this.tipoOperacionService = tipoOperacionService;
    }
    getAll(response) {
        this.tipoOperacionService
            .getAll()
            .then((tipoOperaciones) => {
            if (tipoOperaciones.length > 0) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, tipoOperaciones));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, 'No hay tipos de operación registradas', this.authService.token));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al obtener el listado de tipos de operación', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    get(response, id) {
        this.tipoOperacionService
            .getById(id)
            .then((tipoOperacion) => {
            if (tipoOperacion) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, tipoOperacion));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, `El tipo de operación con ID: ${id.toString()} no existe`), this.authService.token);
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al obtener el tipo de operación', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    getByCode(response, codigo) {
        this.tipoOperacionService
            .getByCode(codigo)
            .then((tipoOperacion) => {
            if (tipoOperacion) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, tipoOperacion));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, `El tipo de operación con codigo: ${codigo.toString()} no existe`), this.authService.token);
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al obtener el tipo de operación', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    create(body, response) {
        this.tipoOperacionService
            .create(body)
            .then((tipoOperacion) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Tipo de operación creada correctamente', this.authService.token, tipoOperacion));
        })
            .catch((error) => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al crear el tipo de operación', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    update(tipoOperaciondto, response, id) {
        this.tipoOperacionService
            .update(id, tipoOperaciondto)
            .then((tipoOperacion) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Tipo de operación actualizada con exito', this.authService.token, tipoOperacion));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al actualizar el tipo de operación', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    delete(response, id) {
        this.tipoOperacionService
            .delete(id)
            .then(() => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Tipo de operación borrada con exito', this.authService.token));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al borrar la el tipo de operación', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TipoOperacionController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TipoOperacionController.prototype, "get", null);
__decorate([
    common_1.Get('/codigo/:codigo'),
    __param(0, common_1.Res()), __param(1, common_1.Param('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TipoOperacionController.prototype, "getByCode", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tipo_operacion_dto_1.TipoOperacionDto, Object]),
    __metadata("design:returntype", void 0)
], TipoOperacionController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tipo_operacion_dto_1.TipoOperacionDto, Object, Object]),
    __metadata("design:returntype", void 0)
], TipoOperacionController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], TipoOperacionController.prototype, "delete", null);
TipoOperacionController = __decorate([
    common_1.Controller('tipo-operacion'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        tipo_operacion_service_1.TipoOperacionService])
], TipoOperacionController);
exports.TipoOperacionController = TipoOperacionController;
//# sourceMappingURL=tipo-operacion.controller.js.map