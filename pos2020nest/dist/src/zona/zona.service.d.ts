import { Repository, DeleteResult } from 'typeorm';
import { Zona } from '../entidades/zona.entity';
import { ZonaDto } from '../dto/zona-dto';
export declare class ZonaService {
    private zonaRepo;
    constructor(zonaRepo: Repository<Zona>);
    getAll(incluirInactivos?: string): Promise<Zona[]>;
    getById(id: number): Promise<Zona>;
    create(zona: ZonaDto): Promise<Zona>;
    update(id: number, zona: ZonaDto): Promise<Zona>;
    delete(id: number): Promise<DeleteResult>;
    updateImage(imageName: string, id: number): Promise<Zona>;
}
