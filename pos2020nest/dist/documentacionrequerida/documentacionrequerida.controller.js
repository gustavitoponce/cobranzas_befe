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
const documentacion_requerida_dto_1 = require("../dto/documentacion-requerida.dto");
const documentacionrequerida_service_1 = require("./documentacionrequerida.service");
const cresponse_1 = require("../utils/cresponse");
const auth_service_1 = require("../auth/auth.service");
let DocumentacionRequeridaController = class DocumentacionRequeridaController {
    constructor(authService, DocumentacionRequeridService) {
        this.authService = authService;
        this.DocumentacionRequeridService = DocumentacionRequeridService;
    }
    getAll(response, incluirInactivos) {
        this.DocumentacionRequeridService
            .getAll(incluirInactivos)
            .then((documentacionrequerida) => {
            if (documentacionrequerida.length > 0) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, documentacionrequerida));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, 'No hay documentacionrequerida registradas', this.authService.token));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al obtener el listado de documentacionrequerida', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    get(response, id) {
        this.DocumentacionRequeridService
            .getById(id)
            .then((documentacionrequerida) => {
            if (documentacionrequerida) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, documentacionrequerida));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, `El documentacionrequerida con ID: ${id.toString()} no existe`, this.authService.token));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al obtener la documentacionrequerida', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    getByCode(response, id) {
        this.DocumentacionRequeridService
            .getByCode(id)
            .then((documentacionrequerida) => {
            if (documentacionrequerida) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, documentacionrequerida));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, `El documentacionrequerida con codigo: ${id.toString()} no existe`, this.authService.token));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al obtener la documentacionrequerida', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    create(body, response) {
        this.DocumentacionRequeridService
            .create(body)
            .then((documentacionrequerida) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Se creó el documentacionrequerida correctamente', this.authService.token, documentacionrequerida));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al crear el nuevo documentacionrequerida', null, this.authService.token, { message: error.message, stack: error.stack }));
        });
    }
    update(documentacionrequerida, response, id) {
        this.DocumentacionRequeridService
            .update(id, documentacionrequerida)
            .then((marca) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Se actualizó el documentacionrequerida con exito', this.authService.token, marca));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al actualizar el documentacionrequerida', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    delete(response, id) {
        this.DocumentacionRequeridService
            .delete(id)
            .then(() => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'DocumentacionRequerida borrado con exito', this.authService.token));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al borrar el documentacionrequerida', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()), __param(1, common_1.Query('inactivos')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DocumentacionRequeridaController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DocumentacionRequeridaController.prototype, "get", null);
__decorate([
    common_1.Get('/codigo/:codigo'),
    __param(0, common_1.Res()), __param(1, common_1.Param('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DocumentacionRequeridaController.prototype, "getByCode", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [documentacion_requerida_dto_1.DocumentacionRequeridaDto, Object]),
    __metadata("design:returntype", void 0)
], DocumentacionRequeridaController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [documentacion_requerida_dto_1.DocumentacionRequeridaDto, Object, Object]),
    __metadata("design:returntype", void 0)
], DocumentacionRequeridaController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], DocumentacionRequeridaController.prototype, "delete", null);
DocumentacionRequeridaController = __decorate([
    common_1.Controller('documentacionrequerida'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        documentacionrequerida_service_1.DocumentacionRequeridaService])
], DocumentacionRequeridaController);
exports.DocumentacionRequeridaController = DocumentacionRequeridaController;
//# sourceMappingURL=documentacionrequerida.controller.js.map