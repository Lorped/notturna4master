import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>('https://www.roma-by-night.it/ionicPHP/login-master.php', {
      username: username,
      password: password
    }).pipe(
    map(user => {
      // console.log ('auth :' , user);
      return user;
    }));
  }

}

