import { Usuario } from './usuario.model';
import { Producto } from './producto.model';
import { Operacion } from './operacion.model';

export class DetallePrestamo {
    public id :number;
    public  prestamoId: number;
    public  nrocuota: number;
    public  capital: number;
    public  interes: number;
    public  vencimiento: Date;
    public  importe_pag: number;
    
    public  fecha_pago: Date;
    constructor() {
        this.id = -1;
        this.prestamoId = 0;
        this.nrocuota = 0;
        this.capital = 0;
        this.interes=0;
        this.vencimiento  = new Date();
        this.importe_pag = 0;
        this.fecha_pago =new Date();
    }
}