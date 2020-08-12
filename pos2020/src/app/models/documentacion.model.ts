import { Categori } from './categori.model';
import { Empresa } from './empresa.model';
import { Unidad } from './unidad.model';
import { Usuario } from './usuario.model';
import { Marca } from './marca.model';

export class Documentacion {
    public id:number;
    public nombre: string;
    public descripcion: string;
    public estatus: boolean;
    public imagen: string;
    public idprestamo: number;
    public requerido: boolean;
    public usuarioestatus: Usuario;
    public fechamodificacion: Date;
    public usuariomodificacion: Usuario;

    constructor() {
        this.id = -1;
        
        this.nombre = '';
        
        this.descripcion = '';
        
        this.imagen = '';
        this.estatus = true;
        this.idprestamo=-1;
        this.usuarioestatus = new Usuario();
        this.usuariomodificacion = new Usuario();
    }
}
