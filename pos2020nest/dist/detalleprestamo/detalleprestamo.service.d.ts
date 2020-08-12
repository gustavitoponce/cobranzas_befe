import { Repository, DeleteResult } from 'typeorm';
import { DetallePrestamo } from '../entidades/detalle-prestamo.entity';
import { DetallePrestamoDto } from '../dto/detalle-prestamo.dto';
export declare class DetallePrestamoService {
    private detalleprestamoRepo;
    constructor(detalleprestamoRepo: Repository<DetallePrestamo>);
    getAll(incluirInactivos?: string): Promise<DetallePrestamo[]>;
    getById(id: number): Promise<DetallePrestamo>;
    create(detalleprestamo: DetallePrestamoDto): Promise<DetallePrestamo>;
    delete(id: number): Promise<DeleteResult>;
}
