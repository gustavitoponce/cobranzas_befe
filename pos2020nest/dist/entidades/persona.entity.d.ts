import { Usuario } from './usuario.entity';
import { Empresa } from './empresa.entity';
export declare class Persona {
    id: number;
    empresa: Empresa;
    nombre: string;
    dni: number;
    localidad: string;
    rubro: string;
    dom_comercial: string;
    nombreempresa: string;
    direccion: string;
    telefono: string;
    correo: string;
    tipo: string;
    estatus: boolean;
    usuarioestatus: Usuario;
    fechamodificacion: Date;
    usuariomodificacion: Usuario;
    esPersonaVentaPublico: boolean;
}
