import { CategoriaService } from '../categoria/categoria.service';
import { CategoriaDto } from '../dto/CategoriaDto';
import { AuthService } from '../auth/auth.service';
export declare class CategoriaController {
    private categoriaService;
    private authService;
    constructor(categoriaService: CategoriaService, authService: AuthService);
    getAll(response: any, incluirInactivos: any): void;
    get(response: any, id: any): void;
    create(body: CategoriaDto, response: any): void;
    update(categoriadto: CategoriaDto, response: any, id: any): void;
    delete(response: any, id: number): void;
    search(response: any, term: string, incluirInactivos: any): void;
}
