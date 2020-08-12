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
const documentacion_dto_1 = require("../dto/documentacion.dto");
const documentacion_service_1 = require("./documentacion.service");
const cresponse_1 = require("../utils/cresponse");
const auth_service_1 = require("../auth/auth.service");
let DocumentacionController = class DocumentacionController {
    constructor(authService, documentService) {
        this.authService = authService;
        this.documentService = documentService;
    }
    getAll(response, incluirInactivos) {
        this.documentService
            .getAll(incluirInactivos)
            .then((documentacion) => {
            if (documentacion.length > 0) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, documentacion));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, 'No hay documentacion registradas', this.authService.token));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al obtener el listado de productos', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    get(response, id) {
        this.documentService
            .getdoc(id)
            .then((documentacion) => {
            if (documentacion) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, documentacion));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, `El producto con ID: ${id.toString()} no existe`, this.authService.token));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al obtener la producto', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    getByCode(response, id) {
        this.documentService
            .getByCode(id)
            .then((documentacion) => {
            if (documentacion) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, documentacion));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, `El producto con codigo: ${id.toString()} no existe`, this.authService.token));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al obtener la producto', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    create(body, response) {
        this.documentService
            .create(body)
            .then((documentacion) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Se creó el producto correctamente', this.authService.token, documentacion));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al crear el nuevo producto', null, this.authService.token, { message: error.message, stack: error.stack }));
        });
    }
    update(documentacion, response, id) {
        this.documentService
            .update(id, documentacion)
            .then((marca) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Se actualizó el producto con exito', this.authService.token, marca));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al actualizar el producto', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    delete(response, id) {
        this.documentService
            .delete(id)
            .then(() => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Producto borrado con exito', this.authService.token));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al borrar el producto', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()), __param(1, common_1.Query('inactivos')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DocumentacionController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DocumentacionController.prototype, "get", null);
__decorate([
    common_1.Get('/codigo/:codigo'),
    __param(0, common_1.Res()), __param(1, common_1.Param('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DocumentacionController.prototype, "getByCode", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [documentacion_dto_1.DocumentacionDto, Object]),
    __metadata("design:returntype", void 0)
], DocumentacionController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [documentacion_dto_1.DocumentacionDto, Object, Object]),
    __metadata("design:returntype", void 0)
], DocumentacionController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], DocumentacionController.prototype, "delete", null);
DocumentacionController = __decorate([
    common_1.Controller('documentacion'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        documentacion_service_1.DocumentacionService])
], DocumentacionController);
exports.DocumentacionController = DocumentacionController;
//# sourceMappingURL=documentacion.controller.js.map