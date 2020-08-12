import { TipoOperacionService } from '../tipo-operacion/tipo-operacion.service';
import { AuthService } from '../auth/auth.service';
import { TipoOperacionDto } from '../dto/tipo-operacion.dto';
export declare class TipoOperacionController {
    private authService;
    private tipoOperacionService;
    constructor(authService: AuthService, tipoOperacionService: TipoOperacionService);
    getAll(response: any): void;
    get(response: any, id: any): void;
    getByCode(response: any, codigo: any): void;
    create(body: TipoOperacionDto, response: any): void;
    update(tipoOperaciondto: TipoOperacionDto, response: any, id: any): void;
    delete(response: any, id: number): void;
}
