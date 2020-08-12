import { IJwtPayload } from '../utils/IJwtPayload';
import { Usuario } from '../entidades/usuario.entity';
import { Empresa } from '../entidades/empresa.entity';
import { IToken } from '../utils/IToken';
export declare class AuthService {
    private _token;
    private _empresaActiva;
    private _usuarioActivo;
    crearToken(empresa: Empresa, usuario: Usuario, timeout: number): IToken;
    verificarToken(token: string, seed: string): Promise<IJwtPayload> | any;
    readonly token: IToken;
    readonly empresaActiva: Empresa;
    readonly usuarioActivo: Usuario;
}
