import { Operacion } from '../entidades/operacion.entity';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { OperacionDto } from '../dto/operacion.dto';
import { ProductoService } from '../producto/producto.service';
import { PersonaService } from '../persona/persona.service';
import { TipoOperacionService } from '../tipo-operacion/tipo-operacion.service';
export declare class OperacionService {
    private readonly operacionRepo;
    private authService;
    private productoService;
    private personaService;
    private tipoOperacionService;
    constructor(operacionRepo: Repository<Operacion>, authService: AuthService, productoService: ProductoService, personaService: PersonaService, tipoOperacionService: TipoOperacionService);
    getAll(): Promise<Operacion[]>;
    create(operacionDto: OperacionDto): Promise<Operacion>;
}
