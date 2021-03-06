import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../service.index';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IResponse } from 'src/app/interfaces/response.interface';
import { Prestamo } from '../../models/prestamo.model';
import { DPrestamo } from '../../models/dprestamo.model';
import { DetallePrestamo } from '../../models/detalle-prestamo.model';
import { Status } from 'src/app/definitions/definitions';

import swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';


@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  detalleprestamos: DetallePrestamo [] = [];
  detalleprestamo: DetallePrestamo = new DetallePrestamo();
  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) { }

  consultarTodo(incluirInactivos: boolean = false) {
    const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
    const url = URL_SERVICIOS + `/prestamo?inactivos=${incluirInactivos}`;
    return this.http.get(url, httpOptions )
    .map((response: IResponse): DPrestamo[] => {
      let retorno: DPrestamo [] = [];

      switch ( response.status ) {
        case Status.OK:
          retorno = response.data as DPrestamo[];
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

  consultarDetalle(id :number) {
    console.log('consultar detalle')
    const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
    const url = URL_SERVICIOS + '/prestamo/' + id;
    return this.http.get(url, httpOptions )
    .map((response: IResponse): DetallePrestamo[] => {
      let retorno: DetallePrestamo [] = [];

      switch ( response.status ) {
        case Status.OK:
          retorno = response.data as DetallePrestamo[];
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
    const url = URL_SERVICIOS + '/prestamo/' + id;

    return this.http.get( url, httpOptions )
      .map( (response: IResponse) => {
        let retorno: Prestamo = null;

       // this.sharedService.token = response.token;

        switch ( response.status ) {
          case Status.OK:
            retorno = response.data as Prestamo;
            break;
          case Status.ERROR:
            swal.fire(response.message, response.error.message, 'error');
            retorno = null;
            break;
          case Status.SESSION_EXPIRED:
            swal.fire('La sesión ha expidaro', 'por favor vuelva a iniciar sesión', 'info').then(() => {
              this.router.navigate(['/login']);
            });
            retorno = null;
            break;
          case Status.NOT_RECORDS_FOUND:
            // swal.fire('Ops!!', response.error.message, 'info');
            retorno = null;
            break;
        }
        return retorno;
      }).catch( (response) => {
          swal.fire('Ops!!', response.error.message, 'error');
          return Observable.throwError( response );
      });
  }

 /* consultarDefaultParaVenta() {
    const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
    const url = URL_SERVICIOS + '/persona/persona_default_venta/';

    return this.http.get( url, httpOptions )
      .map( (response: IResponse) => {
        let retorno: Persona = null;

        //this.sharedService.token = response.token;

        switch ( response.status ) {
          case Status.OK:
            retorno = response.data as Persona;
            break;
          case Status.ERROR:
            swal.fire(response.message, response.error.message, 'error');
            retorno = null;
            break;
          case Status.SESSION_EXPIRED:
            swal.fire('La sesión ha expidaro', 'por favor vuelva a iniciar sesión', 'info').then(() => {
              this.router.navigate(['/login']);
            });
            retorno = null;
            break;
          case Status.NOT_RECORDS_FOUND:
            swal.fire('Atencion!!', response.message, 'warning');
            retorno = new Persona();
            break;
        }
        return retorno;
      }).catch( (response) => {
          swal.fire('Ops!!', response.error.message, 'error');
          return Observable.throwError( response );
      });
  }*/

  registrar(prestamo: Prestamo) {
    const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
    const url = URL_SERVICIOS + '/prestamo/';
     
    //prestamo.empresa = JSON.parse(localStorage.getItem("empresa"));
    let prueba = JSON.parse(localStorage.getItem("usuario"));
console.log(prestamo);

  // prestamo.cliente     =JSON.parse(localStorage.getItem("cliente"));
    //persona.usuariomodificacion = JSON.parse(localStorage.getItem("usuario"));
    
    return this.http.post(url, prestamo, httpOptions)
    
    .map((response: IResponse) => {

      //this.sharedService.token = response.token;

      switch ( response.status ) {
        case Status.OK:
          
            swal.fire({
              type: 'success',
              title: 'Exito',
              text: `prestamo ${response.data.id} creado(a) con exito`,
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
      var valor = response.data.id;
      console.log(valor);
      return valor;
    })
    .catch((response) => {
      swal.fire('Ops!!', response.error.error.message, 'error');
      return Observable.throwError( response );
    });
  }

  registrardetalle(detalleprestamo: DetallePrestamo) {
    const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
    const url = URL_SERVICIOS + '/detalleprestamo/';
  
    //prestamo.empresa = JSON.parse(localStorage.getItem("empresa"));
    //prestamo.usuariocrea = JSON.parse(localStorage.getItem("usuario"));

  // prestamo.cliente     =JSON.parse(localStorage.getItem("cliente"));
    //persona.usuariomodificacion = JSON.parse(localStorage.getItem("usuario"));
    return this.http.post(url, detalleprestamo, httpOptions)
    .map((response: IResponse) => {
      //this.sharedService.token = response.token;

      switch ( response.status ) {
        case Status.OK:
            swal.fire({
              type: 'success',
              title: 'Exito',
              text: `prestamo ${response.data.id} creado(a) con exito`,
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
  actualizar(id: number,  prestamo: Prestamo) {
    const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
    const url = URL_SERVICIOS + '/prestamo/1';// + id;
    prestamo.id = 1;//JSON.parse(localStorage.getItem("id"));
    prestamo.usuarioAlta = JSON.parse(localStorage.getItem("usuario")); 
   // persona.usuariomodificacion = JSON.parse(localStorage.getItem("usuario"));
console.log('servicio actualizar');
console.log(url);
console.log(prestamo);
    return this.http.put(url, prestamo, httpOptions)
    .map((response: IResponse) => {

      //this.sharedService.token = response.token;

      switch ( response.status ) {
        case Status.OK:
            swal.fire({
              type: 'success',
              title: 'Exito',
              text: `${prestamo.tipo}: ${prestamo.id} actualizado(a) con exito`,
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

  cambiarestado(id: number,  prestamo: Prestamo) {
    const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken })};
    const url = URL_SERVICIOS + '/prestamo/'+ id;
    prestamo.id = id;//JSON.parse(localStorage.getItem("id"));
    prestamo.usuarioAlta = JSON.parse(localStorage.getItem("usuario")); 
   // persona.usuariomodificacion = JSON.parse(localStorage.getItem("usuario"));
console.log('servicio actualizar');
console.log(url);
console.log(prestamo);
    return this.http.put(url, prestamo, httpOptions)
    .map((response: IResponse) => {

      //this.sharedService.token = response.token;

      switch ( response.status ) {
        case Status.OK:
            swal.fire({
              type: 'success',
              title: 'Exito',
              text: `${prestamo.tipo}: ${prestamo.id} actualizado(a) con exito`,
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
    const url = URL_SERVICIOS + `/prestamo/buscar/${termino}/?inactivos=${incluirInactivos}`;
    return this.http.get( url, httpOptions )
                .map( (resp: any) => {
                  return resp.data;
                } )
                .catch( err => {
                  swal.fire( 'Ocurrió un error al realizar la busqueda', err.message, 'error' );
                  return Observable.throwError( err );
                });
  }
}
