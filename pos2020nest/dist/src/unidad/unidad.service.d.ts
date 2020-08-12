import { Repository, DeleteResult } from 'typeorm';
import { Unidad } from '../entidades/unidad.entity';
import { AuthService } from '../auth/auth.service';
import { UnidadDto } from 'src/dto/UnidadDto';
export declare class UnidadService {
    private readonly unidadRepo;
    private authService;
    constructor(unidadRepo: Repository<Unidad>, authService: AuthService);
    getAll(incluirInactivos?: string): Promise<Unidad[]>;
    getById(id: number): Promise<Unidad>;
    create(unidad: UnidadDto): Promise<Unidad>;
    update(id: number, unidad: UnidadDto): Promise<Unidad>;
    delete(id: number): Promise<DeleteResult>;
    search(term: string, incluirInactivos: string): Promise<Unidad[]>;
}
