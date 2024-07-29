import { Component, OnInit } from '@angular/core';
import { FeedService, FeedItem } from '../feed.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dadi',
  templateUrl: './dadi.page.html',
  styleUrls: ['./dadi.page.scss'],
})
export class DadiPage implements OnInit {

  tiridado: Array<FeedItem> = [];

  constructor(private feed: FeedService, private http: HttpClient) { }

  ngOnInit() {
    this.loadDadi();
  }

  loadDadi() {
    this.feed.getDadi(-1).subscribe(
      (allFeeds: any)  => {
        //console.log ("allf", allFeeds);
        this.tiridado = allFeeds;
      });

  // console.log(this.tiridado)
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadDadi();
      event.target.complete();
    }, 2000);
  }

  tiraildado(){

    console.log("here");

    this.http.post<any>('https://www.roma-by-night.it/ionicPHP/lanciadado.php', {
      userid: 0
    }).subscribe(
      data => {
        //console.log ('data :' , data);
        this.loadDadi();
    });


	}

}
