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
const empresa_service_1 = require("./empresa.service");
const cresponse_1 = require("../utils/cresponse");
const empresa_dto_1 = require("../dto/empresa-dto");
let EmpresaController = class EmpresaController {
    constructor(empresaService) {
        this.empresaService = empresaService;
    }
    getAll(response, incluirInactivos) {
        this.empresaService
            .getAll(incluirInactivos)
            .then((empresas) => {
            if (empresas.length > 0) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', null, empresas));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, 'No hay empresas registradas pibe', null, null));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al obtener el listado de empresas', null, {}, error));
        });
    }
    get(response, id) {
        this.empresaService
            .getById(id)
            .then((empresa) => {
            if (empresa) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', null, empresa));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, `La empresa con ID: ${id.toString()} no existe`));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al obtener la empresa', null, {}, error));
        });
    }
    create(empresaDto, response) {
        this.empresaService
            .create(empresaDto)
            .then(empresa => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Empresa creada correctamente', null, empresa));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al crear la nueva empresa', null, {}, error));
        });
    }
    update(empresaDto, response, id) {
        this.empresaService
            .update(id, empresaDto)
            .then(empresa => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Empresa actualizada con exito', null, empresa));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Error al acutalizar la empresa', null, {}, error));
        });
    }
    delete(response, id) {
        this.empresaService
            .delete(id)
            .then(empresa => {
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
], EmpresaController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], EmpresaController.prototype, "get", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [empresa_dto_1.EmpresaDto, Object]),
    __metadata("design:returntype", void 0)
], EmpresaController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [empresa_dto_1.EmpresaDto, Object, Number]),
    __metadata("design:returntype", void 0)
], EmpresaController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], EmpresaController.prototype, "delete", null);
EmpresaController = __decorate([
    common_1.Controller('empresa'),
    __metadata("design:paramtypes", [empresa_service_1.EmpresaService])
], EmpresaController);
exports.EmpresaController = EmpresaController;
//# sourceMappingURL=empresa.controller.js.map