import { AuthService } from '../auth/auth.service';
import { MarcaService } from '../marca/marca.service';
import { MarcaDto } from '../dto/MarcaDto';
export declare class MarcaController {
    private marcaService;
    private authService;
    constructor(marcaService: MarcaService, authService: AuthService);
    getAll(response: any, incluirInactivos: any): void;
    get(response: any, id: any): void;
    create(body: MarcaDto, response: any): void;
    update(Marcadto: MarcaDto, response: any, id: any): void;
    delete(response: any, id: number): void;
    search(response: any, term: string, incluirInactivos: any): void;
}
