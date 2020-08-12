import { DetallePrestamoService } from './detalleprestamo.service';
import { DetallePrestamoDto } from '../dto/detalle-prestamo.dto';
export declare class DetallePrestamoController {
    private detalleprestamoService;
    constructor(detalleprestamoService: DetallePrestamoService);
    getAll(response: any, incluirInactivos: any): void;
    get(response: any, id: number): void;
    create(detalleprestamoDto: DetallePrestamoDto, response: any): void;
    update(detalleprestamoDto: DetallePrestamoDto, response: any, id: number): void;
    delete(response: any, id: number): void;
}
