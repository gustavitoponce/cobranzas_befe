import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { Empresa } from '../entidades/empresa.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { Usuario } from '../entidades/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { EmpresaModule } from '../empresa/empresa.module';
import { EmpresaService } from '../empresa/empresa.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { ProductoService } from '../producto/producto.service';
import { Producto } from '../entidades/producto.entity';
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
      Usuario,
      Empresa,
      Producto,
      Marca,
      Categoria,
      Unidad,
      Inventario,
      Operacion,
      TipoOperacion,
    ]),
    UsuarioModule,
    EmpresaModule,
    AuthModule,
  ],
  providers: [
    UploadService,
    UsuarioService,
    EmpresaService,
    AuthService,
    ProductoService,
    MarcaService,
    CategoriaService,
    UnidadService,
    InventarioService,
    TipoOperacionService,
  ],
  controllers: [UploadController],
})
export class UploadModule {}
