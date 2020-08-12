import { Usuario } from './usuario.entity';
import { Empresa } from './empresa.entity';
import { TipoOperacion } from './tipo-operacion.entity';
import { Caja } from './caja.entity';
import { Persona } from './persona.entity';
export declare class Operacion {
    id: number;
    empresa: Empresa;
    persona: Persona;
    total: number;
    tipooperacion: TipoOperacion;
    caja: Caja;
    fechamodificacion: Date;
    usuariomodificacion: Usuario;
}
