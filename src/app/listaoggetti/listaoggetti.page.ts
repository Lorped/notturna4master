import { Component, OnInit } from '@angular/core';
import { Oggetto } from '../global';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listaoggetti',
  templateUrl: './listaoggetti.page.html',
  styleUrls: ['./listaoggetti.page.scss'],
})
export class ListaoggettiPage implements OnInit {

  listaoggetti: Array<Oggetto> = [];
  oggetto = '';

  constructor(public http: HttpClient, public router: Router) {
    this.loadoggetti();
   }

  ngOnInit() {
  }

  loadoggetti () {
    var url = 'https://www.roma-by-night.it/ionicPHP/listaoggetti.php';

		this.http.get(url)
		.subscribe( (data: any) => {
			this.listaoggetti = data;
			console.log(this.listaoggetti);
		});
  }

  modifica(x: Oggetto) {
    this.oggetto = x.barcode;
    //console.log(x);
    this.router.navigate(['modifica/'+this.oggetto]);
  }

}
