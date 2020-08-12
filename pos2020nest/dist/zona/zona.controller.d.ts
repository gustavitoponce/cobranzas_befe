import { ZonaService } from './zona.service';
import { ZonaDto } from '../dto/zona-dto';
export declare class ZonaController {
    private zonaService;
    constructor(zonaService: ZonaService);
    getAll(response: any, incluirInactivos: any): void;
    get(response: any, id: number): void;
    create(zonaDto: ZonaDto, response: any): void;
    update(zonaDto: ZonaDto, response: any, id: number): void;
    delete(response: any, id: number): void;
}
