import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Status } from '../../definitions/definitions';
import swal from 'sweetalert2';
import { Zona } from '../../models/zona.model';
@Injectable()
export class ZonaService {
  constructor(private http: HttpClient) { }
  cargarZonas(incluirInactivos: boolean) {
    const url = URL_SERVICIOS + `/zona?inactivos=${incluirInactivos}`;
    return this.http.get(url).map((response: any) => {
      let retorno: Zona[] = [];
      switch (response.status) {
        case Status.OK:
          retorno = response.data as Zona[];
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
      var zonas = [];
      zonas.push({ nombre: "empresa 1" });
      zonas.push({ nombre: "empresa 2" });
      zonas.push({ nombre: "empresa 3" });
      return zonas;
    });
  }
}
