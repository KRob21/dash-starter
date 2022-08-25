import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '../../../shared/store';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'songs-playlist',
  template: `
    <div class="songs">
      <songs-list [list]="playlist$ | async" (toggle)="onToggle($event)">
        playlist</songs-list
      >
    </div>
  `,
})
export class SongsPlaylistComponent implements OnInit, OnDestroy {
  playlist$!: Observable<any[]>;
  subscription!: Subscription;

  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit() {
    this.playlist$ = this.store.select('playlist');
    this.subscription = this.songsService.getPlaylist$.subscribe();
  }

  onToggle(event: any) {
    this.songsService.toggle(event);
  }
  ngOnDestroy(): void {
    this.subscription!.unsubscribe();
  }
}
