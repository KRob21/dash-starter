import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '../../../shared/store';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'songs-playlist',
  template: `
    <div class="songs">
      <div *ngFor="let item of playlist$ | async">
        {{ item.artist }} - {{ item.track }}
      </div>
    </div>
  `,
})
export class SongsPlaylistComponent implements OnInit, OnDestroy {
  playlist$: Observable<any[]> | undefined;
  subscription: Subscription | undefined;

  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit() {
    this.playlist$ = this.store.select('playlist');
    this.subscription = this.songsService.getPlaylist$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription!.unsubscribe();
  }
}
