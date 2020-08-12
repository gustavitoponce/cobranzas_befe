import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from '../entidades/producto.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { MarcaService } from '../marca/marca.service';
import { CategoriaService } from '../categoria/categoria.service';
import { UnidadService } from '../unidad/unidad.service';
import { InventarioService } from '../inventario/inventario.service';
import { Marca } from '../entidades/marca.entity';
import { Categoria } from '../entidades/categoria.entity';
import { Unidad } from '../entidades/unidad.entity';
import { TipoOperacionService } from '../tipo-operacion/tipo-operacion.service';
import { Inventario } from '../entidades/inventario.entity';
import { Operacion } from '../entidades/operacion.entity';
import { TipoOperacion } from '../entidades/tipo-operacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Producto,
      Marca,
      Categoria,
      Unidad,
      Inventario,
      Operacion,
      TipoOperacion,
    ]),
    AuthModule,
  ],
  providers: [
    ProductoService,
    AuthService,
    MarcaService,
    CategoriaService,
    UnidadService,
    InventarioService,
    TipoOperacionService,
  ],
  controllers: [ProductoController],
})
export class ProductoModule {}
