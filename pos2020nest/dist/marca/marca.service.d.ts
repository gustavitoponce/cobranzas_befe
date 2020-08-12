import { Marca } from '../entidades/marca.entity';
import { Repository, DeleteResult } from 'typeorm';
import { MarcaDto } from '../dto/MarcaDto';
import { AuthService } from '../auth/auth.service';
export declare class MarcaService {
    private readonly marcaRepo;
    private authService;
    private relaciones;
    constructor(marcaRepo: Repository<Marca>, authService: AuthService);
    getAll(incluirInactivos?: string): Promise<Marca[]>;
    getById(id: number): Promise<Marca>;
    create(marca: MarcaDto): Promise<Marca>;
    update(id: number, marca: MarcaDto): Promise<Marca>;
    delete(id: number): Promise<DeleteResult>;
    search(term: string, incluirInactivos: string): Promise<Marca[]>;
}
