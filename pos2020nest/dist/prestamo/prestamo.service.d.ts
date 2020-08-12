import { Repository, DeleteResult } from 'typeorm';
import { Prestamo } from '../entidades/prestamo.entity';
import { PrestamoDto } from '../dto/prestamo-dto';
export declare class PrestamoService {
    private prestamoRepo;
    constructor(prestamoRepo: Repository<Prestamo>);
    getAll(incluirInactivos?: string): Promise<Prestamo[]>;
    getById(id: number): Promise<Prestamo>;
    create(prestamo: PrestamoDto): Promise<Prestamo>;
    update(id: number, prestamo: PrestamoDto): Promise<Prestamo>;
    delete(id: number): Promise<DeleteResult>;
}
