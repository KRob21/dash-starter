import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Store } from '../../../shared/store';

@Component({
  selector: 'songs-favorites',
  template: `
    <div class="songs">
      <div *ngFor="let item of favorites$ | async">
        {{ item.artist }} - {{ item.track }}
      </div>
    </div>
  `,
})
export class SongsFavoritesComponent implements OnInit {
  favorites$: Observable<any[]> | undefined;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.favorites$ = this.store.select('playlist').pipe(
      filter(Boolean),
      map((playlist: any[]) => playlist.filter((track) => track.favourite))
    );
  }
}
