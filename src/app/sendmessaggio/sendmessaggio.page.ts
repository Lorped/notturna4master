import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonItem,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-sendmessaggio',
  templateUrl: './sendmessaggio.page.html',
  styleUrls: ['./sendmessaggio.page.scss'],
  imports: [
    FormsModule,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonHeader,
    IonItem,
    IonRow,
    IonTextarea,
    IonTitle,
    IonToolbar,
  ],
})
export class SendmessaggioPage  {
  requestID = 0;
  messaggio = '';

  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    this.requestID = Number(this.route.snapshot.params['id']);
  }


  isEmpty(value: string) {
    return (
      value == null || (typeof value === 'string' && value.trim().length === 0)
    );
  }

  invia() {
    //console.log(this.isEmpty(this.messaggio));

    if (this.isEmpty(this.messaggio) === true) {
      this.router.navigate(['home']);
      //console.log("vuoto");
    } else {
      const url = 'https://www.roma-by-night.it/ionicPHP/inviamessaggio.php';

      this.http
        .post(url, {
          idutente: -1,
          destinatario: this.requestID,
          messaggio: this.messaggio,
        })
        .subscribe(() => {
          this.router.navigate(['home']);
        });
    }
  }
}
