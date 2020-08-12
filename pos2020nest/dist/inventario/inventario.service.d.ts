import { AuthService } from '../auth/auth.service';
import { Inventario } from '../entidades/inventario.entity';
import { Repository, DeleteResult } from 'typeorm';
import { InventarioDto } from '../dto/InventarioDto';
import { Operacion } from '../entidades/operacion.entity';
import { TipoOperacionService } from '../tipo-operacion/tipo-operacion.service';
export declare class InventarioService {
    private authService;
    private tipoOperacionService;
    private readonly inventarioRepo;
    private readonly operacionRepo;
    private relaciones;
    constructor(authService: AuthService, tipoOperacionService: TipoOperacionService, inventarioRepo: Repository<Inventario>, operacionRepo: Repository<Operacion>);
    getAll(): Promise<Inventario[]>;
    getById(id: number): Promise<Inventario>;
    getByCode(codigo: string): Promise<Inventario>;
    getByProductForSale(codigo: string): Promise<Inventario>;
    supply(idInventario: number, inventarioDto: InventarioDto): Promise<Inventario>;
    delete(id: number): Promise<DeleteResult>;
}
