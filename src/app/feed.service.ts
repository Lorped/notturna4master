import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

interface DadiResponse {
  status: number | string;
  post?: FeedItem | FeedItem[] | null;
}

export class FeedItem {
  pg: string;
  data: string;
  ora: string;
  testo: string;
  dest: string;

  constructor(
    pg: string,
    data: string,
    ora: string,
    testo: string,
    dest: string
  ) {
    this.pg = pg;
    this.data = data;
    this.ora = ora;
    this.testo = testo;
    this.dest = dest;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private readonly http = inject(HttpClient);

  public getDadi(userid: number) {
    const url = `https://www.roma-by-night.it/ionicPHP/dadi.php?last=0&userid=${userid}`;

    return this.http.get<DadiResponse>(url).pipe(
      map((response): FeedItem[] => {
        const status = Number(response.status);

        if (!Number.isFinite(status)) {
          throw new Error('Invalid status in dadi response');
        }

        if (status === 0) {
          return [];
        }

        if (response.post == null) {
          throw new Error(`Missing post in dadi response for status ${status}`);
        }

        const posts = Array.isArray(response.post)
          ? response.post
          : [response.post];
        return posts.map(
          ({ pg, data, ora, testo, dest }) =>
            new FeedItem(pg, data, ora, testo, dest)
        );
      })
    );
  }
}
