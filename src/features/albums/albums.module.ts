import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumsRepository, InMemoryAlbumsRepository } from './albums.repository';

@Module({
    controllers: [AlbumsController],
    providers: [AlbumsService,
        {
            provide: AlbumsRepository,
            useClass: InMemoryAlbumsRepository,      
        }
    ],
    exports: [AlbumsService]
})
export class AlbumsModule {}
