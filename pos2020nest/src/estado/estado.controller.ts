import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { EstadoService } from './estado.service';
import { Estado } from '../entidades/estado.entity';
import { CResponse } from '../utils/cresponse';
import { Status } from '../utils/Status';
import { EstadosDto } from '../dto/estadosDto';

@Controller('estado')
export class EstadoController {
  constructor(private estadoService: EstadoService) {}
  //si
  @Get()
  getAll(@Res() response, @Query('inactivos') incluirInactivos) {
    this.estadoService
      .getAll(incluirInactivos)
      .then((estados: Estado[]) => {
        if (estados.length > 0) {
          response
            .status(HttpStatus.OK)
            .json(new CResponse(Status.OK, 'Exito', null, estados));
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                'No hay zonas registradas pibe',
                null,
                null,
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
              'Error al obtener el listado de zonas',
              null,
              {},
              error,
            ),
          );
      });
  }
  //si
  @Get(':id')
  get(@Res() response, @Param('id') id: number) {
    console.log('llego al controlado get de estados');
    this.estadoService
      .getById(id)
      .then((estado: Estado) => {
        if (estado) {
          response
            .status(HttpStatus.OK)
            .json(new CResponse(Status.OK, 'Exito', null, estado));
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                `La zona con ID: ${id.toString()} no existe`,
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
              'Error al obtener la zona',
              null,
              {},
              error,
            ),
          );
      });
  }
  //si
  @Post()
  create(@Body() estadoDto: EstadosDto, @Res() response) {
    this.estadoService
      .create(estadoDto)
      .then(estado => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(Status.OK, 'Zona creada correctamente', null, estado),
          );
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Error al crear la nueva zona',
              null,
              {},
              error,
            ),
          );
      });
  }

  @Put(':id')
  update(
    @Body() estadoDto: EstadosDto,
    @Res() response,
    @Param('id') id: number,
  ) {
    this.estadoService
      .update(id, estadoDto)
      .then(estado => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Zona actualizada con exito',
              null,
              estado,
            ),
          );
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Error al acutalizar la empresa',
              null,
              {},
              error,
            ),
          );
      });
  }

  @Delete(':id')
  delete(@Res() response, @Param('id') id: number) {
    this.estadoService
      .delete(id)
      .then(estado => {
        response
          .status(HttpStatus.OK)
          .json(new CResponse(Status.OK, 'Empresa borrada con exito'));
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Error al borrar la empresa',
              null,
              {},
              error,
            ),
          );
      });
  }
}
