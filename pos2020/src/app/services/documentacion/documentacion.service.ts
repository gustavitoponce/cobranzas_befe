import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { URL_SERVICIOS } from '../../config/config';
import { Documentacion } from '../../models/documentacion.model';

import swal from 'sweetalert2';
import { IResponse } from '../../interfaces/response.interface';
import { Observable } from 'rxjs/Observable';
import { Status } from '../../definitions/definitions';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { IServiceBase } from '../../interfaces/service-base.interface';
import { BlockUIService } from '../block-ui/block-ui.service';

@Injectable()
export class DocumentacionService implements IServiceBase {
  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService,
    private blockUIService: BlockUIService
    ) { }


    consultarTodo(incluirInactivos: boolean=false ) {
      
      const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
      const url = URL_SERVICIOS + `/documentacion?inactivos=${incluirInactivos}`;
//
      this.blockUIService.bloquearUI();
    
      return this.http.get(url, httpOptions ).map((response: IResponse): Documentacion[] => {
        console.log(response);
        this.blockUIService.desbloquearUI();

       // this.sharedService.token = response.token;
    
        let retorno: Documentacion[] = [];
        switch ( response.status ) {
          case Status.OK:
            retorno = response.data as Documentacion[];
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


    consultarImagen(id :number) {
      console.log('consultar detalle')
      const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
      const url = URL_SERVICIOS + '/documentacion/' + id;
      return this.http.get(url, httpOptions )
      .map((response: IResponse): Documentacion[] => {
        let retorno: Documentacion [] = [];
  
        switch ( response.status ) {
          case Status.OK:
            retorno = response.data as Documentacion[];
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
        swal.fire( 'Ops!!', err.message, 'error' );
        return Observable.throwError( err );
      });
    }
  

    
    consultarPorId(id: number) {
      const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
      const url = URL_SERVICIOS + '/documentacion/' + id;

      return this.http.get( url, httpOptions ).map( (response: IResponse) => {
          let retorno: Documentacion;
          console.log('retorno del buscar documentacion');
          console.log(JSON.stringify(response.data));
         // this.sharedService.token = response.token;

          switch ( response.status ) {
            case Status.OK:
              retorno = response.data as Documentacion;
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
      const url = URL_SERVICIOS + '/documentacion/codigo/' + codigo;

      return this.http.get( url, httpOptions )
            .map( (response: IResponse) => {

              let retorno: Documentacion;

            //  this.sharedService.token = response.token;

              switch ( response.status ) {
                case Status.OK:
                  retorno = response.data as Documentacion;
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
    registrar(documentacion: Documentacion) {
      const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
      const url = URL_SERVICIOS + '/documentacion/';
      //documentacion.prestamo
      //documentacion.empresa = JSON.parse(localStorage.getItem("empresa"));
      documentacion.usuarioestatus = JSON.parse(localStorage.getItem("usuario"));
      documentacion.usuariomodificacion = JSON.parse(localStorage.getItem("usuario"));
console.log(documentacion.idprestamo);
      return this.http.post(url, documentacion, httpOptions)
      .map((response: IResponse) => {
console.log('llego al servicio')
        //this.haredService.token = response.token;
console.log(response);
        switch ( response.status ) {
          case Status.OK:
              swal.fire({
                type: 'success',
                title: 'Exito',
                text: `Documentacion: ${documentacion.nombre} creado con exito`,
                showConfirmButton: false,
                timer: 1500
              });
             // this.router.navigate(['/documentacion', response.data.id]);
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
    actualizar(id: number,  documentacion: Documentacion) {
      const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
      const url = URL_SERVICIOS + '/documentacion/' + id;

      return this.http.put(url, documentacion, httpOptions)
      .map((response: IResponse) => {

        //this.sharedService.token = response.token;

        switch ( response.status ) {
          case Status.OK:
              swal.fire({
                type: 'success',
                title: 'Exito',
                text: `Documentacion: ${documentacion.nombre} actualizado con exito`,
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
      const url = URL_SERVICIOS + `/busqueda/documentacion/${termino}/?inactivos=${incluirInactivos}`;
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
      const url = URL_SERVICIOS + '/validador/documentacion/existe_codigo/' + codigo;
      return this.http.get(url, httpOptions);
    }
}
