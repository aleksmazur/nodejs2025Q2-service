import { Module, forwardRef } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import {
  TracksRepository,
  InMemoryTracksRepository,
} from './tracks.repository';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: TracksRepository,
      useClass: InMemoryTracksRepository,
    },
  ],
  exports: [TracksService, TracksRepository],
})
export class TracksModule {}
