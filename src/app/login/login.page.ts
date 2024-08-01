import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthserviceService } from '../authservice.service';

import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { CapacitorConfig } from '@capacitor/cli';
import { FCM } from "@capacitor-community/fcm";

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username = '' ;
	userid = 0 ;

	saveme= {
		checked: false
	};
  registerCredentials = { username: '' , password: '' };

  constructor(private router: Router, private http: HttpClient, private authentication: AuthserviceService , private loadingCtrl: LoadingController) { 

    this.registerCredentials.username = window.localStorage.getItem( "notturnauserid" ) ! ;
    this.registerCredentials.password = window.localStorage.getItem( "notturnapasswd" ) ! ;
    if (this.registerCredentials.username != '' )  { this.saveme.checked = true; }

  }

  ngOnInit() {

  }


  public login() {

    // console.log( this.registerCredentials.username );
    // console.log( this.registerCredentials.password );

    this.authentication.login(this.registerCredentials.username, this.registerCredentials.password)
    .subscribe(
      (data: any) => {

        //save if required
        if ( this.saveme.checked == true ) {
          window.localStorage.setItem( "notturnauserid" , this.registerCredentials.username );
          window.localStorage.setItem( "notturnapasswd" , this.registerCredentials.password );
        } else {
          window.localStorage.removeItem( "notturnauserid" );
          window.localStorage.removeItem( "notturnapasswd" );
        }

        this.loadingCtrl.dismiss();

        this.pushsetup();

      },
      (error: any) => {
        this.loadingCtrl.dismiss();
        console.log(error);
        switch ( error['status'] ) {
          case 401:
            alert("Non autorizzato");
          break;
          default:
            alert("Server error");
        }
        // console.log('error');
      }
    );

  }

  pushsetup() {

    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.createChannel(
      {
        name: 'Notturna Channel',
        id: 'PushPluginChannel',
        description: 'Notturna Channel',
        importance: 5,
        sound: 'notturna_sound'
      }
    );

    const config: CapacitorConfig = {
      plugins: {
        PushNotifications: {
          presentationOptions: ["badge", "sound", "alert"],
        },
      },
    };

    PushNotifications.addListener('registration', (token: Token) => {
      //alert('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        //alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        //alert('Push action performed: ' + JSON.stringify(notification));
      },
    );

    FCM.subscribeTo({ topic: 'master' })
      .then(r => console.log(`subscribed to topic`))
      .catch(err => console.log(err));

    this.router.navigate(['home']);

  /**** 


    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      //	if (notification.additionalData.foreground) {
      //		let youralert = this.alertCtrl.create({
      //			title: 'New Push notification',
      //			message: notification.message
      //		});
      //		youralert.present();
      //	}
      //	console.log('Received a notification', notification);
    });

    pushObject.on('registration').subscribe((registration: any) => {
      //do whatever you want with the registration ID

      //console.log('Device registered ', registration.registrationId);
      //alert('Device registered '+registration.registrationId);

      /*
      let updateurl = 'https://www.roma-by-night.it/ionicPHP/updateid.php?userid='+ this.currentUser['userid']+'&id='+registration.registrationId;
      this.http.get(updateurl)
      .subscribe(res =>  {
          // updated
          // alert('Device registered '+registration.registrationId);
      });
      */

  /***** DA VERIFICARE ***/
  /** 

      let topic = "master" ;
      pushObject.subscribe(topic).then((res:any) => {
        //console.log("subscribed to topic: ", res);
        //alert("subscribed to topic: " + res);
      });

    });

    pushObject.on('error').subscribe(error => alert('Error with Push plugin ' + error));


    ***/
  }
}
