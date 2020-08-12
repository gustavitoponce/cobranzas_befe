import { PrestamoService } from './prestamo.service';
import { PrestamoDto } from '../dto/prestamo-dto';
export declare class PrestamoController {
    private prestamoService;
    constructor(prestamoService: PrestamoService);
    getAll(response: any, incluirInactivos: any): void;
    get(response: any, id: number): void;
    create(prestamoDto: PrestamoDto, response: any): void;
    update(prestamoDto: PrestamoDto, response: any, id: number): void;
    delete(response: any, id: number): void;
}
