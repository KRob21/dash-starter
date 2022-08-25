import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Store } from '../../../shared/store';
import { Song, SongsService } from '../../services/songs.service';

@Component({
  selector: 'songs-listened',
  template: `
    <div class="songs">
      <songs-list [list]="listened$ | async" (toggle)="onToggle($event)">
        Listened</songs-list
      >
    </div>
  `,
})
export class SongsListenedComponent implements OnInit {
  listened$!: Observable<Song[]>;
  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit(): void {
    this.listened$ = this.store.select('playlist').pipe(
      filter(Boolean),
      map((playlist: any[]) => playlist.filter((track) => track.listened))
    );
  }
  onToggle(event: any) {
    this.songsService.toggle(event);
  }
}
