import { Usuario } from './usuario.entity';
import { Estado } from './estado.entity';
import { Persona } from './persona.entity';
export declare class Prestamo {
    id: number;
    cliente: Persona;
    cuotas: number;
    estatus: boolean;
    fecha: Date;
    importe: number;
    zona: number;
    interes: number;
    tasa: number;
    tipo: number;
    usuarioAlta: number;
    observacion: string;
    usuariomodificacion: Usuario;
    estado: Estado;
    usuarioestatus: Usuario;
    fechamodificacion: Date;
}
