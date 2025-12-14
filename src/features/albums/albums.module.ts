import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumsRepository, TypeOrmAlbumsRepository } from './albums.repository';
import { Album } from './entities/album.entity';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: AlbumsRepository,
      useClass: TypeOrmAlbumsRepository,
    },
  ],
  exports: [AlbumsService, AlbumsRepository],
})
export class AlbumsModule {}
