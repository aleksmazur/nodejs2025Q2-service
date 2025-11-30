import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { ArtistsRepository, InMemoryArtistsRepository } from './artists.repository';

@Module({
    controllers: [ArtistsController],
    providers: [ArtistsService,
        {
            provide: ArtistsRepository,
            useClass: InMemoryArtistsRepository,      
        }
    ],
    exports: [ArtistsService]
})
export class ArtistsModule {}
