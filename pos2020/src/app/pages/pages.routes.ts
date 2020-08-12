import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './tablero/tablero.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';

// Guards
import { AdminGuard } from '../services/service.index';
import { VerificaTokenGuard } from '../guards/verifica-token.guard';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './producto/productos.component';
import { ProductoComponent } from './producto/producto.component';
import { MarcasComponent } from './marcas/marcas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { UnidadesComponent } from './unidad/unidades.component';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { VentaComponent } from './venta/venta.component';
import { PersonasComponent } from './personas/personas.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ComprasComponent } from './compras/compras.component';
import { CajasComponent } from './cajas/cajas.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { SimuladorComponent } from './simulador/simulador.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { GestionPrestamosComponent } from './gestionprestamos/gestionprestamos.component';
import { MonitorCobranzasComponent } from './monitor-cobranzas/monitor-cobranzas.component';
import { CobranzasComponent } from './cobranzas/cobranzas.component';
import { MercaderiaComponent } from './mercaderia/mercaderia.component';
import { CambiosComponent } from './cambios/cambios.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { Reporte1Component } from './reporte1/reporte1.component';
import { Reporte2Component } from './reporte2/reporte2.component';
import { Reporte3Component } from './reporte3/reporte3.component';
import { Reporte4Component } from './reporte4/reporte4.component';

import { ClienteComponent } from '../pages/cliente/cliente.component';
import { ProveedorComponent } from '../pages/proveedor/proveedor.component';
import { ClientenuevoComponent } from '../pages/clientenuevo/clientenuevo.component';
import { ProveedornuevoComponent } from '../pages/proveedornuevo/proveedornuevo.component';


const pagesRoutes: Routes = [
    /*============================================================
                             - Personal -
      ============================================================*/    
    {
        path: 'account-settings',
        component: AccoutSettingsComponent,
        data: { titulo: 'Ajustes de Tema', carpeta: 'Personal' },
        canActivate: [
            VerificaTokenGuard,
        ],
    },
    {
        path: 'perfil',
        component: PerfilUsuarioComponent,
        data: { titulo: 'Perfil de usuario', carpeta: 'Personal' },
        canActivate: [
            VerificaTokenGuard,
        ],
    },
    /*============================================================
                     - Matnenimiento de Catalogos-
      ============================================================*/
    {
        path: 'usuarios',
        component: UsuariosComponent,
        data: { titulo: 'Mantenimiento de Usuarios', carpeta: 'Mantenimiento' },
        canActivate: [
            VerificaTokenGuard, AdminGuard
        ]
    },
    {
        path: 'producto/:id',
        component: ProductoComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Mantenimiento de Producto' }
    },
    {
        path: 'productos',
        component: ProductosComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Listado de Productos' }
    },
    {
        path: 'compras',
        component: ComprasComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Listado de Compras' }
    },
    {
        path: 'cajas',
        component: CajasComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Listado de Cajas' }
    },
    {
        path: 'movimientos',
        component: MovimientosComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Listado de Movimientos' }
    },
    {
        path: 'simulador',
        component: SimuladorComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Simulador de Prestamo' }
    },
    {
        path: 'prestamos',
        component: PrestamosComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Administracion de Prestamos' }
    },
    {
        path: 'cambios',
        component: CambiosComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Cambios de Estados' }
    },

    {
        path: 'gestionprestamos',
        component: GestionPrestamosComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Administracion de Prestamos' }
    },

    {
        path: 'monitor',
        component: MonitorCobranzasComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Monitor de Cobranzas' }
    },
    {
        path: 'cobranzas',
        component: CobranzasComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Administracion de Cobranzas' }
    },
    {
        path: 'mercaderia',
        component: MercaderiaComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Movimientos de Mercaderia' }
    },
    {
        path: 'notificaciones',
        component: NotificacionesComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Notificaciones Chat' }
    },
    {
        path: 'reporte1',
        component: Reporte1Component,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Reporte 1' }
    },
    {
        path: 'reporte2',
        component: Reporte2Component,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Reporte 2' }
    },
    {
        path: 'reporte3',
        component: Reporte3Component,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Reporte 3' }
    },
    {
        path: 'reporte4',
        component: Reporte4Component,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Reporte 4' }
    },
    {
        path: 'marcas',
        component: MarcasComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Listado de Marcas' }
    },
    {
        path: 'categorias',
        component: CategoriasComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Listado de Categorias' }
    },
    {
        path: 'unidades',
        component: UnidadesComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Listado de Unidades' }
    },
    {
        path: 'configuraciones',
        component: ConfiguracionesComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Listado de Configuraciones' }
    },
    {
        path: 'personas',
        component: PersonasComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Listado de Clientes/Proveedores' }
    },
    {
        path: 'clientes',
        component: ClienteComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Listado de Clientes' }
    },
    {
        path: 'provedores',
        component: ProveedorComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Listado de provedores' }
    },
    {
        path: 'nuevocliente/:id',
        component: ClientenuevoComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Nuevo Clientes' }
    },
    {
        path: 'nuevoprovedor/:id',
        component: ProveedornuevoComponent,
        canActivate: [ VerificaTokenGuard, AdminGuard ],
        data: { titulo: 'Nuevo provedores' }
    },

    /*============================================================
                            - Principal -
      ============================================================*/
    {
        path: 'tablero',
        component: TableroComponent,
        canActivate: [ VerificaTokenGuard ],
        data: { titulo: 'Tablero', carpeta: 'Principal' }
    },
    {
        path: 'venta',
        component: VentaComponent,
        canActivate: [ VerificaTokenGuard ],
        data: { titulo: 'Venta' }
    },

    /*============================================================
                            - Reportes -
      ============================================================*/
    {
        path: 'inventario',
        component: InventarioComponent,
        canActivate: [ VerificaTokenGuard ],
        data: { titulo: 'Inventario' }
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
