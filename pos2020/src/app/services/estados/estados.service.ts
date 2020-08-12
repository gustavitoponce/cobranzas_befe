import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IResponse } from '../../interfaces/response.interface';
import { URL_SERVICIOS } from '../../config/config';
import { Status } from '../../definitions/definitions';
import swal from 'sweetalert2';
import { Estado } from '../../models/estado.model';
@Injectable()
export class EstadoService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) { }


  consultarPorId(id: number) {
    const httpOptions = { headers: new HttpHeaders({ Authorization: this.sharedService.token.accessToken }) };
    const url = URL_SERVICIOS + '/estado/' + id;
   
    //ver con Diego porque mierda esto no anda
    return this.http.get(url, httpOptions).map((response: IResponse) => {
      let retorno: Estado = new Estado;
      switch (response.status) {
        case Status.OK:
          retorno = response.data as Estado;
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
          swal.fire('Ops!!', response.error.message, 'info');
          break;
      }
      return retorno;
    }).catch(response => {
      swal.fire('Ops!!', response.error.error.message, 'error');
      return Observable.throwError(response);
    });
  }

  cargarEstados(incluirInactivos: boolean) {
    const url = URL_SERVICIOS + `/estado?inactivos=${incluirInactivos}`;
    return this.http.get(url).map((response: any) => {
      let retorno: Estado[] = [];
      switch (response.status) {
        case Status.OK:
          retorno = response.data as Estado[];
          break;
        case Status.ERROR:
          swal.fire(response.message, response.error.message, 'error');
          break;
        case Status.NOT_RECORDS_FOUND:
          swal.fire('Ops!!', response.message, 'info');
          break;
      }
      return retorno;
    }).catch((response) => {
      var estados = [];

      return estados;
    });
  }
}
