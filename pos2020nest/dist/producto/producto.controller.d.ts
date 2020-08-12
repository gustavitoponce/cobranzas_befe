import { ProductoDto } from '../dto/ProductoDto';
import { ProductoService } from './producto.service';
import { AuthService } from '../auth/auth.service';
export declare class ProductoController {
    private authService;
    private productService;
    constructor(authService: AuthService, productService: ProductoService);
    getAll(response: any, incluirInactivos: any): void;
    get(response: any, id: any): void;
    getByCode(response: any, id: any): void;
    create(body: ProductoDto, response: any): void;
    update(producto: ProductoDto, response: any, id: any): void;
    delete(response: any, id: number): void;
}
