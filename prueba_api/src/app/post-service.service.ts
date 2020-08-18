import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PostServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostServiceProvider {

  url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(public http: HttpClient) {
    
  }

  getPosts(){
    return new Promise(resolve=>{
      this.http.get(this.url).subscribe(data=>{
          resolve(data);
      },error=>{
        console.log(error);
      });
    });
  }

}