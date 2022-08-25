import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { Store } from '../../shared/store';

@Injectable()
export class SongsService {
  getPlaylist$ = this.http.get('http://localhost:3000/playlist').pipe(
    map((res: any) => res),
    tap((next) => this.store.set('playlist', next))
  );

  constructor(private http: HttpClient, private store: Store) {}
}
