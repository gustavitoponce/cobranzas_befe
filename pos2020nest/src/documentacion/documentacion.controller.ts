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
import { DocumentacionDto } from '../dto/documentacion.dto';
import { DocumentacionService } from './documentacion.service';
import { CResponse } from '../utils/cresponse';
import { Status } from '../utils/Status';
import { Documentacion } from '../entidades/documentacion.entity';
import { AuthService } from '../auth/auth.service';

@Controller('documentacion')
export class DocumentacionController {
  constructor(
    private authService: AuthService,
    private documentService: DocumentacionService,
  ) {}
  @Get()
  getAll(@Res() response, @Query('inactivos') incluirInactivos) {
    this.documentService
    .getAll(incluirInactivos)
      .then((documentacion: Documentacion[]) => {
        if (documentacion.length > 0) {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.OK,
                'Exito',
                this.authService.token,
                documentacion,
              ),
            );
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                'No hay documentacion registradas',
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
              'Ocurrió un error al obtener el listado de productos',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }

  @Get(':id')
  get(@Res() response, @Param('id') id) {
    this.documentService
      .getdoc(id)
      .then((documentacion: Documentacion[]) => {
        if (documentacion) {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.OK,
                'Exito',
                this.authService.token,
                documentacion,
              ),
            );
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                `El producto con ID: ${id.toString()} no existe`,
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
              'Error al obtener la producto',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }

  @Get('/codigo/:codigo')
  getByCode(@Res() response, @Param('codigo') id) {
    this.documentService
      .getByCode(id)
      .then((documentacion: Documentacion) => {
        if (documentacion) {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.OK,
                'Exito',
                this.authService.token,
                documentacion,
              ),
            );
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                `El producto con codigo: ${id.toString()} no existe`,
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
              'Error al obtener la producto',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }

  @Post()
  create(@Body() body: DocumentacionDto, @Res() response) {
    this.documentService
      .create(body)
      .then((documentacion: Documentacion) => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Se creó el producto correctamente',
              this.authService.token,
              documentacion,
            ),
          );
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Ocurrió un error al crear el nuevo producto',
              null,
              this.authService.token,
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }

  @Put(':id')
  update(@Body() documentacion: DocumentacionDto, @Res() response, @Param('id') id) {
    this.documentService
      .update(id, documentacion)
      .then((marca: Documentacion) => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Se actualizó el producto con exito',
              this.authService.token,
              marca,
            ),
          );
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Ocurrió un error al actualizar el producto',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }

  @Delete(':id')
  delete(@Res() response, @Param('id') id: number) {
    this.documentService
      .delete(id)
      .then(() => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Producto borrado con exito',
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
              'Ocurrió un error al borrar el producto',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }
}
