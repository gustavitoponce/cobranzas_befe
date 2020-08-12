import { Usuario } from './usuario.entity';
import { Empresa } from './empresa.entity';
import { Producto } from './producto.entity';
export declare class Stock {
    id: number;
    producto: Producto;
    empresa: Empresa;
    stock: number;
    fechamodificacion: Date;
    usuariomodificacion: Usuario;
}
