import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Store } from '../../../shared/store';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'songs-listened',
  template: `
    <div class="songs">
      <div *ngFor="let item of listened$ | async">
        {{ item.artist }} - {{ item.track }}
      </div>
    </div>
  `,
})
export class SongsListenedComponent implements OnInit {
  listened$: Observable<any[]> | undefined;
  constructor(private store: Store, private sonngsService: SongsService) {}

  ngOnInit(): void {
    this.listened$ = this.store.select('playlist').pipe(
      filter(Boolean),
      map((playlist: any[]) => playlist.filter((track) => track.listened))
    );
  }
}
