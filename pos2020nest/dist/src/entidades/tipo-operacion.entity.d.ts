import { Usuario } from './usuario.entity';
export declare class TipoOperacion {
    id: number;
    codigo: string;
    nombre: string;
    naturaleza: number;
    fechamodificacion: Date;
    usuariomodificacion: Usuario;
}
