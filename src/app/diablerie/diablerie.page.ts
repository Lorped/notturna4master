import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

export class Utente {
	nomepg: string;
	idutente: number;

	constructor(nomepg: string, idutente: number) {
		this.nomepg = nomepg;
		this.idutente = idutente;
	}

}

@Component({
  selector: 'app-diablerie',
  templateUrl: './diablerie.page.html',
  styleUrls: ['./diablerie.page.scss'],
})
export class DiableriePage implements OnInit {

  listautenti: Array<Utente> = [];
  diablerista = 0;
  vittima = 0;

  constructor(public http: HttpClient, public alertCtrl: AlertController) { 

    var url = 'https://www.roma-by-night.it/ionicPHP/utenti.php';

		var mialista = [];

		this.http.get(url)
		.subscribe(	(data: any) => {
			this.listautenti = data;
      for ( let i = 0 ; i< this.listautenti.length ; i++){
        this.listautenti[i].idutente = Number (this.listautenti[i].idutente);
      }

      //console.log(data);
      //console.log(this.listautenti);
		});

  }

  async effettuadiablerie() {



    let alert = await this.alertCtrl.create({
    header: 'Conferma',
    message: 'Confermi la Diablerie?',
    buttons: [
      {
        text: 'NO',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      },
      {
        text: 'SI',
        handler: () => {
          var url = 'https://www.roma-by-night.it/ionicPHP/diablerie.php?diabl=' + this.diablerista + '&vittima=' + this.vittima;

          this.http.get(url)
          .subscribe(	async res => {
      			let alert = await this.alertCtrl.create({
              header: 'Diablerie terminata',
		            buttons: ['OK']
		          });
		          await alert.present();
      		});

        }
      }
    ]
  });
  alert.present();
  }

  ngOnInit() {
  }

}
