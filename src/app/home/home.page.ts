import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

    var url = 'https://www.roma-by-night.it/ionicPHP/utenti.php';
      
    this.listautenti = [];
  
    this.http.get<any>(url)
    .subscribe( (res:any) => {
      if (res != null) {
        for (let i = 0; i < res.length; i++) {
        let item = res[i];
        let newutente = new Utente(item.nomepg, item.idutente);
        this.listautenti.push(newutente);
        }
      }
        // console.log(this.listautenti);
    });
  

  }

  godadi(){
    this.router.navigate(['dadi']);
  }
  vedischeda(){
    this.router.navigate(['personaggio/'+this.pgscelto] );
  }
  inviamessaggio(){
    this.router.navigate(['sendmessaggio/'+this.pgscelto] );
  }
  openbarcode(){}
  godiablerie(){}
  golistaoggetti(){}

  logoutx() {
		this.router.navigate(['login']);
	}

}
