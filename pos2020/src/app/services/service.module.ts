import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { ProductoService } from './producto/producto.service';
import { EmpresaService } from './empresa/empresa.service';
import { MarcaService } from './marca/marca.service';
import { CategoriaService } from './categoria/categoria.service';
import { ConfiguracionService } from './configuracion/configuracion.service';
import { TipoOperacionService } from './tipo-operacion/tipo-operacion.service';
import { InventarioService } from './inventario/inventario.service';
import { OperacionService } from './operacion/operacion.service';
import { PaisService } from './pais/pais.service';
import {  ProvinciaService } from './provincia/provincia.service';
import {LocalidadService } from './localidad/localidad.service';
import {ZonaService } from './zona/zona.service';
import {PrestamoService} from './prestamo/prestamo.service';
import {DetallePrestamoService} from './detalleprestamo/detalleprestamo.service';
import {DocumentacionService} from './documentacion/documentacion.service';
import {EstadoService} from './estados/estados.service';
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  AdminGuard,
  SubirArchivoService,
  VerificaTokenGuard,
  UnidadService,
 } from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    ProvinciaService,
    PaisService,
    LocalidadService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    VerificaTokenGuard,
    ProductoService,
    EmpresaService,
    UnidadService,
    MarcaService,
    CategoriaService,
    ConfiguracionService,
    TipoOperacionService,
    InventarioService,
    ZonaService,
    PrestamoService,
    DocumentacionService,
    DetallePrestamoService,
    OperacionService,
    EstadoService
  ],
  declarations: []
})
export class ServiceModule { }
