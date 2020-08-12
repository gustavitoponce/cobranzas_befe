import { Usuario } from './usuario.entity';
export declare class Localidad {
    id: number;
    nombre: string;
    estatus: boolean;
    usuarioestatus: Usuario;
    fechamodificacion: Date;
    usuariomodificacion: Usuario;
}
