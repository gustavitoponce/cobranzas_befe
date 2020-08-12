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
const prestamo_service_1 = require("./prestamo.service");
const cresponse_1 = require("../utils/cresponse");
const prestamo_dto_1 = require("../dto/prestamo-dto");
let PrestamoController = class PrestamoController {
    constructor(prestamoService) {
        this.prestamoService = prestamoService;
    }
    getAll(response, incluirInactivos) {
        this.prestamoService.getAll(incluirInactivos).then((prestamos) => {
            if (prestamos.length > 0) {
                response.status(common_1.HttpStatus.OK).json(new cresponse_1.CResponse(1, 'Exito', null, prestamos));
            }
            else {
                response.status(common_1.HttpStatus.OK).json(new cresponse_1.CResponse(3, 'No hay zonas registradas pibe', null, null));
            }
        }).catch((error) => {
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al obtener el listado de zonas', null, {}, error));
        });
    }
    get(response, id) {
        this.prestamoService.getById(id).then((prestamo) => {
            if (prestamo) {
                response.status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', null, prestamo));
            }
            else {
                response.status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, `La zona con ID: ${id.toString()} no existe`));
            }
        }).catch((error) => {
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(new cresponse_1.CResponse(-1, 'Error al obtener la zona', null, {}, error));
        });
    }
    create(prestamoDto, response) {
        this.prestamoService.create(prestamoDto).then((prestamo) => {
            response.status(common_1.HttpStatus.OK).json(new cresponse_1.CResponse(1, 'Zona creada correctamente', null, prestamo));
        }).catch((error) => {
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al crear la nueva zona', null, {}, error));
        });
    }
    update(prestamoDto, response, id) {
        console.log('llego a prestamo.controller.ts');
        this.prestamoService
            .update(id, prestamoDto)
            .then((prestamo) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Marca actualizada con exito', null, prestamo));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al acutalizar la marca', null, {}, { message: error.message, stack: error.stack }));
        });
    }
    delete(response, id) {
        this.prestamoService.delete(id).then((prestamo) => {
            response.status(common_1.HttpStatus.OK).json(new cresponse_1.CResponse(1, 'Empresa borrada con exito'));
        }).catch((error) => {
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al borrar la empresa', null, {}, error));
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()), __param(1, common_1.Query('inactivos')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PrestamoController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PrestamoController.prototype, "get", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [prestamo_dto_1.PrestamoDto, Object]),
    __metadata("design:returntype", void 0)
], PrestamoController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [prestamo_dto_1.PrestamoDto, Object, Number]),
    __metadata("design:returntype", void 0)
], PrestamoController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PrestamoController.prototype, "delete", null);
PrestamoController = __decorate([
    common_1.Controller('prestamo'),
    __metadata("design:paramtypes", [prestamo_service_1.PrestamoService])
], PrestamoController);
exports.PrestamoController = PrestamoController;
//# sourceMappingURL=prestamo.controller.js.map