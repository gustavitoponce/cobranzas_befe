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
import { EmpresaService } from './empresa.service';
import { Empresa } from '../entidades/empresa.entity';
import { CResponse } from '../utils/cresponse';
import { EmpresaDto } from '../dto/empresa-dto';
import { Status } from '../utils/Status';
@Controller('empresa')
export class EmpresaController {
  constructor(private empresaService: EmpresaService) {}
  //si
  @Get()
  getAll(@Res() response, @Query('inactivos') incluirInactivos) {
    this.empresaService
      .getAll(incluirInactivos)
      .then((empresas: Empresa[]) => {
        if (empresas.length > 0) {
          response
            .status(HttpStatus.OK)
            .json(new CResponse(Status.OK, 'Exito', null, empresas));
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                'No hay empresas registradas pibe',
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
              'Error al obtener el listado de empresas',
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
    this.empresaService
      .getById(id)
      .then((empresa: Empresa) => {
        if (empresa) {
          response
            .status(HttpStatus.OK)
            .json(new CResponse(Status.OK, 'Exito', null, empresa));
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                `La empresa con ID: ${id.toString()} no existe`,
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
              'Error al obtener la empresa',
              null,
              {},
              error,
            ),
          );
      });
  }
  //si
  @Post()
  create(@Body() empresaDto: EmpresaDto, @Res() response) {
    this.empresaService
      .create(empresaDto)
      .then(empresa => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Empresa creada correctamente',
              null,
              empresa,
            ),
          );
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Error al crear la nueva empresa',
              null,
              {},
              error,
            ),
          );
      });
  }

  @Put(':id')
  update(
    @Body() empresaDto: EmpresaDto,
    @Res() response,
    @Param('id') id: number,
  ) {
    this.empresaService
      .update(id, empresaDto)
      .then(empresa => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Empresa actualizada con exito',
              null,
              empresa,
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
    this.empresaService
      .delete(id)
      .then(empresa => {
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
