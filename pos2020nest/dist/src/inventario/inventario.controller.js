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
const inventario_service_1 = require("./inventario.service");
const cresponse_1 = require("../utils/cresponse");
const inventario_entity_1 = require("../entidades/inventario.entity");
const auth_service_1 = require("../auth/auth.service");
const InventarioDto_1 = require("../dto/InventarioDto");
let InventarioController = class InventarioController {
    constructor(inventarioService, authService) {
        this.inventarioService = inventarioService;
        this.authService = authService;
    }
    getAll(response) {
        this.inventarioService
            .getAll()
            .then((inventarios) => {
            if (inventarios.length > 0) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, inventarios));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, 'No hay ningun producto registrado en el inventario', this.authService.token));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al obtener el listado del Inventario', this.authService.token, [], { message: error.message, stack: error.stack }));
        });
    }
    get(response, id) {
        this.inventarioService
            .getById(id)
            .then((inventario) => {
            if (inventario) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, inventario));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, `El Inventario con ID: ${id.toString()} no existe`, this.authService.token));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al obtener el inventario del producto', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    getByProductCode(response, codigo) {
        this.inventarioService
            .getByProductForSale(codigo)
            .then((inventario) => {
            if (inventario) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, inventario));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, `El producto con codigo: ${codigo} no existe`, this.authService.token));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al obtener el inventario del producto', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    supply(inventariodto, response, id) {
        this.inventarioService
            .supply(id, inventariodto)
            .then((inventario) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Inventario actualizada con exito', this.authService.token, inventario_entity_1.Inventario));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al acutalizar ek inventario', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InventarioController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], InventarioController.prototype, "get", null);
__decorate([
    common_1.Get('/producto/:codigo'),
    __param(0, common_1.Res()), __param(1, common_1.Param('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], InventarioController.prototype, "getByProductCode", null);
__decorate([
    common_1.Put('/supply/:id'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InventarioDto_1.InventarioDto, Object, Object]),
    __metadata("design:returntype", void 0)
], InventarioController.prototype, "supply", null);
InventarioController = __decorate([
    common_1.Controller('inventario'),
    __metadata("design:paramtypes", [inventario_service_1.InventarioService,
        auth_service_1.AuthService])
], InventarioController);
exports.InventarioController = InventarioController;
//# sourceMappingURL=inventario.controller.js.map