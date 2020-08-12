import { Repository, DeleteResult } from 'typeorm';
import { Documentacion } from '../entidades/documentacion.entity';
import { DocumentacionDto } from '../dto/documentacion.dto';
import { AuthService } from '../auth/auth.service';
import { MarcaService } from '../marca/marca.service';
import { CategoriaService } from '../categoria/categoria.service';
import { UnidadService } from '../unidad/unidad.service';
import { InventarioService } from '../inventario/inventario.service';
export declare class DocumentacionService {
    private readonly documentacionRepo;
    private authService;
    private marcaService;
    private categoriaService;
    private unidadService;
    private inventarioService;
    ROOT_APP: any;
    private readonly relaciones;
    constructor(documentacionRepo: Repository<Documentacion>, authService: AuthService, marcaService: MarcaService, categoriaService: CategoriaService, unidadService: UnidadService, inventarioService: InventarioService);
    getAll(id: number): Promise<Documentacion[]>;
    getdoc(id: number): Promise<Documentacion[]>;
    getById(id: number): Promise<Documentacion>;
    getByCode(codigo: string): Promise<Documentacion>;
    create(documentacion: DocumentacionDto): Promise<Documentacion>;
    update(id: number, documentacion: DocumentacionDto): Promise<Documentacion>;
    delete(id: number): Promise<DeleteResult>;
    updateImage(imageName: string, id: number): Promise<string>;
    search(term: string, incluirInactivos: string): Promise<Documentacion[]>;
}
