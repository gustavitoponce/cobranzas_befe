import { Repository } from 'typeorm';
import { Usuario } from '../entidades/usuario.entity';
import { UsuarioDto } from '../dto/UsuarioDto';
export declare class UsuarioService {
    private readonly usuarioRepo;
    constructor(usuarioRepo: Repository<Usuario>);
    getAll(incluirInactivos?: string): Promise<Usuario[]>;
    getById(id: number): Promise<Usuario>;
    getByEmail(email: string): Promise<Usuario>;
    create(usuario: UsuarioDto): Promise<Usuario>;
    update(id: number, usuario: UsuarioDto): Promise<Usuario>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    updateImage(imageName: string, id: number): Promise<Usuario>;
    search(term: string, incluirInactivos: string): Promise<Usuario[]>;
}
