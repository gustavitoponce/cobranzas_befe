import { Usuario } from '../entidades/usuario.entity';
import { Empresa } from '../entidades/empresa.entity';
export interface IJwtPayload {
    usuario: Usuario;
    empresa: Empresa;
    iat: number;
    exp: number;
}
