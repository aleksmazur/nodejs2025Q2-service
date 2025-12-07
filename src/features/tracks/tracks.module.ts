import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import {
  TracksRepository,
  TypeOrmTracksRepository,
} from './tracks.repository';
import { Track } from './entities/track.entity';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track]),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: TracksRepository,
      useClass: TypeOrmTracksRepository,
    },
  ],
  exports: [TracksService, TracksRepository],
})
export class TracksModule {}
