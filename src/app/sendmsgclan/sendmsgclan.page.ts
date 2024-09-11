import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sendmsgclan',
  templateUrl: './sendmsgclan.page.html',
  styleUrls: ['./sendmsgclan.page.scss'],
})
export class SendmsgclanPage implements OnInit {

  requestID = 0 ;
  messaggio = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { 
    this.requestID = Number(this.route.snapshot.params['id']) ;
  }

  isEmpty(value: any) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  }


  ngOnInit() {
  }


  invia () {


    
  
    //console.log(this.isEmpty(this.messaggio));

    if ( this.isEmpty(this.messaggio) === true) {
      this.router.navigate(['home']);
      //console.log("vuoto");
    } else {
      
      console.log("spedito" );
      this.router.navigate(['home']);

      
      var url = 'https://www.roma-by-night.it/ionicPHP/inviamessaggioclan.php';

		
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
