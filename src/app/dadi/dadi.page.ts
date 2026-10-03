import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
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
} from '@ionic/angular/standalone';

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
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  tiridado: Array<FeedItem> = [];

  feed = inject(FeedService);
  http = inject(HttpClient);

  constructor() {}

  ngOnInit() {
    this.loadDadi();
  }

  loadDadi() {
    this.feed.getDadi(-1).subscribe((allFeeds) => {
      //console.log ("allf", allFeeds);
      this.tiridado = allFeeds;
      this.changeDetectorRef.markForCheck();
    });

    // console.log(this.tiridado)
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
      .post('https://www.roma-by-night.it/ionicPHP/lanciadado.php', {
        userid: 0,
      })
      .subscribe(() => {
        //console.log ('data :' , data);
        this.loadDadi();
      });
  }
}
