import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { Store } from '../../shared/store';
import { Observable } from 'rxjs';

export interface Song {
  id: number;
  track: string;
  artist: string;
  listened: boolean;
  favourite: boolean;
}
@Injectable()
export class SongsService {
  getPlaylist$: Observable<Song[]> = this.http
    .get('http://localhost:3000/playlist')
    .pipe(
      map((res: any) => res),
      tap((next) => this.store.set('playlist', next))
    );

  constructor(private http: HttpClient, private store: Store) {}

  toggle(event: any) {
    console.log(event);
    this.http
      .put(`http://localhost:3000/playlist/${event.id}`, event)
      .pipe(map((res: any) => res))
      .subscribe((track: Song) => {
        const value = this.store.value.playlist;

        const playlist = value.map((song: Song) => {
          if (event.track.id === song.id) {
            return { ...song, ...event.track };
          } else {
            return song;
          }
        });
        this.store.set('playlist', playlist);
      });
  }
}
