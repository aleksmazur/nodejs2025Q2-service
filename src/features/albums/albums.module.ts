import { Module, forwardRef } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import {
  AlbumsRepository,
  InMemoryAlbumsRepository,
} from './albums.repository';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [forwardRef(() => TracksModule), forwardRef(() => FavoritesModule)],
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: AlbumsRepository,
      useClass: InMemoryAlbumsRepository,
    },
  ],
  exports: [AlbumsService, AlbumsRepository],
})
export class AlbumsModule {}
