import { Usuario } from './usuario.entity';
import { Empresa } from './empresa.entity';
export declare class Caja {
    id: number;
    fechamodificacion: Date;
    empresa: Empresa;
    usuariomodificacion: Usuario;
}
