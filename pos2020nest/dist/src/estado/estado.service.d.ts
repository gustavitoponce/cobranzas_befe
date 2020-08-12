import { Repository, DeleteResult } from 'typeorm';
import { Estado } from '../entidades/estado.entity';
import { EstadosDto } from '../dto/estadosDto';
export declare class EstadoService {
    private estadoRepo;
    constructor(estadoRepo: Repository<Estado>);
    getAll(incluirInactivos?: string): Promise<Estado[]>;
    getById(id: number): Promise<Estado>;
    create(estado: EstadosDto): Promise<Estado>;
    update(id: number, estado: EstadosDto): Promise<Estado>;
    delete(id: number): Promise<DeleteResult>;
    updateImage(imageName: string, id: number): Promise<Estado>;
}
