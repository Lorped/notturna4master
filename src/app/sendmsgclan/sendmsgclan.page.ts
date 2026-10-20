import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
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
} from '@ionic/angular';

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
  messaggio = signal('');
  cronache = signal<Cronaca[]>([]);
  cronacheSelezionate = signal<number[]>([]);
  cronacheCaricate = signal(false);
  erroreCaricamentoCronache = signal(false);

  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);
  authservice = inject(AuthserviceService);

  constructor() {
    this.requestID = Number(this.route.snapshot.params['id']);
  }

  ngOnInit() {
    this.authservice.getlistcronache().subscribe({
      next: (cronache) => {
        this.cronache.set(
          cronache.map((cronaca) => ({
            ...cronaca,
            idcronaca: Number(cronaca.idcronaca),
          })),
        );
        this.cronacheCaricate.set(true);
      },
      error: (error: unknown) => {
        console.error('Errore nel caricamento delle cronache:', error);
        this.erroreCaricamentoCronache.set(true);
      },
    });
  }

  toggleCronaca(idcronaca: number): void {
    this.cronacheSelezionate.update((selezionate) =>
      selezionate.includes(idcronaca)
        ? selezionate.filter((id) => id !== idcronaca)
        : [...selezionate, idcronaca],
    );
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
    if (this.isEmpty(this.messaggio())) {
      this.router.navigate(['home']);
    } else {
      if (!this.cronacheCaricate()) {
        alert('Impossibile inviare il messaggio prima di caricare le cronache.');
        return;
      }

      const url = 'https://www.roma-by-night.it/ionicPHP/inviamessaggioclan.php';

      this.http
        .post(url, {
          idutente: -1,
          destinatario: this.requestID,
          messaggio: this.messaggio(),
          idcronaca: this.cronacheSelezionate(),
        })
        .subscribe(() => {
          this.router.navigate(['home']);
        });
    }
  }
}
