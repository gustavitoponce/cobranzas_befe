import { EstadoService } from './estado.service';
import { EstadosDto } from '../dto/estadosDto';
export declare class EstadoController {
    private estadoService;
    constructor(estadoService: EstadoService);
    getAll(response: any, incluirInactivos: any): void;
    get(response: any, id: number): void;
    create(estadoDto: EstadosDto, response: any): void;
    update(estadoDto: EstadosDto, response: any, id: number): void;
    delete(response: any, id: number): void;
}
