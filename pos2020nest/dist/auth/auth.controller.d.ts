import { AuthService } from '../auth/auth.service';
import { EmpresaService } from '../empresa/empresa.service';
import { LoginDto } from '../dto/LoginDto';
import { UsuarioService } from '../usuario/usuario.service';
export declare class AuthController {
    private authService;
    private usuarioService;
    private empresaService;
    constructor(authService: AuthService, usuarioService: UsuarioService, empresaService: EmpresaService);
    login(response: any, login: LoginDto): Promise<void>;
    renuevaToken(response: any, login: LoginDto): Promise<any>;
}
