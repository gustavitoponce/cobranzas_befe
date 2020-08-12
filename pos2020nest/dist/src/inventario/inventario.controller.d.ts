import { InventarioService } from './inventario.service';
import { AuthService } from '../auth/auth.service';
import { InventarioDto } from '../dto/InventarioDto';
export declare class InventarioController {
    private inventarioService;
    private authService;
    constructor(inventarioService: InventarioService, authService: AuthService);
    getAll(response: any): void;
    get(response: any, id: any): void;
    getByProductCode(response: any, codigo: any): void;
    supply(inventariodto: InventarioDto, response: any, id: any): void;
}
