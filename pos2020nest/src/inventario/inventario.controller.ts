import {
  Controller,
  Res,
  HttpStatus,
  Param,
  Get,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CResponse } from '../utils/cresponse';
import { Status } from '../utils/Status';
import { Inventario } from '../entidades/inventario.entity';
import { AuthService } from '../auth/auth.service';
import { InventarioDto } from '../dto/InventarioDto';

@Controller('inventario')
export class InventarioController {
  constructor(
    private inventarioService: InventarioService,
    private authService: AuthService,
  ) {}
  @Get()
  getAll(@Res() response) {
    this.inventarioService
      .getAll()
      .then((inventarios: Inventario[]) => {
        if (inventarios.length > 0) {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.OK,
                'Exito',
                this.authService.token,
                inventarios,
              ),
            );
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                'No hay ningun producto registrado en el inventario',
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
              'Error al obtener el listado del Inventario',
              this.authService.token,
              [],
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }

  @Get(':id')
  get(@Res() response, @Param('id') id) {
    this.inventarioService
      .getById(id)
      .then((inventario: Inventario) => {
        if (inventario) {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.OK,
                'Exito',
                this.authService.token,
                inventario,
              ),
            );
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                `El Inventario con ID: ${id.toString()} no existe`,
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
              'Error al obtener el inventario del producto',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }

  @Get('/producto/:codigo')
  getByProductCode(@Res() response, @Param('codigo') codigo) {
    this.inventarioService
      .getByProductForSale(codigo)
      .then((inventario: Inventario) => {
        if (inventario) {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.OK,
                'Exito',
                this.authService.token,
                inventario,
              ),
            );
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                `El producto con codigo: ${codigo} no existe`,
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
              'Error al obtener el inventario del producto',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }

  @Put('/supply/:id')
  supply(
    @Body() inventariodto: InventarioDto,
    @Res() response,
    @Param('id') id,
  ) {
    this.inventarioService
      .supply(id, inventariodto)
      .then((inventario: Inventario) => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Inventario actualizada con exito',
              this.authService.token,
              Inventario,
            ),
          );
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Ocurrió un error al acutalizar ek inventario',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }
}
