import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { Cronaca } from '../global';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonHeader,
  IonItem,
  IonRow,
  IonTextarea,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-sendmsgclan',
  templateUrl: './sendmsgclan.page.html',
  styleUrls: ['./sendmsgclan.page.scss'],
  imports: [
    FormsModule,
    IonBackButton,
    IonButton,
    IonButtons,
    IonChip,
    IonCol,
    IonContent,
    IonHeader,
    IonItem,
    IonRow,
    IonTextarea,
    IonText,
    IonTitle,
    IonToolbar,
  ],
})
export class SendmsgclanPage implements OnInit {
  requestID = 0;
  messaggio = '';
  cronache: Cronaca[] = [];
  cronacheSelezionate: number[] = [];
  cronacheCaricate = false;
  erroreCaricamentoCronache = false;

  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);
  authservice = inject(AuthserviceService);
  changeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    this.requestID = Number(this.route.snapshot.params['id']);
  }

  ngOnInit() {
    this.authservice.getlistcronache().subscribe({
      next: (cronache) => {
        this.cronache = cronache.map((cronaca) => ({
          ...cronaca,
          idcronaca: Number(cronaca.idcronaca),
        }));
        this.cronacheCaricate = true;
        this.changeDetectorRef.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Errore nel caricamento delle cronache:', error);
        this.erroreCaricamentoCronache = true;
      },
    });
  }

  toggleCronaca(idcronaca: number): void {
    this.cronacheSelezionate = this.cronacheSelezionate.includes(idcronaca)
      ? this.cronacheSelezionate.filter((id) => id !== idcronaca)
      : [...this.cronacheSelezionate, idcronaca];
  }

  handleCronacaKeydown(event: KeyboardEvent, idcronaca: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleCronaca(idcronaca);
    }
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
      if (!this.cronacheCaricate) {
        alert('Impossibile inviare il messaggio prima di caricare le cronache.');
        return;
      }

      const url = 'https://www.roma-by-night.it/ionicPHP/inviamessaggioclan.php';

      this.http
        .post(url, {
          idutente: -1,
          destinatario: this.requestID,
          messaggio: this.messaggio,
          idcronaca: this.cronacheSelezionate,
        })
        .subscribe(() => {
          this.router.navigate(['home']);
        });
    }
  }
}
