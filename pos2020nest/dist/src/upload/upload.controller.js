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
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const usuario_service_1 = require("../usuario/usuario.service");
const empresa_service_1 = require("../empresa/empresa.service");
const cresponse_1 = require("../utils/cresponse");
const fs = require("fs-extra");
const auth_service_1 = require("../auth/auth.service");
const producto_service_1 = require("../producto/producto.service");
let UploadController = class UploadController {
    constructor(usuarioService, empresaService, authService, productoService) {
        this.usuarioService = usuarioService;
        this.empresaService = empresaService;
        this.authService = authService;
        this.productoService = productoService;
        this.ROOT_APP = __dirname;
        this.token = this.authService.token;
    }
    uploadFile(file, response, tipo, id) {
        let pathDestino = `${this.ROOT_APP}\\uploads\\${tipo}`;
        if (!fs.pathExists(pathDestino)) {
            fs.mkdir(pathDestino);
        }
        pathDestino += `\\${file.filename}`;
        fs.moveSync(file.path, pathDestino);
        switch (tipo) {
            case 'usuario':
                this.usuarioService
                    .updateImage(file.filename, id)
                    .then((usaurio) => {
                    response
                        .status(common_1.HttpStatus.OK)
                        .json(new cresponse_1.CResponse(1, 'Imagen actualizada correctamente', this.token, usaurio));
                })
                    .catch(error => {
                    response
                        .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                        .json(new cresponse_1.CResponse(-1, 'Error al actualizar la imagen del usuario', this.token, {}, error));
                });
                break;
            case 'empresa':
                this.empresaService
                    .updateImage(file.filename, id)
                    .then((empresa) => {
                    response
                        .status(common_1.HttpStatus.OK)
                        .json(new cresponse_1.CResponse(1, 'Imagen actualizada correctamente', this.token, empresa));
                })
                    .catch(error => {
                    response
                        .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                        .json(new cresponse_1.CResponse(-1, 'Error al actualizar el logo de la empresa', this.token, {}, error));
                });
                break;
            case 'producto':
                this.productoService
                    .updateImage(file.filename, id)
                    .then((retorno) => {
                    response
                        .status(common_1.HttpStatus.OK)
                        .json(new cresponse_1.CResponse(1, 'Imagen actualizada correctamente', this.token, retorno));
                })
                    .catch(error => {
                    response
                        .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                        .json(new cresponse_1.CResponse(-1, 'Error al actualizar la imagen del producto', this.token, {}, error));
                });
                break;
            default:
                return response
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json(new cresponse_1.CResponse(-1, 'Tipo de imagen no admitida', this.token));
        }
    }
};
__decorate([
    common_1.Put(':tipo/:id'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
        storage: multer_1.diskStorage({
            filename: (req, file, cb) => {
                const randomName = `${req.params.tipo}-${req.params.id}-${new Date().getMilliseconds()}${path_1.extname(file.originalname)}`;
                return cb(null, randomName);
            },
        }),
    })),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('tipo')),
    __param(3, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Number]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadFile", null);
UploadController = __decorate([
    common_1.Controller('upload'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService,
        empresa_service_1.EmpresaService,
        auth_service_1.AuthService,
        producto_service_1.ProductoService])
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map