import { Component, OnInit } from '@angular/core';


export class Utente {
  nomepg = '';
  id = 0;

  constructor(nomepg: string, id: number) {
    this.nomepg = nomepg;
    this.id = id;
  }

}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  listautenti: Array<Utente> = [];
	pgscelto = 0;
	selected = '';
	oggetto = '';


  constructor() { }

  ngOnInit() {
  }

  godadi(){}
  vedischeda(){}
  inviamessaggio(){}
  openbarcode(){}
  godiablerie(){}
  golistaoggetti(){}
  logoutx(){}

}
