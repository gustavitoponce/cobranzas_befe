import { Repository, DeleteResult } from 'typeorm';
import { Producto } from '../entidades/producto.entity';
import { ProductoDto } from '../dto/ProductoDto';
import { AuthService } from '../auth/auth.service';
import { MarcaService } from '../marca/marca.service';
import { CategoriaService } from '../categoria/categoria.service';
import { UnidadService } from '../unidad/unidad.service';
import { InventarioService } from '../inventario/inventario.service';
export declare class ProductoService {
    private readonly productoRepo;
    private authService;
    private marcaService;
    private categoriaService;
    private unidadService;
    private inventarioService;
    ROOT_APP: any;
    private readonly relaciones;
    constructor(productoRepo: Repository<Producto>, authService: AuthService, marcaService: MarcaService, categoriaService: CategoriaService, unidadService: UnidadService, inventarioService: InventarioService);
    getAll(incluirInactivos?: string): Promise<Producto[]>;
    getById(id: number): Promise<Producto>;
    getByCode(codigo: string): Promise<Producto>;
    create(producto: ProductoDto): Promise<Producto>;
    update(id: number, producto: ProductoDto): Promise<Producto>;
    delete(id: number): Promise<DeleteResult>;
    updateImage(imageName: string, id: number): Promise<string>;
    search(term: string, incluirInactivos: string): Promise<Producto[]>;
}
