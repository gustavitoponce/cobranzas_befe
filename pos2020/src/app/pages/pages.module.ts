
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//

// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { TableroComponent } from './tablero/tablero.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { BusquedaComponent } from './busqueda/busqueda.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductosComponent } from './producto/productos.component';
import { MarcasComponent } from './marcas/marcas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { UnidadesComponent } from './unidad/unidades.component';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { KeyDownMonedaDirective } from '../directives/key-down-moneda.directive';
import { EntradaMonedaDirective } from '../directives/entrada-moneda.directive';
import { VentaComponent } from './venta/venta.component';
import { PersonasComponent } from './personas/personas.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';


import { ComprasComponent } from './compras/compras.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { MercaderiaComponent } from './mercaderia/mercaderia.component';
import { SimuladorComponent } from './simulador/simulador.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { GestionPrestamosComponent } from './gestionprestamos/gestionprestamos.component';
import { CobranzasComponent } from './cobranzas/cobranzas.component';
import { MonitorCobranzasComponent } from './monitor-cobranzas/monitor-cobranzas.component';
import { MovimientosComponent } from './movimientos/movimientos.component';


// Print
import { NgxPrintModule } from 'ngx-print';

// slim scroll
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { InventarioComponent } from './inventario/inventario.component';
import { BlockUIService } from '../services/block-ui/block-ui.service';
import { CajasComponent } from './cajas/cajas.component';
import { Reporte1Component } from './reporte1/reporte1.component';
import { Reporte2Component } from './reporte2/reporte2.component';
import { Reporte3Component } from './reporte3/reporte3.component';
import { Reporte4Component } from './reporte4/reporte4.component';
import { CambiosComponent } from './cambios/cambios.component';

import { NgxBarcodeModule } from 'ngx-barcode';
import { NgPipesModule } from 'ngx-pipes';

import { ClienteComponent } from '../pages/cliente/cliente.component';
import { ProveedorComponent } from '../pages/proveedor/proveedor.component';
import { ClientenuevoComponent } from '../pages/clientenuevo/clientenuevo.component';
import { ProveedornuevoComponent } from '../pages/proveedornuevo/proveedornuevo.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({

    declarations: [
        TableroComponent,
        AccoutSettingsComponent,
        PerfilUsuarioComponent,
        UsuariosComponent,
        BusquedaComponent,
        ProductoComponent,
        GestionPrestamosComponent,
        ProductosComponent,
        MarcasComponent,
        CategoriasComponent,
        UnidadesComponent,
        ConfiguracionesComponent,
        EntradaMonedaDirective,
        KeyDownMonedaDirective,
        VentaComponent,
        PersonasComponent,
        InventarioComponent,
        GraficoDonaComponent,
        ComprasComponent,
        NotificacionesComponent,
        MercaderiaComponent,
        SimuladorComponent,
        PrestamosComponent,
        CobranzasComponent,
        MonitorCobranzasComponent,
        MovimientosComponent,
        CajasComponent,
        Reporte1Component,
        CambiosComponent,
        Reporte2Component,
        Reporte3Component,
        Reporte4Component,
        ClienteComponent,
        ProveedorComponent,    
        ClientenuevoComponent,
        ProveedornuevoComponent, 
    ],
    exports: [
        TableroComponent,
       
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
        PerfectScrollbarModule,
        NgxPrintModule,
        NgxBarcodeModule,
        NgPipesModule
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        },
        BlockUIService,
    ]
})
export class PagesModule { }
