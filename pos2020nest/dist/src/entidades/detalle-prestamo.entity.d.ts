import { Prestamo } from './prestamo.entity';
export declare class DetallePrestamo {
    id: number;
    prestamo: Prestamo;
    nrocuota: number;
    capital: number;
    interes: number;
    vencimiento: Date;
    fechapago: Date;
}
