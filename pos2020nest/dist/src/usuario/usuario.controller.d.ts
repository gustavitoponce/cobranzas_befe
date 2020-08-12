import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioDto } from '../dto/UsuarioDto';
import { AuthService } from '../auth/auth.service';
export declare class UsuarioController {
    private usuarioService;
    private authService;
    constructor(usuarioService: UsuarioService, authService: AuthService);
    getAll(response: any, incluirInactivos: any): void;
    validarExisteUsuario(response: any, email: any): void;
    get(response: any, id: any): void;
    create(body: UsuarioDto, response: any): void;
    update(usuario: UsuarioDto, response: any, id: any): void;
    delete(response: any, id: number): void;
}
