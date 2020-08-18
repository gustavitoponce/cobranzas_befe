import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 // apiURL = `https://jsonplaceholder.typicode.com`;
  apiURL = `http://localhost:3000/prestamo/1`;
  constructor(private http: HttpClient) { }

  getPosts(id) {
   // return this.http.get(`${this.apiURL}/posts/${id}`);
   return this.http.get(`${this.apiURL}`);
  }
}