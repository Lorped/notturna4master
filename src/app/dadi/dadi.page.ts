import { Component, OnInit, inject, signal } from '@angular/core';
import { FeedService, FeedItem } from '../feed.service';
import { HttpClient } from '@angular/common/http';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
} from '@ionic/angular';

@Component({
  selector: 'app-dadi',
  templateUrl: './dadi.page.html',
  styleUrls: ['./dadi.page.scss'],
  imports: [
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonRefresher,
    IonRefresherContent,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
  ],
})
export class DadiPage implements OnInit {
  tiridado = signal<FeedItem[]>([]);

  feed = inject(FeedService);
  http = inject(HttpClient);


  ngOnInit() {
    this.loadDadi();
  }

  loadDadi() {
    this.feed.getDadi(-1).subscribe((allFeeds) => {
      this.tiridado.set(allFeeds);
    });
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      this.loadDadi();
      event.target.complete();
    }, 2000);
  }

  tiraildado() {
    console.log('here');

    this.http
      .get('https://www.roma-by-night.it/ionicPHP/lanciadado.php?userid=0')
      .subscribe(() => {
        //console.log ('data :' , data);
        this.loadDadi();
      });
  }
}
