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
import { DetallePrestamoService } from './detalleprestamo.service';

import { Prestamo } from '../entidades/prestamo.entity';
import { DetallePrestamo } from '../entidades/detalle-prestamo.entity';
import { CResponse } from '../utils/cresponse';
import { PrestamoDto } from '../dto/prestamo-dto';
import { DetallePrestamoDto } from '../dto/detalle-prestamo.dto';
import { Status } from '../utils/Status';
@Controller('detalleprestamo')
export class DetallePrestamoController {
  constructor(private detalleprestamoService: DetallePrestamoService) {}
  //si
  @Get()
  getAll(@Res() response, @Query('inactivos') incluirInactivos) {
    this.detalleprestamoService
      .getAll(incluirInactivos)
      .then((detalleprestamos: DetallePrestamo[]) => {
        if (detalleprestamos.length > 0) {
          response
            .status(HttpStatus.OK)
            .json(new CResponse(Status.OK, 'Exito', null, detalleprestamos));
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
    this.detalleprestamoService
      .getById(id)
      .then((detalleprestamo: DetallePrestamo) => {
        if (detalleprestamo) {
          response
            .status(HttpStatus.OK)
            .json(new CResponse(Status.OK, 'Exito', null, detalleprestamo));
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
  create(@Body() detalleprestamoDto: DetallePrestamoDto, @Res() response) {
    this.detalleprestamoService
      .create(detalleprestamoDto)
      .then(detalleprestamo => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Zona creada correctamente',
              null,
              detalleprestamo,
            ),
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
    @Body() detalleprestamoDto: DetallePrestamoDto,
    @Res() response,
    @Param('id') id: number,
  ) {
    /*  this.prestamoService.update(id, prestamoDto).then((prestamo) => {
            response.status(HttpStatus.OK).json(new CResponse(Status.OK, 'Zona actualizada con exito', null, prestamo));
        }).catch((error) => {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(new CResponse(Status.ERROR, 'Error al acutalizar la empresa', null, {}, error));
        });*/
  }

  @Delete(':id')
  delete(@Res() response, @Param('id') id: number) {
    this.detalleprestamoService
      .delete(id)
      .then(detalleprestamo => {
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
