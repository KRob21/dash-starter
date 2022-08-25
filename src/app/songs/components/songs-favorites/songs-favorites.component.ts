import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Store } from '../../../shared/store';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'songs-favorites',
  template: `
    <div class="songs">
      <songs-list [list]="favorites$ | async" (toggle)="onToggle($event)">
        favorites</songs-list
      >
    </div>
  `,
})
export class SongsFavoritesComponent implements OnInit {
  favorites$: Observable<any[]> | undefined;
  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit(): void {
    this.favorites$ = this.store.select('playlist').pipe(
      filter(Boolean),
      map((playlist: any[]) => playlist.filter((track) => track.favourite))
    );
  }
  onToggle(event: any) {
    this.songsService.toggle(event);
  }
}
