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
const detalleprestamo_service_1 = require("./detalleprestamo.service");
const cresponse_1 = require("../utils/cresponse");
const detalle_prestamo_dto_1 = require("../dto/detalle-prestamo.dto");
let DetallePrestamoController = class DetallePrestamoController {
    constructor(detalleprestamoService) {
        this.detalleprestamoService = detalleprestamoService;
    }
    getAll(response, incluirInactivos) {
        this.detalleprestamoService
            .getAll(incluirInactivos)
            .then((detalleprestamos) => {
            if (detalleprestamos.length > 0) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', null, detalleprestamos));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, 'No hay zonas registradas pibe', null, null));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al obtener el listado de zonas', null, {}, error));
        });
    }
    get(response, id) {
        this.detalleprestamoService
            .getById(id)
            .then((detalleprestamo) => {
            if (detalleprestamo) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', null, detalleprestamo));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, `La zona con ID: ${id.toString()} no existe`));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al obtener la zona', null, {}, error));
        });
    }
    create(detalleprestamoDto, response) {
        this.detalleprestamoService
            .create(detalleprestamoDto)
            .then(detalleprestamo => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Zona creada correctamente', null, detalleprestamo));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al crear la nueva zona', null, {}, error));
        });
    }
    update(detalleprestamoDto, response, id) {
    }
    delete(response, id) {
        this.detalleprestamoService
            .delete(id)
            .then(detalleprestamo => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Empresa borrada con exito'));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
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
], DetallePrestamoController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], DetallePrestamoController.prototype, "get", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [detalle_prestamo_dto_1.DetallePrestamoDto, Object]),
    __metadata("design:returntype", void 0)
], DetallePrestamoController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [detalle_prestamo_dto_1.DetallePrestamoDto, Object, Number]),
    __metadata("design:returntype", void 0)
], DetallePrestamoController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], DetallePrestamoController.prototype, "delete", null);
DetallePrestamoController = __decorate([
    common_1.Controller('detalleprestamo'),
    __metadata("design:paramtypes", [detalleprestamo_service_1.DetallePrestamoService])
], DetallePrestamoController);
exports.DetallePrestamoController = DetallePrestamoController;
//# sourceMappingURL=detalleprestamo.controller.js.map