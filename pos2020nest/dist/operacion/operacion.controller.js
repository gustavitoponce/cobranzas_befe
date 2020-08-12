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
const operacion_service_1 = require("./operacion.service");
const cresponse_1 = require("../utils/cresponse");
const auth_service_1 = require("../auth/auth.service");
const operacion_dto_1 = require("../dto/operacion.dto");
let OperacionController = class OperacionController {
    constructor(operacionService, authService) {
        this.operacionService = operacionService;
        this.authService = authService;
    }
    getAll(response) {
        this.operacionService
            .getAll()
            .then((productos) => {
            if (productos.length > 0) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, productos));
            }
            else {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(3, 'No hay operaciones registradas', this.authService.token));
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al obtener el listado de operaciones', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    create(response, body) {
        this.operacionService
            .create(body)
            .then((operacion) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, operacion));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al guardar la operación', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OperacionController.prototype, "getAll", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, operacion_dto_1.OperacionDto]),
    __metadata("design:returntype", void 0)
], OperacionController.prototype, "create", null);
OperacionController = __decorate([
    common_1.Controller('operacion'),
    __metadata("design:paramtypes", [operacion_service_1.OperacionService,
        auth_service_1.AuthService])
], OperacionController);
exports.OperacionController = OperacionController;
//# sourceMappingURL=operacion.controller.js.map