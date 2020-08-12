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
const ProductoDto_1 = require("../dto/ProductoDto");
const producto_service_1 = require("./producto.service");
const cresponse_1 = require("../utils/cresponse");
const auth_service_1 = require("../auth/auth.service");
let ProductoController = class ProductoController {
    constructor(authService, productService) {
        this.authService = authService;
        this.productService = productService;
    }
    getAll(response, incluirInactivos) {
        this.productService
            .getAll(incluirInactivos)
            .then((productos) => {
            if (productos.length > 0) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, productos));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, 'No hay productos registradas', this.authService.token));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al obtener el listado de productos', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    get(response, id) {
        this.productService
            .getById(id)
            .then((producto) => {
            if (producto) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, producto));
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
        this.productService
            .getByCode(id)
            .then((producto) => {
            if (producto) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, producto));
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
        this.productService
            .create(body)
            .then((producto) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Se creó el producto correctamente', this.authService.token, producto));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al crear el nuevo producto', null, this.authService.token, { message: error.message, stack: error.stack }));
        });
    }
    update(producto, response, id) {
        this.productService
            .update(id, producto)
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
        this.productService
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
], ProductoController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "get", null);
__decorate([
    common_1.Get('/codigo/:codigo'),
    __param(0, common_1.Res()), __param(1, common_1.Param('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "getByCode", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductoDto_1.ProductoDto, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductoDto_1.ProductoDto, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "delete", null);
ProductoController = __decorate([
    common_1.Controller('producto'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        producto_service_1.ProductoService])
], ProductoController);
exports.ProductoController = ProductoController;
//# sourceMappingURL=producto.controller.js.map