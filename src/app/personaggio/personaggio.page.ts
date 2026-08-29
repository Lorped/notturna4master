import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { AuthserviceService } from '../authservice.service';

export class Background {
  public idback = 0;
  public nomeback = '';
  public livello = 0;
}

export class Alleato {
  public idalleato = 0;
  public nomealleato = '';
  public livello = 0;
}

export class Contatto {
  public idcontatto = 0;
  public nomecontatto = '';
  public livello = 0;
}

export class Subskill {
    public idskill = 0;
    public nomeskill = '';
    public livello = 0;
}

export class Skill {
    public tipologia = 0;
    public idskill = 0 ;
    public nomeskill = '';
    public livello = 0;
    public subskill: Array<Subskill> = [];
}

export class Potere  {
    public idpotere = 0;
    public nomepotere = '';
    public attivo = '';
    public livellopot = 0;    
}

export class Disciplina {
    public iddisciplina = 0;
    public nomedisc = '';
    public livello = 0;
    public focus = 0;
    public poteri: Array<Potere> = [];
}

export class User  {
  public idutente = 0 ;
  public nomeplayer = '' ;
  public nomepg = '';
  public idclan = 0;
  public nomeclan = ''; // from LEFT JOIN
  public idlds = 0 ;
  public nomelds = ''; // fron left join
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
  public fdv = 0;
  public fdvmax = 0;
  public idstatus = 0;
  public status = ''; // da LEFT JOIN
  public attivazione = 0  ; // da LEFT JOIN
  public maxps = 0  ; // da LEFT JOIN
  public PScorrenti = 0 ;
  public bonusrigen = 0 ; // da left join
  public rigen = 0 ; // da left join
  public bonusdisc = 0 ; // da left join
  public lastps = '' ; 
  public notemaster = '' ; 
  public lastcaccia = '' ;

  public nummaesta = 0 ;



  public frenesia = 0 ;      // da LEFT JOIN
  public cacciaobbligata = 0; // da LEFT JOIN
  public tempocaccia = 0;   // da LEFT JOIN

  public idsentiero = 0;
  public sentiero = ''; // da LEFT JOIN
  public valsentiero = 0 ;
  public fama1 = 0 ;
  public fama2 = 0 ;
  public fama3 = 0 ;

  public xp = 0 ;
  public xpspesi = 0 ;

  public bio = '';
  public note = '';
  public rifugio = '';
  public zona = '';

  public bloodp = 0;
  public maxdisc = 0 ; //da LEFT JOIN

  public bane = 0 ;
  public urldt = '';
  public contanti = 0 ;

  public maxstat = 0 ; // from LEFT JOIN

  public IDcronaca = 0 ;
  public Descrizione = ''; // da LEFT JOIN

  public pregiolds = '';
  public difettolds = '';

  // valori calcolati
  public rd = 0;  //res dominazione
  public pf = 0;  //punti ferita
  public rp = 0;  //res paletto

  public incaccia = 0; //serve dopo
  public ToastFineCaccia = false; //serve dopo
}

export class pregiodifetto  {
    public idpregio = 0;
    public nomepregio = '';
    public valore = 0;
    public classe = '';
}

export class apottaum  {
    public idtaum2 = 0;
    public livello = 0;
    public nometaum2 = '';
}

export class ataum  {
    public idtaum = 0;
    public nometaum = '';
    public livello = 0;
    public focus = 0;
    public poteri: Array<apottaum> = [ ]; 
}

export class apotnecro  {
    public idnecro2 = 0;
    public livello = 0;
    public nomenecro2 = '';
    public attivo = '';
}

export class anecro  {
    public idnecro = 0 ;
    public nomenecro = '';
    public livello = 0;
    public focus = 0;
    public poteri: Array<apotnecro> = [];
}

export class Rituale  {
    public idrituale = 0;
    public livello = 0;
    public nomerituale = '';
}

export class Userskill {
    public skill: Array<Skill> = [];
    public otherskill: Array<Skill> = [];
    public discipline: Array<Disciplina> = [];
    public background: Array<Background> =[];
    public alleati: Array<Alleato> =[];
    public contatti: Array<Contatto> =[];
    public taum: Array<ataum> = [];
    public necro: Array<anecro> = [];
    public rituali: Array<Rituale> = [];
    
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
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class PersonaggioPage implements OnInit {
  requestID = 0;

  user: User = new User();
  userskill: Userskill = new Userskill();
  
  
  forza = 0; 
  rissa = 0;
  mischia = 0;
  lancio = 0;
  tiro = 0;
  fuoco = 0;
  potenza = 0;
  artigli = 0;

  fomipot2 = 0;  
  foripot2 = 0;
  folapot2 = 0;
  treti2 = 0;
  trefuoco2 = 0;




  listalegami: Array<Legame> = [];
  listalegamidomitor: Array<Legame> = [];


  

  leg = 0;
  legd = 0;



  constructor(public route: ActivatedRoute, public http: HttpClient, public authentication: AuthserviceService) {
  
    this.requestID = Number(this.route.snapshot.params['id']);

    //console.log("id= ", this.requestID);

    var url =
      'https://www.roma-by-night.it/ionicPHP/getlegami.php?id=' +
      this.requestID;
    this.http.get(url).subscribe((res: any) => {
      //console.log(res);
      if (res.target != null) {
        for (var i = 0; i < res.target.length; i++) {
          this.listalegami[i] = res.target[i];
        }
        this.leg = 1;
      }
      if (res.domitor != null) {
        for (var i = 0; i < res.domitor.length; i++) {
          this.listalegamidomitor[i] = res.domitor[i];
        }
        this.legd = 1;
      }

      //console.log (this.listalegami);
      //console.log (this.listalegamidomitor);
    });


  }

  ngOnInit() {
    this.loadPG();
  }

  menops() {

    this.authentication.changeps(this.requestID, -1).subscribe(
      (data: any) => {
        console.log('PS decreased successfully:', data);
        this.user.PScorrenti = this.user.PScorrenti - 1;
      },
      (error: any) => {
        console.error('Error decreasing PS:', error);
      }
    );

  }
  piups() {
    this.authentication.changeps(this.requestID, 1).subscribe(
      (data: any) => {
        console.log('PS increased successfully:', data);
        this.user.PScorrenti = this.user.PScorrenti + 1;
      },
      (error: any) => {
        console.error('Error increasing PS:', error);
      }
    );

    
  }

  loadPG() {
    var link =
      'https://www.roma-by-night.it/ionicPHP/getuser.php?id=' + this.requestID;

    this.http.get(link).subscribe((res: any) => {
      //this.currentUser.fulldata = res;
      this.user = res.utente;

      this.user['PScorrenti'] = Number(this.user['PScorrenti']);
      this.user['forza'] = Number(this.user['forza']);
      this.user['destrezza'] = Number(this.user['destrezza']);
      this.user['attutimento'] = Number(this.user['attutimento']);
      this.user['carisma'] = Number(this.user['carisma']);
      this.user['persuasione'] = Number(this.user['persuasione']);
      this.user['saggezza'] = Number(this.user['saggezza']);
      this.user['prontezza'] = Number(this.user['prontezza']);
      this.user['intelligenza'] = Number(this.user['intelligenza']);
      this.user['percezione'] = Number(this.user['percezione']);

      this.user['fdv'] = Number(this.user['fdv']);
      this.user['fdvmax'] = Number(this.user['fdvmax']);
      this.user['fama1'] = Number(this.user['fama1']);
      this.user['fama2'] = Number(this.user['fama2']);
      this.user['fama3'] = Number(this.user['fama3']);

      this.user['xp'] = Number(this.user['xp']);
      this.user['contanti'] = Number(this.user['contanti']);
          
      this.user['PScorrenti'] = Number(this.user['PScorrenti']);
      this.user['maxps'] = Number(this.user['maxps']);

      this.user['bonusrigen'] = Number(this.user['bonusrigen']);
      this.user['rigen'] = Number(this.user['rigen']);

      if (this.user.idlds == 21 ) {
        this.user.bonusdisc = Number (this.user.bonusdisc) + 1;
      }


      //console.log(this.scheda);

      this.user['rd'] = Math.floor(
        (this.user['carisma'] +
          this.user['intelligenza'] +
          this.user['prontezza'] +
          this.user['percezione'] +
          this.user['fdv']) /
          5
      );


      this.userskill.skill = res.skill;
      this.userskill.otherskill = res.otherskill;
      this.userskill.discipline = res.discipline;
      this.userskill.background = res.background;
      this.userskill.alleati = res.alleati;
      this.userskill.contatti = res.contatti;
      //this.userskill.taum = res.taum;
      //this.userskill.necro = res.necro;
      

      this.user.pf = (3 + this.user['attutimento']) * 2;

      this.user.rp = Math.floor(this.user['attutimento'] / 2 );

      for (let i = 0; i < this.userskill.skill.length; i++) {
        this.userskill.skill[i].livello = Number(this.userskill.skill[i].livello);
      }
      for (let i = 0; i < this.userskill.otherskill.length; i++) {
        this.userskill.otherskill[i].livello = Number(this.userskill.otherskill[i].livello);  
        if (this.userskill.otherskill[i].idskill == 47) {  //schivare
          this.user.pf += this.userskill.otherskill[i].livello;
        }
      }

      const rob = this.userskill.discipline.find ( xx => xx.iddisciplina == 12 ); //robustezza

      if ( rob ) {
        rob.livello = Number(rob.livello);
        this.user.pf += rob.livello;
        this.user.rp = Math.floor( (this.user['attutimento'] + rob.livello) / 2 );

        for ( let j= 0 ; j < rob.poteri.length ; j++) {
          if (rob.poteri[j].idpotere == 70 ) { 
            if (rob.focus > 0 ) { this.user.pf += Number(this.user.bonusdisc); }
            this.user.pf += (5+rob.livello);
          }
          if (rob.poteri[j].idpotere == 74 ) { this.user.pf += 5;} //+5 sono nel potere precedente - che è prerequisito. focus contato una sola volta: la prima
        }
      }    

      this.user['rd'] = Math.floor(
        (this.user['carisma'] +
          this.user['intelligenza'] +
          this.user['prontezza'] +
          this.user['percezione'] +
          this.user['fdv']) /
          5
      );

      this.authentication.taum(this.user.idutente).subscribe(
        (data) => {
          this.userskill.taum = data[0].taum;
          this.userskill.necro = data[0].necro;
          this.userskill.rituali = data[0].rituali;
      });      


          
     

      this.forza = this.user['forza'];

    this.rissa = 0;
    this.mischia = 0;
    this.lancio = 0;
    this.tiro = 0;
    this.fuoco = 0;
    this.potenza = 0;
    this.artigli = 0;


    for (let i = 0; i < this.userskill.otherskill.length; i++) {
      if (this.userskill.otherskill[i].idskill == 42) {  //rissa
        this.rissa = Number(this.userskill.otherskill[i].livello);
      }
      if (this.userskill.otherskill[i].idskill == 43) {  //mischia
        this.mischia = Number(this.userskill.otherskill[i].livello);
      }
      if (this.userskill.otherskill[i].idskill == 46) {  //lancio
        this.lancio = Number(this.userskill.otherskill[i].livello);
      }
      if (this.userskill.otherskill[i].idskill == 45) {  //Armi da tiro
        this.tiro = Number(this.userskill.otherskill[i].livello);
      }
      if (this.userskill.otherskill[i].idskill == 44) {  //Armi da fuoco
        this.fuoco = Number(this.userskill.otherskill[i].livello);
      }
    }
    const pot = this.userskill.discipline.find((xx) => xx.iddisciplina == 17); //potenza
    if (pot) {
      this.potenza = Number(pot.livello);
    }
    const prot = this.userskill.discipline.find((xx) => xx.iddisciplina == 18); //proteide
    if (prot && prot.livello > 1) {
      this.artigli = 1;
    }  

    this.forza = this.user['forza'];

    // console.log( "forza:" , this.forza);
    // console.log( "rissa:" , this.rissa);
    // console.log( "mischia:" , this.mischia);
    //console.log( "lancio:" , this.lancio);
    //console.log( "tiro:" , this.tiro);
    //console.log( "fuoco:" , this.fuoco);
    //console.log( "potenza:" , this.potenza);
    //console.log( "artigli:" , this.artigli);

    this.fomipot2 = Math.ceil((this.forza + this.mischia + this.potenza) / 2);
    this.foripot2 = Math.ceil((this.forza + this.rissa + this.potenza) / 2);

    this.folapot2 = Math.ceil((this.forza + this.lancio + this.potenza) / 2);
    this.treti2 = Math.ceil((3 + this.tiro) / 2);

    this.trefuoco2 = Math.ceil((3 + this.fuoco) / 2);


          
    });
  }


}
