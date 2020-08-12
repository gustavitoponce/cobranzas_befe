import {
  Controller,
  Res,
  Param,
  Body,
  Post,
  Put,
  Delete,
  Get,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UnidadService } from '../unidad/unidad.service';
import { AuthService } from '../auth/auth.service';
import { Unidad } from '../entidades/unidad.entity';
import { CResponse } from '../utils/cresponse';
import { Status } from '../utils/Status';
import { UnidadDto } from '../dto/UnidadDto';

@Controller('unidad')
export class UnidadController {
  constructor(
    private authService: AuthService,
    private unidadService: UnidadService,
  ) {}
  @Get()
  getAll(@Res() response, @Query('inactivos') incluirInactivos) {
    this.unidadService
      .getAll(incluirInactivos)
      .then((unidades: Unidad[]) => {
        if (unidades.length > 0) {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.OK,
                'Exito',
                this.authService.token,
                unidades,
              ),
            );
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                'No hay unidades registradas',
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
              'Error al obtener el listado de unidades',
              this.authService.token,
              {},
              error,
            ),
          );
      });
  }

  @Get(':id')
  get(@Res() response, @Param('id') id) {
    this.unidadService
      .getById(id)
      .then((unidad: Unidad) => {
        if (unidad) {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(Status.OK, 'Exito', this.authService.token, unidad),
            );
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                `La unidad con ID: ${id.toString()} no existe`,
              ),
              this.authService.token,
            );
        }
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Ocurrió un error al obtener la unidad',
              this.authService.token,
              {},
              error,
            ),
          );
      });
  }

  @Post()
  create(@Body() body: UnidadDto, @Res() response) {
    this.unidadService
      .create(body)
      .then((unidad: Unidad) => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Unidad creada correctamente',
              this.authService.token,
              unidad,
            ),
          );
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Ocurrió un error al crear la unidad',
              this.authService.token,
              {},
              error,
            ),
          );
      });
  }

  @Put(':id')
  update(@Body() unidaddto: UnidadDto, @Res() response, @Param('id') id) {
    this.unidadService
      .update(id, unidaddto)
      .then((unidad: Unidad) => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Unidad actualizada con exito',
              this.authService.token,
              unidad,
            ),
          );
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Ocurrió un error al actualizar la unidad',
              this.authService.token,
              {},
              error,
            ),
          );
      });
  }

  @Delete(':id')
  delete(@Res() response, @Param('id') id: number) {
    this.unidadService
      .delete(id)
      .then(() => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Unidad borrada con exito',
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
              'Ocurrió un error al borrar la unidad',
              this.authService.token,
              {},
              error,
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
    this.unidadService
      .search(term, incluirInactivos)
      .then((unidades: Unidad[]) => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(Status.OK, 'Exito', this.authService.token, unidades),
          );
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Ocurrió un error al buscar unidades',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }
}
