import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { URL_SERVICIOS } from '../../config/config';
import { Producto } from '../../models/producto.model';

import swal from 'sweetalert2';
import { IResponse } from '../../interfaces/response.interface';
import { Observable } from 'rxjs/Observable';
import { Status } from '../../definitions/definitions';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { IServiceBase } from '../../interfaces/service-base.interface';
import { BlockUIService } from '../block-ui/block-ui.service';

@Injectable()
export class ProductoService implements IServiceBase {
  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService,
    private blockUIService: BlockUIService
    ) { }

    consultarTodo(incluirInactivos: boolean = false) {
      const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
      const url = URL_SERVICIOS + `/producto?inactivos=${incluirInactivos}`;

      this.blockUIService.bloquearUI();
      return this.http.get(url, httpOptions ).map((response: IResponse): Producto[] => {

        this.blockUIService.desbloquearUI();

       // this.sharedService.token = response.token;

        let retorno: Producto[] = [];
        switch ( response.status ) {
          case Status.OK:
            retorno = response.data as Producto[];
            break;
          case Status.ERROR:
            swal.fire(response.message, response.error.message, 'error');
            break;
          case Status.SESSION_EXPIRED:
            swal.fire('La sesión  ha expidaro', 'por favor vuelva a iniciar sesión', 'info').then(() => {
              this.router.navigate(['/login']);
            });
            break;
          case Status.NOT_RECORDS_FOUND:
            swal.fire('Ops!!', response.message, 'info');
            break;
        }
        return retorno;
      }).catch(err => {
        this.blockUIService.desbloquearUI();
        swal.fire( 'Ops!!', err.message, 'error' );
        return Observable.throwError( err );
      });
    }

    
    consultarImagen(id:number ) {
      
      
    }


    consultarPorId(id: number) {
      const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
      const url = URL_SERVICIOS + '/producto/' + id;

      return this.http.get( url, httpOptions ).map( (response: IResponse) => {
          let retorno: Producto;
          console.log('retorno del buscar producto');
          console.log(JSON.stringify(response.data));
         // this.sharedService.token = response.token;

          switch ( response.status ) {
            case Status.OK:
              retorno = response.data as Producto;
              break;
            case Status.ERROR:
              swal.fire(response.message, response.error.message, 'error');
              break;
            case Status.SESSION_EXPIRED:
              swal.fire('La sesión ha expidaro', 'por favor vuelva a iniciar sesión', 'info').then(() => {
                this.router.navigate(['/login']);
              });
              break;
            case Status.NOT_RECORDS_FOUND:
              swal.fire('Ops!!', response.message, 'info');
              break;
          }

          return retorno;
        }).catch((response) => {
          swal.fire('Ops!!', response.error.error.message, 'error');
          return Observable.throwError( response );
        });
    }

    consultarPorCodigo(codigo: string) {
      const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
      const url = URL_SERVICIOS + '/producto/codigo/' + codigo;

      return this.http.get( url, httpOptions )
            .map( (response: IResponse) => {

              let retorno: Producto;

            //  this.sharedService.token = response.token;

              switch ( response.status ) {
                case Status.OK:
                  retorno = response.data as Producto;
                  break;
                case Status.ERROR:
                  swal.fire(response.message, `<span class='text-red'>${response.error.message}</span>`, 'error');
                  break;
                case Status.SESSION_EXPIRED:
                  swal.fire('La sesión ha expidaro', 'por favor vuelva a iniciar sesión', 'info').then(() => {
                    this.router.navigate(['/login']);
                  });
                  break;
                case Status.NOT_RECORDS_FOUND:
                  swal.fire('Ops!!', `<strong>${response.message}</strong>`, 'info');
                  break;
              }
              return retorno;
            }).catch((response) => {
                swal.fire('Ops!!', response.error.error.message, 'error');
                return Observable.throwError( response );
            });
    }
    registrar(producto: Producto) {
      const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
      const url = URL_SERVICIOS + '/producto/';
      producto.empresa = JSON.parse(localStorage.getItem("empresa"));
      producto.usuarioestatus = JSON.parse(localStorage.getItem("usuario"));
      producto.usuariomodificacion = JSON.parse(localStorage.getItem("usuario"));

      return this.http.post(url, producto, httpOptions)
      .map((response: IResponse) => {

        //this.sharedService.token = response.token;

        switch ( response.status ) {
          case Status.OK:
              swal.fire({
                type: 'success',
                title: 'Exito',
                text: `Producto: ${producto.nombre} creado con exito`,
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/producto', response.data.id]);
              break;
          case Status.ERROR:
            swal.fire(response.message, response.error.message, 'error');
            break;
          case Status.SESSION_EXPIRED:
            swal.fire('La sesión ha expidaro', 'por favor vuelva a iniciar sesión', 'info').then(() => {
              this.router.navigate(['/login']);
            });
            break;
          case Status.NOT_RECORDS_FOUND:
          break;
        }
      })
      .catch((response) => {
        swal.fire('Ops!!', response.error.error.message, 'error');
        return Observable.throwError( response );
      });
    }
    actualizar(id: number,  producto: Producto) {
      const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
      const url = URL_SERVICIOS + '/producto/' + id;

      return this.http.put(url, producto, httpOptions)
      .map((response: IResponse) => {

        //this.sharedService.token = response.token;

        switch ( response.status ) {
          case Status.OK:
              swal.fire({
                type: 'success',
                title: 'Exito',
                text: `Producto: ${producto.nombre} actualizado con exito`,
                showConfirmButton: false,
                timer: 1500
              });
              break;
          case Status.ERROR:
            swal.fire(response.message, response.error.message, 'error');
            break;
          case Status.SESSION_EXPIRED:
            swal.fire('La sesión ha expidaro', 'por favor vuelva a iniciar sesión', 'info').then(() => {
              this.router.navigate(['/login']);
            });
            break;
          case Status.NOT_RECORDS_FOUND:
          break;
        }
      })
      .catch((response) => {
        swal.fire('Ops!!', response.error.error.message, 'error');
        return Observable.throwError( response );
      });
    }
    borrar(id: number) {

    }

    buscar( termino: string, incluirInactivos: boolean = false ) {
      const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
      const url = URL_SERVICIOS + `/busqueda/producto/${termino}/?inactivos=${incluirInactivos}`;
      return this.http.get( url, httpOptions )
                  .map( (resp: any) => {
                    return resp.data;
                  } )
                  .catch((response) => {
                    swal.fire('Ops!!', response.error.error.message, 'error');
                    return Observable.throwError( response );
                  });
    }
    existeCodigo(codigo: string) {
      const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
      const url = URL_SERVICIOS + '/validador/producto/existe_codigo/' + codigo;
      return this.http.get(url, httpOptions);
    }
}
