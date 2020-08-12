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
import { CategoriaService } from '../categoria/categoria.service';
import { Categoria } from '../entidades/categoria.entity';
import { CResponse } from '../utils/cresponse';
import { Status } from '../utils/Status';
import { CategoriaDto } from '../dto/CategoriaDto';
import { AuthService } from '../auth/auth.service';

@Controller('categoria')
export class CategoriaController {
  constructor(
    private categoriaService: CategoriaService,
    private authService: AuthService,
  ) {}

  @Get()
  getAll(@Res() response, @Query('inactivos') incluirInactivos) {
    console.log('paso por el metodo getAll');
    this.categoriaService
      .getAll(incluirInactivos)
      .then((categorias: Categoria[]) => {
        if (categorias.length > 0) {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.OK,
                'Exito',
                this.authService.token,
                categorias,
              ),
            );
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                'No hay categorias registradas',
                this.authService.token,
              ),
            );
        }
      })
      .catch(error => {
        console.log(error);
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Error al obtener el listado de categorias',
              this.authService.token,
              {},
              error,
            ),
          );
      });
  }

  @Get(':id')
  get(@Res() response, @Param('id') id) {
    this.categoriaService
      .getById(id)
      .then((categoria: Categoria) => {
        if (categoria) {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.OK,
                'Exito',
                this.authService.token,
                categoria,
              ),
            );
        } else {
          response
            .status(HttpStatus.OK)
            .json(
              new CResponse(
                Status.NO_RECORDS_FOUND,
                `La categoria con ID: ${id.toString()} no existe`,
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
              'Error al obtener la categoria',
              this.authService.token,
              {},
              error,
            ),
          );
      });
  }

  @Post()
  create(@Body() body: CategoriaDto, @Res() response) {
    console.log(JSON.stringify(body));
    this.categoriaService
      .create(body)
      .then((categoria: Categoria) => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Categoria creada correctamente',
              this.authService.token,
              categoria,
            ),
          );
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Error al crear la nueva categoria',
              this.authService.token,
              {},
              error,
            ),
          );
      });
  }

  @Put(':id')
  update(@Body() categoriadto: CategoriaDto, @Res() response, @Param('id') id) {
    this.categoriaService
      .update(id, categoriadto)
      .then(categoria => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Categoria actualizada con exito',
              this.authService.token,
              categoria,
            ),
          );
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Error al acutalizar la categoria',
              this.authService.token,
              {},
              error,
            ),
          );
      });
  }

  @Delete(':id')
  delete(@Res() response, @Param('id') id: number) {
    this.categoriaService
      .delete(id)
      .then(categoria => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Categoria borrada con exito',
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
              'Error al borrar la categoria',
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
    console.log('...................' + term);
    this.categoriaService
      .search(term, incluirInactivos)
      .then((categorias: Categoria[]) => {
        response
          .status(HttpStatus.OK)
          .json(
            new CResponse(
              Status.OK,
              'Exito',
              this.authService.token,
              categorias,
            ),
          );
      })
      .catch(error => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new CResponse(
              Status.ERROR,
              'Ocurrió un error al intentar buscar categorias',
              this.authService.token,
              {},
              { message: error.message, stack: error.stack },
            ),
          );
      });
  }
}
