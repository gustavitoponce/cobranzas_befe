import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { IJwtPayload } from '../utils/IJwtPayload';
import { Usuario } from '../entidades/usuario.entity';
import { Empresa } from '../entidades/empresa.entity';
//import { SEED } from '../config/auth.config';
import { IToken } from '../utils/IToken';

@Injectable()
export class AuthService {
  // tslint:disable-next-line: variable-name
  private _token: IToken;
  // tslint:disable-next-line: variable-name
  private _empresaActiva: Empresa;
  // tslint:disable-next-line: variable-name
  private _usuarioActivo: Usuario;

  crearToken(empresa: Empresa, usuario: Usuario, timeout: number): IToken {
    const CONFIG_SESSION_TIMEOUT = timeout;

    const accessToken = jwt.sign(
      {
        usuario,
        empresa,
      },
      'SEED-AUTH-ADMIN-PRO',
      { expiresIn: CONFIG_SESSION_TIMEOUT },
    );

    this._empresaActiva = empresa;
    this._usuarioActivo = usuario;

    this._token = {
      expiresIn: CONFIG_SESSION_TIMEOUT,
      accessToken,
    };
    return this.token;
  }

  verificarToken(token: string, seed: string): Promise<IJwtPayload> | any {
    return new Promise((resolve, reject) => {
      jwt.verify(token, seed, (err: any, payload: IJwtPayload) => {
        if (!err) {
          resolve(payload);
        } else {
          reject(err);
        }
      });
    });
  }
  get token(): IToken {
    return this._token;
  }

  get empresaActiva(): Empresa {
    return this._empresaActiva;
  }

  get usuarioActivo(): Usuario {
    return this._usuarioActivo;
  }
}
