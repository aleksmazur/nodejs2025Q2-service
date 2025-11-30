import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import {
  FavoritesRepository,
  InMemoryFavoritesRepository,
} from './favorites.repository';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [ArtistsModule, AlbumsModule, TracksModule],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: FavoritesRepository,
      useClass: InMemoryFavoritesRepository,
    },
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}

