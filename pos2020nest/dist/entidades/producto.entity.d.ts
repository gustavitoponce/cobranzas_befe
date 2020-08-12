import { Usuario } from './usuario.entity';
import { Empresa } from './empresa.entity';
import { Marca } from './marca.entity';
import { Categoria } from './categoria.entity';
import { Unidad } from './unidad.entity';
export declare class Producto {
    id: number;
    empresa: Empresa;
    codigo: string;
    nombre: string;
    barcode: string;
    descripcion: string;
    costo: number;
    precio: number;
    unidad: Unidad;
    stockminimo: number;
    imagen: string;
    marca: Marca;
    categoria: Categoria;
    estatus: boolean;
    usuarioestatus: Usuario;
    fechamodificacion: Date;
    usuariomodificacion: Usuario;
}
