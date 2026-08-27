import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { AuthserviceService } from '../authservice.service';
import { Cronaca } from '../global';

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

  public barcodes: Barcode[] = [];
  public isPermissionGranted = false;

  listacronache: Array<Cronaca> = [];
  listautenti: Array<Utente> = [];
  displayedUtenti: Array<Utente> = [];
  selectedCronache: number[] = [];
  pgscelto = 0;
  selected = '';
  oggetto = '';

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
    /***** DEBUG ONLY  */
    // this.oggetto='504756580060';
    // this.router.navigate(['modifica/'+this.oggetto]);

    /***** DEBUG ONLY  */

    this.barcodes = [];

    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    // console.log('Barcode data', barcodes);
    //var ll = this.barcodes.length;
    this.oggetto = this.barcodes[0].rawValue;
    this.router.navigate(['modifica/' + this.oggetto]);
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

  godiablerie() {
    this.router.navigate(['diablerie']);
  }
  golistaoggetti() {
    this.router.navigate(['listaoggetti']);
  }

  logoutx() {
    this.router.navigate(['login']);
  }

  inviamessaggioclan() {
    this.router.navigate(['sendmsgclan/' + this.clanscelto]);
  }
}
