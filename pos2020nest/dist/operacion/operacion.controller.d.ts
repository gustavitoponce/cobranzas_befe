import { OperacionService } from './operacion.service';
import { AuthService } from '../auth/auth.service';
import { OperacionDto } from '../dto/operacion.dto';
export declare class OperacionController {
    private operacionService;
    private authService;
    constructor(operacionService: OperacionService, authService: AuthService);
    getAll(response: any): void;
    create(response: any, body: OperacionDto): void;
}
