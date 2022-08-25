import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SongsPlaylistComponent } from './components/songs-playlist/songs-playlist.component';
import { SongsListenedComponent } from './components/songs-listened/songs-listened.component';
import { SongsFavoritesComponent } from './components/songs-favorites/songs-favorites.component';

import { SongsService } from './services/songs.service';
import { Store } from '../shared/store';

const components = [
  SongsFavoritesComponent,
  SongsListenedComponent,
  SongsPlaylistComponent,
];
@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [...components],
  providers: [SongsService],
  exports: [...components],
})
export class SongsModule {}
