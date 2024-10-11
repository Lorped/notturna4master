import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export class afulldata  {
  public idutente = 0;
  public nomeplayer = '';
  public nomepg = '';
  public idclan = 0;        
  public generazione = 0;
  public forza = 0;
  public destrezza = 0;
  public attutimento = 0;
  public carisma = 0;
  public persuasione = 0;
  public saggezza = 0;
  public percezione = 0;
  public prontezza = 0;
  public intelligenza = 0;
  public fdv = 0 ;
  public fdvmax = 0;
  public idstatus = 0;
  public idsentiero = 0;
  public valsentiero = '';
  public fama1 = 0;
  public fama2 = 0;
  public fama3 = 0;
  public xp = 0;
  public xpspesi = 0;
  public bio ='';
  public lastfdv = '';
  public PScorrenti = 0;
  public lastps = '';
  public lastcaccia = '';
  public rifugio = '';
  public zona = '';
  public notemaster = '';
  public bloodp = 0;
  public lastvitae = '';
  public urldt = '';
  public nummaesta = 0;
  public lastmaesta = '';
  public nomeclan = '';
  public clanimg = ''; // non usato
  public status = 0;
  public attivazione = 0;
  public sete = 0;
  public addbp = 0;           // non usato
  public fdvbase = 0;
  public bgbase = 0;
  public sentiero = '';
  public ps = 0;  // non usato
  public psturno  = 0;  // non usato
  public maxstat = 0;
  public bloodpmin = 0;
  public bloodpmax = 0;       // non usato
  public addsete = 0;
  public rigen = 0;
  public bane = 0;
  public addcaccia = 0;
  public rd = 0;
  public note = '';

  
}

export class askill {
  public tipologia = 0;
  public nomeskill = '';
  public livello = 0;
}


export class apoteri2  {
  public iddisciplina = 0;
  public livellopot = 0;   
  public nomepotere = '';
  public attivo = '';
  public nomedisc = ''; 
}




export class Legame {
	nomepg: string = '';
	livello: number = 0;
  dataultima: string = '';
}

@Component({
  selector: 'app-personaggio',
  templateUrl: './personaggio.page.html',
  styleUrls: ['./personaggio.page.scss'],
})
export class PersonaggioPage implements OnInit {

  requestID = 0;

	scheda =	new afulldata();
	myskill:	Array<askill> = [];
  poteri:	Array<apoteri2> = [];

	note:	string = '';
  notemaster:	string = '';

  amalgame: number = 0;
	rituali:	number = 0;
	forza:		number = 0;
	rissa:		number = 0;
	mischia:	number = 0;
	lancio:		number = 0;
	tiro:		number = 0;
	fuoco:		number = 0 ;
	potenza:	number = 0;
	artigli:	number = 0 ;

	psvuoti:	number = 0;

  pf = 0 ;
  rp = 0 ;

  listalegami: Array<Legame> = [];
  listalegamidomitor: Array<Legame> = [];
  rifugio: string = '';
  zona: string = '';

  fomipot2 = 0;
  foripot2 = 0;
  folapot2 = 0;
  treti2 = 0;
  trefuoco2 = 0;

  leg=0;
  legd=0;

  xpspendibili = 0 ;
  xpdisponibili = 0 ;


  constructor(public route: ActivatedRoute, public http: HttpClient) { 
    this.requestID = Number(this.route.snapshot.params['id']) ;


    //console.log("id= ", this.requestID);

    var url = 'https://www.roma-by-night.it/ionicPHP/getlegami.php?id='+this.requestID;
    this.http.get(url)
    .subscribe((res: any) =>  {
        //console.log(res);
        if ( res.target != null) {
          for ( var i = 0 ; i < res.target.length; i++) {
            this.listalegami[i]=res.target[i];
          }
          this.leg=1;
        }
        if ( res.domitor != null) {
          for ( var i = 0 ; i < res.domitor.length; i++) {
            this.listalegamidomitor[i]=res.domitor[i];
          }
          this.legd=1;
        }


        //console.log (this.listalegami);
        //console.log (this.listalegamidomitor);
    });


    var link = 'https://www.roma-by-night.it/ionicPHP/poteri.php?id='+this.requestID;
    this.http.get(link)
    .subscribe(
      (data: any) => {
        this.poteri = data;
        //console.log(this.poteri);
    });


  }

  ngOnInit() {
    this.loadPG();
  }

  menops(){
    var link = 'https://www.roma-by-night.it/ionicPHP/menops.php?id='+this.requestID;

    this.http.get(link)
     .subscribe(res =>  {
      this.scheda['PScorrenti']=-1+this.scheda['PScorrenti'];
      this.psvuoti=this.psvuoti+1;
     });
  }
  piups(){
    var link = 'https://www.roma-by-night.it/ionicPHP/piups.php?id='+this.requestID;

    this.http.get(link)
     .subscribe(res =>  {
   this.scheda['PScorrenti']=1+this.scheda['PScorrenti'];
   this.psvuoti=this.psvuoti-1;
     });
  }

  loadPG(){


		var link = 'https://www.roma-by-night.it/ionicPHP/getuser.php?id='+this.requestID;

		this.http.get(link)
    .subscribe(
      (res: any) =>  {
			    //this.currentUser.fulldata = res;
			    this.scheda = res;
          this.scheda['forza'] = Number (res['forza']);
          this.scheda['destrezza'] = Number (res['destrezza']);
          this.scheda['attutimento'] = Number (res['attutimento']);
          this.scheda['carisma'] = Number (res['carisma']);
          this.scheda['persuasione'] = Number (res['persuasione']);
          this.scheda['saggezza'] = Number (res['saggezza']);
          this.scheda['intelligenza'] = Number (res['intelligenza']);
          this.scheda['prontezza'] = Number (res['prontezza']);
          this.scheda['percezione'] = Number (res['percezione']);
          this.scheda['fdv'] = Number (res['fdv']);
          this.scheda['sete'] = Number (res['sete']);
          this.scheda['addsete'] = Number (res['addsete']);
          this.scheda['PScorrenti'] = Number (res['PScorrenti']);

          //console.log(this.scheda);

          this.scheda['rd']=Math.floor((this.scheda['carisma']+this.scheda['intelligenza']+this.scheda['prontezza']+this.scheda['percezione']+this.scheda['fdv'])/5);


          //CALCOLO XPT/XPS
          if ( this.scheda.xp > 113 ) {
            this.xpspendibili = 86 + ( this.scheda.xp - 113)/2 ;  
          } else if ( this.scheda.xp > 32 ) {
            this.xpspendibili = 32 + ( this.scheda.xp - 32)/3*2;
          } else {
            this.xpspendibili = this.scheda.xp;
          }
        
          this.xpdisponibili = this.xpspendibili - this.scheda.xpspesi;
            
          this.xpspendibili = Math.round(this.xpspendibili*10)/10;
          this.xpdisponibili = Math.round(this.xpdisponibili*10)/10;
          //

			    var link = 'https://www.roma-by-night.it/ionicPHP/skill.php'
			   
			    this.http.post<any>(link, {
            userid: this.requestID
          }).subscribe(
            res => {

				      this.myskill = res;

              //console.log(this.myskill);

              for (var j = 0; j < this.myskill.length; j++) {
  					    this.myskill[j].livello = Number ( this.myskill[j].livello ) ;
				      }

				      this.rituali=0;

				      for (var j = 0; j < this.myskill.length; j++) {
  					    if ( this.myskill[j].tipologia==11)  {
    		 			    this.rituali=1;
    					    break;
  					    }
				      }
              for (var j = 0; j < this.myskill.length; j++) {
                if ( this.myskill[j].tipologia==12)  {
                  this.amalgame=1;
                  break;
                }
              }

              this.rp = Math.floor ( this.scheda['attutimento'] / 2 ) ;

  

                
                  
              this.pf = ( 3 + this.scheda['attutimento'] )*2;
              for (let i = 0 ; i< this.myskill.length ; i++) {
              if ( this.myskill[i].nomeskill == 'Schivare' ) {
                this.pf +=  this.myskill[i].livello ;
              }
              if ( this.myskill[i].nomeskill == 'Robustezza' ) {
                this.pf +=  this.myskill[i].livello ;
                this.rp = Math.floor ( ( this.scheda['attutimento'] + this.myskill[i].livello ) / 2 ) ;
                   // vedo se ha poteri attivi

                for (let j = 0 ; j< this.poteri.length ; j++) {
                    // console.log(this.myuser.poteri[j].poteri[k]);
                  if (this.poteri[j].nomepotere=='Resilienza') this.pf += 5 + this.myskill[i].livello;
                  if (this.poteri[j].nomepotere=='Sconfiggere le Debolezze') this.pf += 5 ; //perchè +5 da liv.1
      
                }

              }
            }


            this.rifugio=this.scheda['rifugio'];
            this.zona=this.scheda['zona'];


				    this.rissa=0;
				    this.mischia=0;
				    this.lancio=0;
				    this.tiro=0;
				    this.fuoco=0;
				    this.potenza=0;
				    this.artigli=0;

				    for (var i = 0; i < this.myskill.length; i++) {
					    if ( this.myskill[i].nomeskill=="Rissa")  {
						    this.rissa=this.myskill[i].livello;
					    }
					    if ( this.myskill[i].nomeskill=="Mischia")  {
						    this.mischia=this.myskill[i].livello;
					    }
					    if ( this.myskill[i].nomeskill=="Armi da lancio")  {
						    this.lancio=this.myskill[i].livello;
					    }
					    if ( this.myskill[i].nomeskill=="Armi da tiro")  {
						    this.tiro=this.myskill[i].livello;
					    }
					    if ( this.myskill[i].nomeskill=="Armi da fuoco")  {
						    this.fuoco=this.myskill[i].livello;
					    }
					      if ( this.myskill[i].nomeskill=="Potenza")  {
						    this.potenza=this.myskill[i].livello;
					    }
					    if ( this.myskill[i].nomeskill=="Proteide")  {
						    if (this.myskill[i].livello >1 ) this.artigli=1;
					    }
				    }

				    this.forza=this.scheda['forza'];

            this.fomipot2 = Math.ceil((this.forza + this.mischia +this.potenza)/2);
            this.foripot2 = Math.ceil((this.forza + this.rissa +this.potenza)/2);
            this.folapot2 = Math.ceil((this.forza + this.lancio +this.potenza)/2);
            this.treti2 = Math.ceil((3 + this.tiro )/2);
            this.trefuoco2 = Math.ceil((3+this.fuoco)/2);

				    this.note=this.nl2br(this.scheda['note']);
            this.notemaster=this.nl2br(this.scheda['notemaster']);

				    this.psvuoti=this.scheda['sete']+this.scheda['addsete']-this.scheda['PScorrenti'];

			    });
		});

	}


  nl2br (str: string) {
      // Some latest browsers when str is null return and unexpected null value
        if (typeof str === 'undefined' || str === null) {
            return '';
        }
        // Adjust comment to avoid issue on locutus.io display
        var breakTag =  '<br>'   ;
        return (str + '')
          .replace(/(\r\n|\n\r|\r|\n)/g, breakTag + '$1')
  }


}
