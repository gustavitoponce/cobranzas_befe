import { Component } from '@angular/core';

import { ApiService } from '../api.service';
import { logging } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title: string;
  body: string;

  constructor(private apiService: ApiService) {
    this.apiService.getPosts(1).subscribe(
      (res: any) => {
        this.title = res.data.cliente.nombre;
        console.log(res);
        this.body = res.data.observacion;
      }
    );
  }

}