import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class SidebarService {

//  menu: any[] = [];

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Estadisticas', url: '/tablero' },
        { titulo: 'Ventas', url: '/venta' },
        { titulo: 'Caja', url: '/cajas' },
        { titulo: 'Compras', url: '/compras' },
        { titulo: 'Movimientos', url: '/movimientos' },
      ]
    },
    {
      titulo: 'Prestamos',
      icono: 'mdi mdi-credit-card-multiple',
      submenu: [
        { titulo: 'Simulador', url: '/simulador' },
        { titulo: 'Prestamos', url: '/prestamos' },
        { titulo: 'Monitor', url: '/monitor' },
        { titulo: 'Cambios de Estados', url: '/cambios' },
        { titulo: 'Cobranzas', url: '/cobranzas' },
      ]
    },
    {
      titulo: 'Stock',
      icono: 'mdi mdi-checkbox-multiple-marked',
      submenu: [
        { titulo: 'Inventario', url: '/inventario' },
        { titulo: 'Movimiento', url: '/mercaderia' },
      ]
    },
    {
      titulo: 'Reportes',
      icono: 'mdi mdi-chart-bar',
      submenu: [
        { titulo: 'Reporte 1', url: '/reporte1' },
        { titulo: 'Reporte 2', url: '/reporte2' },
        { titulo: 'Reporte 3', url: '/reporte3' },
        { titulo: 'Reporte 4', url: '/reporte4' },
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Productos', url: '/productos' },
        { titulo: 'Marcas', url: '/marcas' },
        { titulo: 'Categorias', url: '/categorias' },
        { titulo: 'Unidades', url: '/unidades' },
        { titulo: 'Notificaciones', url: '/notificaciones' },
        { titulo: 'Clientes/Proveedores', url: '/personas' },
        { titulo: 'Clientes', url: '/clientes' },
        { titulo: 'Proveedores', url: '/provedores' },
        { titulo: 'Zonas', url: '/zonas' },
      ]
    },
    {
      titulo: 'Configuración',
      icono: 'mdi mdi-wrench',
      submenu: [
        { titulo: 'Configuraciones', url: '/configuraciones' },
      ]
    },
  ];

  constructor(
    public usuarioService: UsuarioService
  ) { }

  cargarMenu() {
    // this.menu = this._usuarioService.menu;
  }

}
