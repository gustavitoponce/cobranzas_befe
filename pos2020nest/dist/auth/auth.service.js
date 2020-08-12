"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    crearToken(empresa, usuario, timeout) {
        const CONFIG_SESSION_TIMEOUT = timeout;
        const accessToken = jwt.sign({
            usuario,
            empresa,
        }, 'SEED-AUTH-ADMIN-PRO', { expiresIn: CONFIG_SESSION_TIMEOUT });
        this._empresaActiva = empresa;
        this._usuarioActivo = usuario;
        this._token = {
            expiresIn: CONFIG_SESSION_TIMEOUT,
            accessToken,
        };
        return this.token;
    }
    verificarToken(token, seed) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, seed, (err, payload) => {
                if (!err) {
                    resolve(payload);
                }
                else {
                    reject(err);
                }
            });
        });
    }
    get token() {
        return this._token;
    }
    get empresaActiva() {
        return this._empresaActiva;
    }
    get usuarioActivo() {
        return this._usuarioActivo;
    }
};
AuthService = __decorate([
    common_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map