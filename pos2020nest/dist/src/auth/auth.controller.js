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
const cresponse_1 = require("../utils/cresponse");
const auth_service_1 = require("../auth/auth.service");
const empresa_service_1 = require("../empresa/empresa.service");
const LoginDto_1 = require("../dto/LoginDto");
const usuario_service_1 = require("../usuario/usuario.service");
let AuthController = class AuthController {
    constructor(authService, usuarioService, empresaService) {
        this.authService = authService;
        this.usuarioService = usuarioService;
        this.empresaService = empresaService;
    }
    async login(response, login) {
        console.log(JSON.stringify(login));
        this.usuarioService
            .getByEmail(login.email)
            .then(async (usuario) => {
            console.log(JSON.stringify(usuario));
            if (!usuario) {
                response
                    .status(common_1.HttpStatus.OK)
                    .json(new cresponse_1.CResponse(-1, 'Credenciales Incorrectas', null, null, { message: 'El usuario proporcionado no existe' }));
            }
            else {
                if (usuario.estatus) {
                    if (login.password == usuario.password) {
                        const empresa = await this.empresaService.getById(login.empresaId);
                        let CONFIG_SESSION_TIMEOUT = Number(10000000);
                        const token = this.authService.crearToken(empresa, usuario, CONFIG_SESSION_TIMEOUT);
                        return response.status(common_1.HttpStatus.OK).json(new cresponse_1.CResponse(1, 'Exito', token, {
                            usuario,
                            empresa,
                            menu: [],
                        }));
                    }
                    else {
                        return response
                            .status(common_1.HttpStatus.OK)
                            .json(new cresponse_1.CResponse(-1, 'Credenciales Incorrectas', null, null, { message: 'Por favór verifica tu contraseña' }));
                    }
                }
                else {
                    return response.status(common_1.HttpStatus.OK).json(new cresponse_1.CResponse(-1, 'Usuario Inactivo', null, null, {
                        message: 'Por favor contacte al administrador del sistema',
                    }));
                }
            }
        })
            .catch(error => {
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(new cresponse_1.CResponse(-1, 'Error al obtener usuario', null, {
                message: error.message,
                stack: error.stack,
            }));
        });
    }
    async renuevaToken(response, login) {
        const empresa = null;
        const usuario = await this.usuarioService.getByEmail(login.email);
        const token = this.authService.crearToken(empresa, usuario, 1000000000);
        return response.status(common_1.HttpStatus.OK).json(new cresponse_1.CResponse(1, 'Exito', null, {
            token,
        }));
    }
};
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, LoginDto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('renuevatoken'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, LoginDto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "renuevaToken", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __param(0, common_1.Inject(common_1.forwardRef(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        usuario_service_1.UsuarioService,
        empresa_service_1.EmpresaService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map