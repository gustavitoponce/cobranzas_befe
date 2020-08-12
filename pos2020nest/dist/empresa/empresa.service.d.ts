import { Repository, DeleteResult } from 'typeorm';
import { Empresa } from '../entidades/empresa.entity';
import { EmpresaDto } from '../dto/empresa-dto';
export declare class EmpresaService {
    private empresaRepo;
    constructor(empresaRepo: Repository<Empresa>);
    getAll(incluirInactivos?: string): Promise<Empresa[]>;
    getById(id: number): Promise<Empresa>;
    create(empresa: EmpresaDto): Promise<Empresa>;
    update(id: number, empresa: EmpresaDto): Promise<Empresa>;
    delete(id: number): Promise<DeleteResult>;
    updateImage(imageName: string, id: number): Promise<Empresa>;
}
