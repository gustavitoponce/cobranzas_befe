import { Categoria } from '../entidades/categoria.entity';
import { Repository, DeleteResult } from 'typeorm';
import { CategoriaDto } from '../dto/CategoriaDto';
import { AuthService } from '../auth/auth.service';
export declare class CategoriaService {
    private readonly categoriaRepo;
    private authService;
    private relaciones;
    constructor(categoriaRepo: Repository<Categoria>, authService: AuthService);
    getAll(incluirInactivos?: string): Promise<Categoria[]>;
    getById(id: number): Promise<Categoria>;
    create(categoria: CategoriaDto): Promise<Categoria>;
    update(id: number, categoria: CategoriaDto): Promise<Categoria>;
    delete(id: number): Promise<DeleteResult>;
    search(term: string, incluirInactivos: string): Promise<Categoria[]>;
}
