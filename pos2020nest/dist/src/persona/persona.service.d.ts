import { Persona } from '../entidades/persona.entity';
import { Repository, DeleteResult } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { PersonaDto } from '../dto/PersonaDto';
export declare class PersonaService {
    private readonly personaRepo;
    private authService;
    private relaciones;
    constructor(personaRepo: Repository<Persona>, authService: AuthService);
    getAll(incluirInactivos?: string): Promise<Persona[]>;
    getById(id: number): Promise<Persona>;
    getPersonaDefaultVenta(): Promise<Persona>;
    create(persona: PersonaDto): Promise<Persona>;
    update(id: number, persona: PersonaDto): Promise<Persona>;
    delete(id: number): Promise<DeleteResult>;
    search(term: string, incluirInactivos: string): Promise<Persona[]>;
}
