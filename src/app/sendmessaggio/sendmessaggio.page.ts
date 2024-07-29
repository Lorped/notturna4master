import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sendmessaggio',
  templateUrl: './sendmessaggio.page.html',
  styleUrls: ['./sendmessaggio.page.scss'],
})
export class SendmessaggioPage implements OnInit {

  requestID = 0 ;
  messaggio = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { 
    this.requestID = Number(this.route.snapshot.params['id']) ;
  }

  ngOnInit() {
  }

  isEmpty(value: any) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  }

  invia () {


    
  
    //console.log(this.isEmpty(this.messaggio));

    if ( this.isEmpty(this.messaggio) === true) {
      this.router.navigate(['home']);
      //console.log("vuoto");
    } else {
      var url = 'https://www.roma-by-night.it/ionicPHP/inviamessaggio.php';

		
      this.http.post<any>(url,  {
        idutente: -1,
        destinatario: this.requestID,
        messaggio: this.messaggio
      })
      .subscribe(res =>  {    
        this.router.navigate(['home']);
      });
    }
    
	}

}
