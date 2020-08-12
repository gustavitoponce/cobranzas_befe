import { Usuario } from './usuario.entity';
import { Empresa } from './empresa.entity';
export declare class Categoria {
    id: number;
    empresa: Empresa;
    nombre: string;
    descripcion: string;
    estatus: boolean;
    usuarioestatus: Usuario;
    fechamodificacion: Date;
    usuariomodificacion: Usuario;
}
