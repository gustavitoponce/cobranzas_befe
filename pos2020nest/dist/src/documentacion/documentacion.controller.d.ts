import { DocumentacionDto } from '../dto/documentacion.dto';
import { DocumentacionService } from './documentacion.service';
import { AuthService } from '../auth/auth.service';
export declare class DocumentacionController {
    private authService;
    private documentService;
    constructor(authService: AuthService, documentService: DocumentacionService);
    getAll(response: any, incluirInactivos: any): void;
    get(response: any, id: any): void;
    getByCode(response: any, id: any): void;
    create(body: DocumentacionDto, response: any): void;
    update(documentacion: DocumentacionDto, response: any, id: any): void;
    delete(response: any, id: number): void;
}
