import { Usuario } from './usuario.model';
import { Empresa } from './empresa.model';
import {Persona} from './persona.model';
import {Estado} from './estado.model';

export class Prestamo {
    public id: number; 
    public cliente : Persona; //cliente que toma el prestamo
    public tipo: string; //diario o mensual
    public importe:number //importe del prestamo
    public interes:number //interes del prestamo
    public cuotas : number //cantidad de cuota
    public zona   :number //zona asociada al prestamo
    public estatus: boolean; //marca de borrado
    public tasa   : number; //Tasa de interes
    public usuarioAlta: number; //Usuario que dio de alta el prestamo
    public fecha: Date; //fecha de creacion del prestamo
    public estado:Estado;
    public observacion:string;
       
    constructor() {
        this.id = -1;
        this.cliente = new Persona();
        this.tipo = "";
        this.importe =0;
        this.interes=0;
        this.cuotas=0;
        this.zona=0;
        this.tasa=0;
        this.estatus = true;
        this.estado=new Estado();
        this.usuarioAlta =1;
        this.fecha = new Date();
        this.observacion='';
        
    }
}