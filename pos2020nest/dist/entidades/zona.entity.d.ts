import { Usuario } from './usuario.entity';
export declare class Zona {
    id: number;
    nombre: string;
    rfc: string;
    direccion: string;
    logo: string;
    estatus: boolean;
    usuarioestatus: Usuario;
    fechamodificacion: Date;
    usuariomodificacion: Usuario;
}
