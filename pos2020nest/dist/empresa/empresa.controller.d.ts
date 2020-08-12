import { EmpresaService } from './empresa.service';
import { EmpresaDto } from '../dto/empresa-dto';
export declare class EmpresaController {
    private empresaService;
    constructor(empresaService: EmpresaService);
    getAll(response: any, incluirInactivos: any): void;
    get(response: any, id: number): void;
    create(empresaDto: EmpresaDto, response: any): void;
    update(empresaDto: EmpresaDto, response: any, id: number): void;
    delete(response: any, id: number): void;
}
