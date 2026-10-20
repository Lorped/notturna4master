import { HttpClient } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 
import { AuthserviceService } from '../authservice.service';
import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { TimesPipe } from '../pipes/times.pipe';

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
    public subskill: Subskill[] = [];
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
    public poteri: Potere[] = [];
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
    public poteri: apottaum[] = [ ]; 
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
    public poteri: apotnecro[] = [];
}

export class Rituale  {
    public idrituale = 0;
    public livello = 0;
    public nomerituale = '';
}

export class Userskill {
    public skill: Skill[] = [];
    public otherskill: Skill[] = [];
    public discipline: Disciplina[] = [];
    public background: Background[] =[];
    public alleati: Alleato[] =[];
    public contatti: Contatto[] =[];
    public taum: ataum[] = [];
    public necro: anecro[] = [];
    public rituali: Rituale[] = [];
    
}

export class Legame {
  nomepg = '';
  livello = 0;
  dataultima = '';
}

export interface BackendLegame {
  target: Legame[];
  domitor: Legame[];
}

export interface BackendUtente {
  utente: User;
  skill: Skill[];
  otherskill: Skill[];
  discipline: Disciplina[];
  background: Background[];
  alleati: Alleato[];
  contatti: Contatto[];
  taum: ataum[];
  necro: anecro[];
  rituali: Rituale[];
}

@Component({
  selector: 'app-personaggio',
  templateUrl: './personaggio.page.html',
  styleUrls: ['./personaggio.page.scss'],
  imports: [
    NgClass,
    IonAccordion,
    IonAccordionGroup,
    IonBackButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel,
    IonRow,
    IonTitle,
    IonToolbar,
    TimesPipe,
  ],
})
export class PersonaggioPage implements OnInit {
  requestID = 0;

  user = signal(new User());
  userskill = signal(new Userskill());

  forza = computed(() => this.user().forza);
  rissa = computed(() => this.livelloSkill(42));
  mischia = computed(() => this.livelloSkill(43));
  lancio = computed(() => this.livelloSkill(46));
  tiro = computed(() => this.livelloSkill(45));
  fuoco = computed(() => this.livelloSkill(44));
  potenza = computed(() => {
    const pot = this.userskill().discipline.find((xx) => xx.iddisciplina == 17);
    return pot ? Number(pot.livello) : 0;
  });
  artigli = computed(() => {
    const prot = this.userskill().discipline.find((xx) => xx.iddisciplina == 18);
    return prot && prot.livello > 1 ? 1 : 0;
  });

  fomipot2 = computed(() =>
    Math.ceil((this.forza() + this.mischia() + this.potenza()) / 2),
  );
  foripot2 = computed(() =>
    Math.ceil((this.forza() + this.rissa() + this.potenza()) / 2),
  );
  folapot2 = computed(() =>
    Math.ceil((this.forza() + this.lancio() + this.potenza()) / 2),
  );
  treti2 = computed(() => Math.ceil((3 + this.tiro()) / 2));
  trefuoco2 = computed(() => Math.ceil((3 + this.fuoco()) / 2));

  listalegami = signal<Legame[]>([]);
  listalegamidomitor = signal<Legame[]>([]);

  public route = inject(ActivatedRoute);
  public http = inject(HttpClient);
  public authentication = inject(AuthserviceService);

  constructor() {
    this.requestID = Number(this.route.snapshot.params['id']);

    const url =
      'https://www.roma-by-night.it/ionicPHP/getlegami.php?id=' +
      this.requestID;
    this.http.get<BackendLegame>(url).subscribe((res: BackendLegame) => {
      if (res.target != null) {
        this.listalegami.set([...res.target]);
      }
      if (res.domitor != null) {
        this.listalegamidomitor.set([...res.domitor]);
      }
    });
  }

  ngOnInit() {
    this.loadPG();
  }

  private livelloSkill(idskill: number): number {
    const skill = this.userskill().otherskill.find((xx) => xx.idskill == idskill);
    return skill ? Number(skill.livello) : 0;
  }

  private changePS(delta: number) {
    this.user.update((user) => ({ ...user, PScorrenti: user.PScorrenti + delta }));
  }

  menops() {
    this.authentication.changeps(this.requestID, -1).subscribe(
      () => this.changePS(-1),
      (error) => {
        console.error('Error decreasing PS:', error);
      }
    );
  }

  piups() {
    this.authentication.changeps(this.requestID, 1).subscribe(
      () => this.changePS(1),
      (error) => {
        console.error('Error increasing PS:', error);
      }
    );
  }

  loadPG() {
    const link =
      'https://www.roma-by-night.it/ionicPHP/getuser.php?id=' + this.requestID;

    this.http.get<BackendUtente>(link).subscribe((res: BackendUtente) => {
      const user = res.utente;

      const numeric = [
        'PScorrenti', 'forza', 'destrezza', 'attutimento', 'carisma',
        'persuasione', 'saggezza', 'prontezza', 'intelligenza', 'percezione',
        'fdv', 'fdvmax', 'fama1', 'fama2', 'fama3', 'xp', 'contanti',
        'maxps', 'bonusrigen', 'rigen',
      ] as const;
      for (const key of numeric) {
        user[key] = Number(user[key]);
      }

      if (user.idlds == 21) {
        user.bonusdisc = Number(user.bonusdisc) + 1;
      }

      user.rd = Math.floor(
        (user.carisma + user.intelligenza + user.prontezza + user.percezione + user.fdv) / 5
      );

      const userskill = new Userskill();
      userskill.skill = res.skill;
      userskill.otherskill = res.otherskill;
      userskill.discipline = res.discipline;
      userskill.background = res.background;
      userskill.alleati = res.alleati;
      userskill.contatti = res.contatti;

      user.pf = (3 + user.attutimento) * 2;
      user.rp = Math.floor(user.attutimento / 2);

      for (const skill of userskill.otherskill) {
        skill.livello = Number(skill.livello);
        if (skill.idskill == 47) { //schivare
          user.pf += skill.livello;
        }
      }

      const rob = userskill.discipline.find((xx) => xx.iddisciplina == 12); //robustezza

      if (rob) {
        rob.livello = Number(rob.livello);
        user.pf += rob.livello;
        user.rp = Math.floor((user.attutimento + rob.livello) / 2);

        for (const potere of rob.poteri) {
          if (potere.idpotere == 70) {
            if (rob.focus > 0) { user.pf += Number(user.bonusdisc); }
            user.pf += 5 + rob.livello;
          }
          if (potere.idpotere == 74) { user.pf += 5; } //+5 sono nel potere precedente - che è prerequisito. focus contato una sola volta: la prima
        }
      }

      this.user.set({ ...user });
      this.userskill.set(userskill);

      this.authentication.taum(user.idutente).subscribe((data) => {
        this.userskill.update((current) => ({
          ...current,
          taum: data[0].taum,
          necro: data[0].necro,
          rituali: data[0].rituali,
        }));
      });
    });
  }
}
