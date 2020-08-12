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
const usuario_service_1 = require("../usuario/usuario.service");
const cresponse_1 = require("../utils/cresponse");
const UsuarioDto_1 = require("../dto/UsuarioDto");
const auth_service_1 = require("../auth/auth.service");
let UsuarioController = class UsuarioController {
    constructor(usuarioService, authService) {
        this.usuarioService = usuarioService;
        this.authService = authService;
    }
    getAll(response, incluirInactivos) {
        console.log('-----------------------' + this.authService.token);
        this.usuarioService
            .getAll(incluirInactivos)
            .then((usuarios) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, usuarios));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al obtener usuarios', this.authService.token, [], error));
        });
    }
    validarExisteUsuario(response, email) {
        this.usuarioService
            .getByEmail(email)
            .then((usuario) => {
            if (usuario) {
                response.status(common_1.HttpStatus.OK).json({ email_existente: true });
            }
            else {
                response.status(common_1.HttpStatus.OK).json(null);
            }
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al obtener usuario', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    get(response, id) {
        this.usuarioService
            .getById(id)
            .then((usuario) => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Exito', this.authService.token, usuario));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al obtener usuario', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    create(body, response) {
        this.usuarioService
            .create(body)
            .then((usuario) => {
            response
                .status(common_1.HttpStatus.CREATED)
                .json(new cresponse_1.CResponse(1, 'Usuario Creado', null, usuario));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al crear usuario', null, null, { message: error.message, stack: error.stack }));
        });
    }
    update(usuario, response, id) {
        this.usuarioService
            .update(id, usuario)
            .then((usuarioActualizado) => {
            response
                .status(common_1.HttpStatus.CREATED)
                .json(new cresponse_1.CResponse(1, 'Usuario actualizado correctamente ', this.authService.token, usuarioActualizado));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error actualizar el usuario', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
    delete(response, id) {
        this.usuarioService
            .delete(id)
            .then(() => {
            response
                .status(common_1.HttpStatus.OK)
                .json(new cresponse_1.CResponse(1, 'Usuario borrado', this.authService.token));
        })
            .catch(error => {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new cresponse_1.CResponse(-1, 'Ocurrió un error al borrar el usuario', this.authService.token, {}, { message: error.message, stack: error.stack }));
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()), __param(1, common_1.Query('inactivos')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "getAll", null);
__decorate([
    common_1.Get('/existe_email/:email'),
    __param(0, common_1.Res()), __param(1, common_1.Param('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "validarExisteUsuario", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "get", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsuarioDto_1.UsuarioDto, Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsuarioDto_1.UsuarioDto, Object, Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "delete", null);
UsuarioController = __decorate([
    common_1.Controller('usuario'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService,
        auth_service_1.AuthService])
], UsuarioController);
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map