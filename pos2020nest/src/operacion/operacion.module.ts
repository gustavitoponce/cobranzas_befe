import { Module } from '@nestjs/common';
import { OperacionService } from './operacion.service';
import { OperacionController } from './operacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoOperacion } from '../entidades/tipo-operacion.entity';
import { AuthModule } from '../auth/auth.module';
import { Operacion } from '../entidades/operacion.entity';
import { AuthService } from '../auth/auth.service';
import { ProductoService } from '../producto/producto.service';
import { PersonaService } from '../persona/persona.service';
import { TipoOperacionService } from '../tipo-operacion/tipo-operacion.service';
import { Producto } from '../entidades/producto.entity';
import { MarcaService } from '../marca/marca.service';
import { CategoriaService } from '../categoria/categoria.service';
import { UnidadService } from '../unidad/unidad.service';
import { InventarioService } from '../inventario/inventario.service';
import { Persona } from '../entidades/persona.entity';
import { Marca } from '../entidades/marca.entity';
import { Categoria } from '../entidades/categoria.entity';
import { Unidad } from '../entidades/unidad.entity';
import { Inventario } from '../entidades/inventario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Operacion,
      Producto,
      Persona,
      TipoOperacion,
      Marca,
      Categoria,
      Unidad,
      Inventario,
    ]),
    AuthModule,
  ],
  providers: [
    OperacionService,
    AuthService,
    ProductoService,
    PersonaService,
    TipoOperacionService,
    MarcaService,
    CategoriaService,
    UnidadService,
    InventarioService,
  ],
  controllers: [OperacionController],
})
export class OperacionModule {}
