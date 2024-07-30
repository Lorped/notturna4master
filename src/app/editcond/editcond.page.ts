import { Component, OnInit } from '@angular/core';
import { FullOggetto, Condizione } from '../global';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editcond',
  templateUrl: './editcond.page.html',
  styleUrls: ['./editcond.page.scss'],
})
export class EditcondPage implements OnInit {

  condizione = new(Condizione);

  condA: Array<string> = ['Forza', 'Destrezza', 'Attutimento',
    'Carisma', 'Persuasione', 'Saggezza',
    'Percezione', 'Intelligenza', 'Prontezza'] ;

  condD: Array<any> = [];
  condP: Array<any> = [];
  condS: Array<any> = [];

  newcond = 0;

  idcond = 0 ;

  constructor(public myoggetto: FullOggetto, private http: HttpClient, public route: ActivatedRoute) { 
    this.idcond = this.route.snapshot.params['con'] ;
    console.log(this.myoggetto);
    console.log(this.idcond);


    for ( var i = 0 ; i < this.myoggetto.condizioni.length; i++) {
      if ( this.myoggetto.condizioni[i].con.idcondizione == this.idcond) {
        this.condizione = this.myoggetto.condizioni[i];
        console.log(this.condizione);
      }
    }
    //this.newcond = Number(this.condizione.con.tabcond);
    this.condizione.con.tabcond = Number(this.condizione.con.tabcond);
    this.caricacond();
  }

  ngOnInit() {
  }

  caricacond () {
    var url = 'https://www.roma-by-night.it/ionicPHP/listpoteridiscipline.php';

		this.http.get(url)
    .subscribe((res:any) =>  {
      // console.log(res);
      this.condD = res[0].discipline;
      this.condP = res[0].poteri;
      this.condS = res[0].skill;
      // console.log (this.condS);
      // console.log (this.condD);
    });

  }


  modifica() {



    this.condizione.con.tabcond = this.newcond;
    // console.log ("tabcond " + this.newcond);
    // console.log ("valcond " + this.condizione.con.valcond);
    // console.log ("newdescr " + this.condizione.con.descrX);
    // console.log ("cc " + this.condizione.cc);

    switch (this.condizione.con.tipocond) {
      case 'A': {
        this.condizione.cc = this.condA[this.newcond-1];
        break;
      }
      case 'P': {
        this.condizione.cc = this.condP.find(x=>x.idpotere == this.newcond).nomepotere;
        break;
      }
      case 'D': {
        this.condizione.cc = this.condD.find(x=>x.iddisciplina == this.newcond).nomedisc;
        break;
      }
      case 'S': {
        this.condizione.cc = this.condS.find(x=>x.idskill == this.newcond).nomeskill;
        break;
      }
    };

    // console.log ("cc " + this.condizione.cc);


    var link = 'https://www.roma-by-night.it/ionicPHP/changecond.php';


    this.http.post(link, {
      idcondizione: this.condizione.con.idcondizione,
      tabcond: this.newcond,
      valcond: this.condizione.con.valcond,
      descrX: this.condizione.con.descrX 
      })
    .subscribe(res =>  {

      alert("Condizione modificata");

      // console.log (this.condizione);

			//save if required
    });

  }

}