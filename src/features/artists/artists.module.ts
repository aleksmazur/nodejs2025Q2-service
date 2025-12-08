import { Module, forwardRef } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import {
  ArtistsRepository,
  InMemoryArtistsRepository,
} from './artists.repository';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    {
      provide: ArtistsRepository,
      useClass: InMemoryArtistsRepository,
    },
  ],
  exports: [ArtistsService, ArtistsRepository],
})
export class ArtistsModule {}
