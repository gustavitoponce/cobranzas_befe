import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpresaModule } from './empresa/empresa.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';
import { ImagenesService } from './imagenes/imagenes.service';
import { ImagenesController } from './imagenes/imagenes.controller';
import { CategoriaModule } from './categoria/categoria.module';
import { MarcaModule } from './marca/marca.module';
import { UnidadModule } from './unidad/unidad.module';
import { PersonaModule } from './persona/persona.module';
import { ProductoModule } from './producto/producto.module';
import { InventarioModule } from './inventario/inventario.module';
import { TipoOperacionModule } from './tipo-operacion/tipo-operacion.module';
import { OperacionModule } from './operacion/operacion.module';
import { ZonaModule } from './zona/zona.module';
import { PrestamoModule } from './prestamo/prestamo.module';
import { DocumentacionModule } from './documentacion/documentacion.module';
import { DetallePrestamoModule } from './detalleprestamo/detalleprestamo.module';
import { EstadoModule } from './estado/estado.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    EmpresaModule,
    UsuarioModule,
    AuthModule,
    UploadModule,
    CategoriaModule,
    MarcaModule,
    UnidadModule,
    PersonaModule,
    ProductoModule,
    InventarioModule,
    TipoOperacionModule,
    ZonaModule,
    PrestamoModule,
   DocumentacionModule,
    DetallePrestamoModule,
    OperacionModule,
    EstadoModule,
  ],
  controllers: [AppController, ImagenesController],
  providers: [AppService, ImagenesService],
})
export class AppModule {}
