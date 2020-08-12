import {
  Controller,
  HttpStatus,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PersonaService } from './persona.service';
import { Persona } from '../entidades/persona.entity';
import { CResponse } from '../utils/cresponse';
import { Status } from '../utils/Status';
import { PersonaDto } from '../dto/PersonaDto';

@Controller('persona')
export class PersonaController {
  constructor(
    private authService: AuthService,
    private personaService: PersonaService,
  ) {}
  @Get()
  getAll(@Res() response, @Query('inactivos') incluirInactivos) {
    this.personaService
      .getAll(incluirInactivos)
      .then((personas: Persona[]) => {
        if (personas.length > 0) {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.OK,
                'Exito',
                this.authService.token,
                personas,
              ),
            );
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                'No hay personas registradas',
                this.authService.token,
              ),
            );
        }
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Error al obtener el listado de personas',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }

  @Get('/persona_default_venta/')
  getPersonaDefaultVenta(@Res() response) {
    console.log('paso por el metodo ');
    this.personaService
      .getPersonaDefaultVenta()
      .then((persona: Persona) => {
        if (persona) {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.OK,
                'Exito',
                this.authService.token,
                persona,
              ),
            );
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                `No existe ningun cliente designado para ventas al publico en general`,
                this.authService.token,
              ),
            );
        }
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Ocurrió un error al obtener los datos de la persona',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }

  @Get(':id')
  get(@Res() response, @Param('id') id) {
    this.personaService
      .getById(id)
      .then((persona: Persona) => {
        if (persona) {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.OK,
                'Exito',
                this.authService.token,
                persona,
              ),
            );
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                `La persona con ID: ${id.toString()} no existe`,
                this.authService.token,
              ),
            );
        }
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Ocurrió un error al obtener los datos de la persona',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }

  @Post()
  create(@Body() body: PersonaDto, @Res() response) {
    this.personaService
      .create(body)
      .then((persona: Persona) => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Persona creada correctamente',
              this.authService.token,
              persona,
            ),
          );
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Ocurrió un error al crear la Persona',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }

  @Put(':id')
  update(@Body() Personadto: PersonaDto, @Res() response, @Param('id') id) {
    this.personaService
      .update(id, Personadto)
      .then((persona: Persona) => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Persona actualizada con exito',
              this.authService.token,
              persona,
            ),
          );
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Ocurrió un error al actualizar la Persona',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }

  @Delete(':id')
  delete(@Res() response, @Param('id') id: number) {
    this.personaService
      .delete(id)
      .then(() => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Persona borrada con exito',
              this.authService.token,
            ),
          );
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Ocurrió un error al borrar la Persona',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }

  @Get('buscar/:term')
  search(
    @Res() response,
    @Param('term') term: string,
    @Query('inactivos') incluirInactivos,
  ) {
    //ddddd
    this.personaService
      .search(term, incluirInactivos)
      .then((personas: Persona[]) => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(Status.OK, 'Exito', this.authService.token, personas),
          );
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Ocurrió un error al intentar buscar personas',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }
}
