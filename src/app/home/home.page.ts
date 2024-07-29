import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';


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

  public barcodes: Barcode[] = [];
  public isPermissionGranted = false;

  listautenti: Array<Utente> = [];
	pgscelto = 0;
	selected = '';
	oggetto = '';


  constructor(private http: HttpClient, private router: Router,  public alertController: AlertController) { 
    this.initialstuff();
  }
  async initialstuff(){
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
    }
    
    let { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
 
    if (available == false ){
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

    // this.oggetto.id='504756580060';
    // this.router.navigate(['/tabs/oggetto']);
    this.barcodes = [];

    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    // console.log('Barcode data', barcodes);
    //var ll = this.barcodes.length;
    this.oggetto=this.barcodes[0].rawValue;
    this.router.navigate(['modifica/'+this.oggetto]);
 
  }

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

  godiablerie(){}
  golistaoggetti(){}

  logoutx() {
		this.router.navigate(['login']);
	}

}
