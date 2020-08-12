import { Usuario } from './usuario.model';
import { Empresa } from './empresa.model';

export class Estado {
    public readonly id: number;
    public readonly nombre: string;
    public readonly descripcion: string;
    public readonly estatus: boolean;
    public readonly empresa: any;
    public readonly usuarioestatus: any;
    public readonly usuariomodificacion: any;

    

    constructor() {
        this.estatus = true;
        this.usuariomodificacion = new Usuario();
        this.descripcion='';
        this.nombre='';
        this.empresa=new Empresa();
        
     }
}
