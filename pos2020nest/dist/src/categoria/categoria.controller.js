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
const categoria_service_1 = require("../categoria/categoria.service");
const cresponse_1 = require("../utils/cresponse");
const CategoriaDto_1 = require("../dto/CategoriaDto");
const auth_service_1 = require("../auth/auth.service");
let CategoriaController = class CategoriaController {
    constructor(categoriaService, authService) {
        this.categoriaService = categoriaService;
        this.authService = authService;
    }
    getAll(response, incluirInactivos) {
        console.log('paso por el metodo getAll');
        this.categoriaService
            .getAll(incluirInactivos)
            .then((categorias) => {
            if (categorias.length > 0) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, categorias));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, 'No hay categorias registradas', this.authService.token));
            }
        })
            .catch(error => {
            console.log(error);
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al obtener el listado de categorias', this.authService.token, {}, error));
        });
    }
    get(response, id) {
        this.categoriaService
            .getById(id)
            .then((categoria) => {
            if (categoria) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, categoria));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, `La categoria con ID: ${id.toString()} no existe`, this.authService.token));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al obtener la categoria', this.authService.token, {}, error));
        });
    }
    create(body, response) {
        console.log(JSON.stringify(body));
        this.categoriaService
            .create(body)
            .then((categoria) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Categoria creada correctamente', this.authService.token, categoria));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al crear la nueva categoria', this.authService.token, {}, error));
        });
    }
    update(categoriadto, response, id) {
        this.categoriaService
            .update(id, categoriadto)
            .then(categoria => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Categoria actualizada con exito', this.authService.token, categoria));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al acutalizar la categoria', this.authService.token, {}, error));
        });
    }
    delete(response, id) {
        this.categoriaService
            .delete(id)
            .then(categoria => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Categoria borrada con exito', this.authService.token));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al borrar la categoria', this.authService.token, {}, error));
        });
    }
    search(response, term, incluirInactivos) {
        console.log('...................' + term);
        this.categoriaService
            .search(term, incluirInactivos)
            .then((categorias) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, categorias));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al intentar buscar categorias', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()), __param(1, common_1.Query('inactivos')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CategoriaController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CategoriaController.prototype, "get", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoriaDto_1.CategoriaDto, Object]),
    __metadata("design:returntype", void 0)
], CategoriaController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoriaDto_1.CategoriaDto, Object, Object]),
    __metadata("design:returntype", void 0)
], CategoriaController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], CategoriaController.prototype, "delete", null);
__decorate([
    common_1.Get('buscar/:term'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('term')),
    __param(2, common_1.Query('inactivos')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], CategoriaController.prototype, "search", null);
CategoriaController = __decorate([
    common_1.Controller('categoria'),
    __metadata("design:paramtypes", [categoria_service_1.CategoriaService,
        auth_service_1.AuthService])
], CategoriaController);
exports.CategoriaController = CategoriaController;
//# sourceMappingURL=categoria.controller.js.map