import { Repository, DeleteResult } from 'typeorm';
import { Prestamo } from '../entidades/prestamo.entity';
import { DetallePrestamo } from '../entidades/detalle-prestamo.entity';
import { PrestamoDto } from '../dto/prestamo-dto';
export declare class PrestamoService {
    private prestamoRepo;
    private detalleprestamoRepo;
    constructor(prestamoRepo: Repository<Prestamo>, detalleprestamoRepo: Repository<DetallePrestamo>);
    getAll(incluirInactivos?: string): Promise<Prestamo[]>;
    getDetail(id: number): Promise<DetallePrestamo[]>;
    getById(id: number): Promise<Prestamo>;
    create(prestamoDto: PrestamoDto): Promise<Prestamo>;
    delete(id: number): Promise<DeleteResult>;
}
