import { Repository, DeleteResult } from 'typeorm';
import { DocumentacionRequerida } from '../entidades/documentacion.entity';
import { DocumentacionRequeridaDto } from '../dto/documentacion.dto';
import { AuthService } from '../auth/auth.service';
import { MarcaService } from '../marca/marca.service';
import { CategoriaService } from '../categoria/categoria.service';
import { UnidadService } from '../unidad/unidad.service';
import { InventarioService } from '../inventario/inventario.service';
export declare class DocumentacionRequeridaService {
    private readonly documentacionrequeridaRepo;
    private authService;
    private marcaService;
    private categoriaService;
    private unidadService;
    private inventarioService;
    ROOT_APP: any;
    private readonly relaciones;
    constructor(documentacionrequeridaRepo: Repository<DocumentacionRequerida>, authService: AuthService, marcaService: MarcaService, categoriaService: CategoriaService, unidadService: UnidadService, inventarioService: InventarioService);
    getAll(incluirInactivos?: string): Promise<DocumentacionRequerida[]>;
    getById(id: number): Promise<DocumentacionRequerida>;
    getByCode(codigo: string): Promise<any>;
    create(documentacionrequerida: DocumentacionRequeridaDto): Promise<DocumentacionRequerida>;
    update(id: number, documentacionrequerida: DocumentacionRequeridaDto): Promise<DocumentacionRequerida>;
    delete(id: number): Promise<DeleteResult>;
    updateImage(imageName: string, id: number): Promise<string>;
    search(term: string, incluirInactivos: string): Promise<any[]>;
}
