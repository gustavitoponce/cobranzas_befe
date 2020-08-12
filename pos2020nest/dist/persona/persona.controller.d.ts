import { AuthService } from '../auth/auth.service';
import { PersonaService } from './persona.service';
import { PersonaDto } from '../dto/PersonaDto';
export declare class PersonaController {
    private authService;
    private personaService;
    constructor(authService: AuthService, personaService: PersonaService);
    getAll(response: any, incluirInactivos: any): void;
    getPersonaDefaultVenta(response: any): void;
    get(response: any, id: any): void;
    create(body: PersonaDto, response: any): void;
    update(Personadto: PersonaDto, response: any, id: any): void;
    delete(response: any, id: number): void;
    search(response: any, term: string, incluirInactivos: any): void;
}
