import { DocumentacionRequeridaDto } from '../dto/documentacion.dto';
import { DocumentacionRequeridaService } from './documentacionrequerida.service';
import { AuthService } from '../auth/auth.service';
export declare class DocumentacionRequeridaController {
    private authService;
    private DocumentacionRequeridService;
    constructor(authService: AuthService, DocumentacionRequeridService: DocumentacionRequeridaService);
    getAll(response: any, incluirInactivos: any): void;
    get(response: any, id: any): void;
    getByCode(response: any, id: any): void;
    create(body: DocumentacionRequeridaDto, response: any): void;
    update(documentacionrequerida: DocumentacionRequeridaDto, response: any, id: any): void;
    delete(response: any, id: number): void;
}
