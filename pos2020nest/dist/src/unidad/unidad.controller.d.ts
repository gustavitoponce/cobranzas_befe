import { UnidadService } from '../unidad/unidad.service';
import { AuthService } from '../auth/auth.service';
import { UnidadDto } from '../dto/UnidadDto';
export declare class UnidadController {
    private authService;
    private unidadService;
    constructor(authService: AuthService, unidadService: UnidadService);
    getAll(response: any, incluirInactivos: any): void;
    get(response: any, id: any): void;
    create(body: UnidadDto, response: any): void;
    update(unidaddto: UnidadDto, response: any, id: any): void;
    delete(response: any, id: number): void;
    search(response: any, term: string, incluirInactivos: any): void;
}
