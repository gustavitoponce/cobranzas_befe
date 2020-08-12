import { Usuario } from './usuario.entity';
export declare class DocumentacionRequerida {
    id: number;
    imagen: string;
    idprestamo: number;
    nombre: string;
    descripcion: string;
    estatus: boolean;
    requerido: boolean;
    usuarioestatus: Usuario;
    fechamodificacion: Date;
    usuariomodificacion: Usuario;
}
