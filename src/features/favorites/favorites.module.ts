import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import {
  FavoritesRepository,
  TypeOrmFavoritesRepository,
} from './favorites.repository';
import { Favorite } from './entities/favorite.entity';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: FavoritesRepository,
      useClass: TypeOrmFavoritesRepository,
    },
  ],
  exports: [FavoritesService, FavoritesRepository],
})
export class FavoritesModule {}
