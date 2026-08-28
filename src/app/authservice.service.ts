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
  barcode(barcode: string) {
    return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/barcode-master.php?barcode=' + barcode);
  }

   getlistcronache() {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getlistcronache.php' );
  }

  taum(userid: number) {
    return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/listtaum.php?id='+userid);
  }


  changefdv(userid: number, change: number) {
    return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/changefdv-master.php?id='+userid+'&change='+change);
  }

  getfdv(userid: number) {
    return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/getfdv.php?id='+userid);
  }

  changeps(userid: number, change: number) {
    return this.http.get<any>('https://www.roma-by-night.it/ionicPHP/changeps-master.php?id='+userid+'&change='+change);
  }
}

 