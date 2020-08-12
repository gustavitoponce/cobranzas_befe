import { Usuario } from './usuario.entity';
import { Empresa } from './empresa.entity';
import { Operacion } from './operacion.entity';
import { Producto } from './producto.entity';
export declare class DetalleOperacion {
    id: number;
    empresa: Empresa;
    operacion: Operacion;
    producto: Producto;
    cantidad: number;
    total: number;
    fechamodificacion: Date;
    usuariomodificacion: Usuario;
}
