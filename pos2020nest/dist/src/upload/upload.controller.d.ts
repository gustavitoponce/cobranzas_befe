import { UsuarioService } from '../usuario/usuario.service';
import { EmpresaService } from '../empresa/empresa.service';
import { AuthService } from '../auth/auth.service';
import { ProductoService } from '../producto/producto.service';
export declare class UploadController {
    private usuarioService;
    private empresaService;
    private authService;
    private productoService;
    private token;
    private ROOT_APP;
    constructor(usuarioService: UsuarioService, empresaService: EmpresaService, authService: AuthService, productoService: ProductoService);
    uploadFile(file: any, response: any, tipo: string, id: number): any;
}
