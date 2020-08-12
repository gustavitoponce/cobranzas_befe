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
import { PrestamoService } from './prestamo.service';

import { Prestamo } from '../entidades/prestamo.entity';
import { DetallePrestamo } from '../entidades/detalle-prestamo.entity';
import { CResponse } from '../utils/cresponse';
import { PrestamoDto } from '../dto/prestamo-dto';
import { DetallePrestamoDto } from '../dto/detalle-prestamo.dto';
import { Status } from '../utils/Status';
@Controller('prestamo')
export class PrestamoController {
  constructor(private prestamoService: PrestamoService) {}
  //si
  @Get()
  getAll(@Res() response, @Query('inactivos') incluirInactivos) {
    this.prestamoService
      .getAll(incluirInactivos)
      .then((prestamos: Prestamo[]) => {
        if (prestamos.length > 0) {
          response
            .status(HttpStatus.OK)
            .json(new CResponse(Status.OK, 'Exito', null, prestamos));
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

  @Get(':id')
  getDetail(@Res() response, @Param('id') id:number)  {
    console.log(id);
    this.prestamoService
      .getDetail(id)
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

    this.prestamoService
      .getById(id)
      .then((prestamo: Prestamo) => {
        if (prestamo) {
          response
            .status(HttpStatus.OK)
            .json(new CResponse(Status.OK, 'Exito', null, prestamo));
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
  create(@Body() prestamoDto: PrestamoDto, @Res() response) {
    this.prestamoService
      .create(prestamoDto)
      .then(prestamo => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Zona creada correctamente',
              null,
              prestamo,
            ),
          );
        console.log(response.data.id);
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
    @Body() prestamoDto: PrestamoDto,
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
    this.prestamoService
      .delete(id)
      .then(prestamo => {
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
