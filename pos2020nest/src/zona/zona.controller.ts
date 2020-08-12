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
import { ZonaService } from './zona.service';
import { Zona } from '../entidades/zona.entity';
import { CResponse } from '../utils/cresponse';
import { ZonaDto } from '../dto/zona-dto';
import { Status } from '../utils/Status';
@Controller('zona')
export class ZonaController {
  constructor(private zonaService: ZonaService) {}
  //si
  @Get()
  getAll(@Res() response, @Query('inactivos') incluirInactivos) {
    this.zonaService
      .getAll(incluirInactivos)
      .then((zonas: Zona[]) => {
        if (zonas.length > 0) {
          response
            .status(HttpStatus.OK)
            .json(new CResponse(Status.OK, 'Exito', null, zonas));
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
    this.zonaService
      .getById(id)
      .then((zona: Zona) => {
        if (zona) {
          response
            .status(HttpStatus.OK)
            .json(new CResponse(Status.OK, 'Exito', null, zona));
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
  create(@Body() zonaDto: ZonaDto, @Res() response) {
    this.zonaService
      .create(zonaDto)
      .then(zona => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(Status.OK, 'Zona creada correctamente', null, zona),
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
  update(@Body() zonaDto: ZonaDto, @Res() response, @Param('id') id: number) {
    this.zonaService
      .update(id, zonaDto)
      .then(zona => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(Status.OK, 'Zona actualizada con exito', null, zona),
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
    this.zonaService
      .delete(id)
      .then(zona => {
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
