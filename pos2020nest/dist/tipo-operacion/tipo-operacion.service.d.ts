import { TipoOperacion } from '../entidades/tipo-operacion.entity';
import { Repository, DeleteResult } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { TipoOperacionDto } from '../dto/tipo-operacion.dto';
export declare class TipoOperacionService {
    private readonly tipoOperacionRepo;
    private authService;
    constructor(tipoOperacionRepo: Repository<TipoOperacion>, authService: AuthService);
    getAll(): Promise<TipoOperacion[]>;
    getById(id: number): Promise<TipoOperacion>;
    getByCode(codigo: string): Promise<TipoOperacion>;
    create(tipoOperacion: TipoOperacionDto): Promise<TipoOperacion>;
    update(id: number, tipoOperacion: TipoOperacionDto): Promise<TipoOperacion>;
    delete(id: number): Promise<DeleteResult>;
    search(term: string): Promise<TipoOperacion[]>;
}
