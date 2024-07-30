import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { FullOggetto, Condizione } from '../global';

@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.page.html',
  styleUrls: ['./modifica.page.scss'],
})
export class ModificaPage implements OnInit {

  barcode = '' ;


  constructor(public route: ActivatedRoute, private http: HttpClient, public myoggetto: FullOggetto, public router: Router) { 
    this.barcode = this.route.snapshot.params['id'] ;

    if ( this.barcode.length > 12 ) {
      let newbarcode = this.barcode.substr(-12);
      this.barcode = newbarcode;
    }

    this.loadoggetto();
  }

  ngOnInit() {
  }

  loadoggetto() {
    var url = 'https://www.roma-by-night.it/ionicPHP/barcode3.php?barcode='+this.barcode;

		this.http.get(url)
		.subscribe( (data: any) => {

			//console.log(data);

      this.myoggetto.oggetto = data.oggetto;
      this.myoggetto.condizioni = data.condizioni;

      //console.log(this.myoggetto);
		});
  }

  modifica() {
    var url = 'https://www.roma-by-night.it/ionicPHP/changeogg.php';

		this.http.post<any>(url, {
      idoggetto: this.myoggetto.oggetto.idoggetto,
      nomeoggetto: this.myoggetto.oggetto.nomeoggetto,
      descrizione: this.myoggetto.oggetto.descrizione
    }).subscribe(res =>  {

        alert("Oggetto modificato");
				this.loadoggetto();
        //this.router.navigate(['home']);
        //this.navParams.get("parentPage").loadoggetti();
		  });
  }

  edit(x: Condizione) {
    // this.navCtrl.push('EditcondPage', { "condizione": x });
    //console.log("edit x", x);
    this.router.navigate(['modifica/'+this.barcode+'/'+x.con.idcondizione]);
  }

  delete (x: Condizione) {
    // console.log(x);
    //console.log(x.con.idcondizione);
    
    var url = 'https://www.roma-by-night.it/ionicPHP/delcond.php?idcondizione='+x.con.idcondizione;

		this.http.get(url)
		.subscribe( data => {

			this.loadoggetto();

		});
    
  }

}
