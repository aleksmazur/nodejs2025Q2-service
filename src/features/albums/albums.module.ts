import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumsRepository, InMemoryAlbumsRepository } from './albums.repository';
import { TracksModule } from '../tracks/tracks.module';

@Module({
    imports: [TracksModule],
    controllers: [AlbumsController],
    providers: [AlbumsService,
        {
            provide: AlbumsRepository,
            useClass: InMemoryAlbumsRepository,      
        }
    ],
    exports: [AlbumsService, AlbumsRepository]
})
export class AlbumsModule {}
