import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cronaca } from './global';

export interface FdvPsResponse {
  fdv: number | string;
  fdvmax: number | string;
  PScorrenti: number | string;
  maxps: number | string;
}

export interface BarcodeResult {
  motivo: string;
  descrizione: string;
  sino: string;
}

export interface BarcodeResponse {
  nomeoggetto: string;
  descrizione: string;
  esito: BarcodeResult[];
  domanda: string;
  R1: string;
  R2: string;
  esitoSI: BarcodeResult[];
  esitoNO: BarcodeResult[];
}

export interface TaumPowerResponse {
  idtaum2: number;
  livello: number;
  nometaum2: string;
}

export interface TaumResponse {
  idtaum: number;
  nometaum: string;
  livello: number;
  focus: number;
  poteri: TaumPowerResponse[];
}

export interface NecroPowerResponse {
  idnecro2: number;
  livello: number;
  nomenecro2: string;
  attivo: string;
}

export interface NecroResponse {
  idnecro: number;
  nomenecro: string;
  livello: number;
  focus: number;
  poteri: NecroPowerResponse[];
}

export interface RitualeResponse {
  idrituale: number;
  livello: number;
  nomerituale: string;
}

export interface TaumNecroResponse {
  taum: TaumResponse[];
  necro: NecroResponse[];
  rituali: RitualeResponse[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private http = inject(HttpClient);

  login(username: string, password: string) {
    return this.http.post<unknown>('https://www.roma-by-night.it/ionicPHP/login-master.php', {
      username: username,
      password: password
    });
  }
  barcode(barcode: string) {
    return this.http.get<BarcodeResponse>(
      'https://www.roma-by-night.it/ionicPHP/barcode-master.php?barcode=' + barcode
    );
  }

   getlistcronache() {
     return this.http.get<Array<Cronaca>>(
       'https://www.roma-by-night.it/Notturna2/wsPHP/getlistcronache.php'
     );
   }

  taum(userid: number) {
    return this.http.get<TaumNecroResponse[]>(
      'https://www.roma-by-night.it/ionicPHP/listtaum.php?id=' + userid
    );
  }


  changefdv(userid: number, change: number) {
    return this.http.get<unknown>(
      'https://www.roma-by-night.it/ionicPHP/changefdv-master.php?id=' +
        userid +
        '&change=' +
        change
    );
  }

  getfdv(userid: number) {
    return this.http.get<FdvPsResponse>(
      'https://www.roma-by-night.it/ionicPHP/getfdv.php?id=' + userid
    );
  }

  changeps(userid: number, change: number) {
    return this.http.get<unknown>(
      'https://www.roma-by-night.it/ionicPHP/changeps-master.php?id=' +
        userid +
        '&change=' +
        change
    );
  }
}

 