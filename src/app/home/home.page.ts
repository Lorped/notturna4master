import { HttpClient } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  cameraOutline,
  eyeOutline,
  logOutOutline,
  paperPlaneOutline,
  peopleOutline,
  personOutline,
} from 'ionicons/icons';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { AuthserviceService } from '../authservice.service';
import { Cronaca } from '../global';

export class Esito {
    public motivo = '';
    public descrizione = '';
    public sino = '';
}

export class Oggetto {
    public id = '';
    public nomeoggetto = '';
    public descrizione = '';
    public esito: Esito[] = [];
    public domanda = '';
    public R1 = '';
    public R2 = '';
    public esitoSI: Esito[] = [];
    public esitoNO: Esito[] = [];
    public datascan = '';
}

export class Utente {
  nomepg = '';
  idutente = 0;
  IDcronaca = 0;

}

export class Clan {
  idclan = 0;
  nomeclan = '';
}

export interface ClanResponse {
  clan: Clan[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    FormsModule,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonChip,
    IonCol,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonText,
    IonTitle,
    IonToolbar,
  ],
})
export class HomePage implements OnInit {
  clan = signal<Clan[]>([]);
  clanscelto = signal(0);

  isModalOpen = signal(false);
  oggetto = signal(new Oggetto());


  public barcodes: Barcode[] = [];
  public isPermissionGranted = false;

  listacronache = signal<Cronaca[]>([]);
  listautenti = signal<Utente[]>([]);
  selectedCronache = signal<number[]>([]);
  displayedUtenti = computed(() => {
    const selected = this.selectedCronache();
    const utenti = this.listautenti();
    return selected.length
      ? utenti.filter((utente) => selected.includes(utente.IDcronaca))
      : utenti;
  });
  pgscelto = signal(0);

  pscorrenti = signal(0);
  maxps = signal(0);
  fdv = signal(0);
  fdvmax = signal(0);

  http = inject(HttpClient);
  router = inject(Router);
  alertController = inject(AlertController);
  authservice: AuthserviceService = inject(AuthserviceService);

  constructor() {
    addIcons({
      cameraOutline,
      eyeOutline,
      logOutOutline,
      paperPlaneOutline,
      peopleOutline,
      personOutline,
    });
    this.initialstuff();
  }

  async initialstuff() {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
    }

    try {
      const { available } =
        await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();

      if (available == false) {
        await BarcodeScanner.installGoogleBarcodeScannerModule();
      }
    } catch {
      // scanner non disponibile (es. web)
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async openbarcode() {


    /*******   TEST  ***/
    this.barcodes = [];
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    // console.log('Barcode data', barcodes);
    const rawValue = this.barcodes[0]?.rawValue;
    if (!rawValue) {
      return;
    }
    const id = rawValue.length > 12 ? rawValue.slice(-12) : rawValue;

    this.authservice.barcode(id).subscribe((data) => {
      const oggetto = new Oggetto();
      oggetto.id = id;
      oggetto.nomeoggetto = data.nomeoggetto;
      oggetto.descrizione = data.descrizione;
      oggetto.esito = data.esito;
      oggetto.domanda = data.domanda;
      oggetto.R1 = data.R1;
      oggetto.R2 = data.R2;
      oggetto.esitoSI = data.esitoSI;
      oggetto.esitoNO = data.esitoNO;
      this.oggetto.set(oggetto);
      this.isModalOpen.set(true);
    });
  }

  cancel() {
    this.isModalOpen.set(false);
  }

  ngOnInit() {
    const url = 'https://www.roma-by-night.it/ionicPHP/utenti.php';

    this.http.get<Utente[]>(url).subscribe((res) => {
      this.listautenti.set(res ?? []);
    });

    this.http
      .get<ClanResponse>('https://www.roma-by-night.it/Notturna2/wsPHP/getregistra.php')
      .subscribe((data: ClanResponse) => {
        this.clan.set(data.clan);
      });


    this.authservice.getlistcronache().subscribe(
      (data) => {
        this.listacronache.set(data);
      }
    );

  }

  filterByCronaca(idcronaca: number): void {
    this.pgscelto.set(0);
    idcronaca = Number(idcronaca);

    this.selectedCronache.update((selected) =>
      selected.includes(idcronaca)
        ? selected.filter((id) => id !== idcronaca)
        : [...selected, idcronaca],
    );
  }

  godadi() {
    this.router.navigate(['dadi']);
  }
  vedischeda() {
    this.router.navigate(['personaggio/' + this.pgscelto()]);
  }
  inviamessaggio() {
    this.router.navigate(['sendmessaggio/' + this.pgscelto()]);
  }




  logoutx() {
    this.router.navigate(['login']);
  }

  inviamessaggioclan() {
    this.router.navigate(['sendmsgclan/' + this.clanscelto()]);
  }

  changefdv(change: number) {
    if (this.pgscelto() > 0) {
      this.authservice.changefdv(this.pgscelto(), change).subscribe({
        next: () => {
          this.fdv.update((fdv) => fdv + Number(change));
        },
        error: (error: unknown) => {
          console.error('Error changing FDV:', error);
        },
      });
    } else {
      console.warn('No character selected to change FDV.');
    }
  } 
  
  changeps(change: number) {
    if (this.pgscelto() > 0) {
      this.authservice.changeps(this.pgscelto(), change).subscribe({
        next: () => {
          this.pscorrenti.update((ps) => ps + Number(change));
        },
        error: (error: unknown) => {
          console.error('Error changing PS:', error);
        },
      });
    } else {
      console.warn('No character selected to change PS.');
    }
  }

  checkfdv_ps() {
    // TO DO: Implement the logic to check FDV for the selected character
    this.authservice.getfdv(this.pgscelto()).subscribe({
      next: (data) => {
        this.fdv.set(Number(data.fdv));
        this.fdvmax.set(Number(data.fdvmax));
        this.pscorrenti.set(Number(data.PScorrenti));
        this.maxps.set(Number(data.maxps));
      },
      error: (error: unknown) => {
        console.error('Error retrieving FDV and PS data:', error);
      },
    });
  }

}
