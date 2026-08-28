import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
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
    public esito: Array<Esito> = [];
    public domanda = '';
    public R1 = '';
    public R2 = '';
    public esitoSI: Array<Esito> = [];
    public esitoNO: Array<Esito> = [];
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

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class HomePage implements OnInit {
  clan: Array<Clan> = [];
  clanscelto = 0;

  isModalOpen = false;
  oggetto: Oggetto = new Oggetto();


  public barcodes: Barcode[] = [];
  public isPermissionGranted = false;

  listacronache: Array<Cronaca> = [];
  listautenti: Array<Utente> = [];
  displayedUtenti: Array<Utente> = [];
  selectedCronache: number[] = [];
  pgscelto = 0;
  selected = '';


  pscorrenti = 0;
  maxps = 0;
  fdv = 0;
  fdvmax = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    public alertController: AlertController,
    public authservice: AuthserviceService
  ) {
    this.initialstuff();
  }

  async initialstuff() {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
    }

    let { available } =
      await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();

    if (available == false) {
      // alert("debug: module not available");
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    } else {
      // alert("debug: module available");
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
    this.oggetto.id = this.barcodes[0].rawValue;

    if (this.oggetto.id.length > 12) {
      const newbarcode = this.oggetto.id.substr(-12);
      this.oggetto.id = newbarcode;
    }

    

    /*******   TEST  
    this.oggetto.id='543478635197';
    ***/
    
    this.authservice.barcode( this.oggetto.id).subscribe((data) => {

      this.isModalOpen = true;
      
      // console.log(data);

      this.oggetto.nomeoggetto = data.nomeoggetto;
      this.oggetto.descrizione = data.descrizione;
      this.oggetto.esito = data.esito;
      this.oggetto.domanda = data.domanda;
      this.oggetto.R1 = data.R1;
      this.oggetto.R2 = data.R2;
      this.oggetto.esitoSI = data.esitoSI;
      this.oggetto.esitoNO = data.esitoNO;  


    });
  }

  cancel() {
    this.isModalOpen = false;
  }

  ngOnInit() {
    var url = 'https://www.roma-by-night.it/ionicPHP/utenti.php';

    this.listautenti = [];

    this.http.get<any>(url).subscribe((res: Array<Utente>) => {
      this.listautenti = res;
      this.listautenti.forEach(utente => {
        utente.idutente = Number(utente.idutente);
        utente.IDcronaca = Number(utente.IDcronaca);
      });
      this.applyFiltroCronaca();
      // console.log(this.listautenti);
    });

    this.http
      .get('https://www.roma-by-night.it/Notturna2/wsPHP/getregistra.php')
      .subscribe((data: any) => {
        this.clan = data.clan;
      });


    this.authservice.getlistcronache().subscribe(
      (data: any) => {
        this.listacronache = data;
        this.listacronache.forEach(cronaca => {
          cronaca.idcronaca = Number(cronaca.idcronaca);
        });
      }
    );

  }

  filterByCronaca(idcronaca: number): void {
    this.pgscelto = 0;
    idcronaca = Number(idcronaca);
    const index = this.selectedCronache.indexOf(idcronaca);

    if (index >= 0) {
      this.selectedCronache.splice(index, 1);
    } else {
      this.selectedCronache.push(idcronaca);
    }

    this.applyFiltroCronaca();
  }

  private applyFiltroCronaca(): void {
    if (!this.selectedCronache.length) {
      this.displayedUtenti = [...this.listautenti];
      return;
    }

    this.displayedUtenti = this.listautenti.filter(utente => this.selectedCronache.includes(utente.IDcronaca));

    console.log('Displayed Utenti:', this.displayedUtenti);
  }

  godadi() {
    this.router.navigate(['dadi']);
  }
  vedischeda() {
    this.router.navigate(['personaggio/' + this.pgscelto]);
  }
  inviamessaggio() {
    this.router.navigate(['sendmessaggio/' + this.pgscelto]);
  }




  logoutx() {
    this.router.navigate(['login']);
  }

  inviamessaggioclan() {
    this.router.navigate(['sendmsgclan/' + this.clanscelto]);
  }

  changefdv(change: number) {
    if (this.pgscelto > 0) {
      this.authservice.changefdv(this.pgscelto, change).subscribe(
        (data: any) => {
          //console.log('FDV changed successfully:', data);
          this.fdv = this.fdv + Number(change);
        },
        (error: any) => {
          console.error('Error changing FDV:', error);
        }
      );
    } else {
      console.warn('No character selected to change FDV.');
    }
  } 
  
  changeps(change: number) {
    if (this.pgscelto > 0) {
      this.authservice.changeps(this.pgscelto, change).subscribe(
        (data: any) => {
          //console.log('PS changed successfully:', data);
          this.pscorrenti = this.pscorrenti + Number(change);
        },
        (error: any) => {
          console.error('Error changing PS:', error);
        }
      );
    } else {
      console.warn('No character selected to change PS.');
    }
  }

  checkfdv_ps() {
    // TO DO: Implement the logic to check FDV for the selected character
    this.authservice.getfdv(this.pgscelto).subscribe(
      (data: any) => {
        //console.log('FDV and PS data:', data);
        this.fdv = Number(data.fdv);
        this.fdvmax = Number(data.fdvmax);
        this.pscorrenti = Number(data.PScorrenti);
        this.maxps = Number(data.maxps);
      },
      (error: any) => {
        console.error('Error retrieving FDV and PS data:', error);
      }
    );
  }

}
