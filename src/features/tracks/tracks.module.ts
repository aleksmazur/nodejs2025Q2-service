import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { TracksRepository, InMemoryTracksRepository } from './tracks.repository';

@Module({
    controllers: [TracksController],
    providers: [TracksService,
        {
            provide: TracksRepository,
            useClass: InMemoryTracksRepository,      
        }
    ],
    exports: [TracksService]
})
export class TracksModule {}
