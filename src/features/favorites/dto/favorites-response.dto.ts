import { ApiProperty } from '@nestjs/swagger';
import { ArtistResponseDto } from '../../artists/dto/artist-response.dto';
import { AlbumResponseDto } from '../../albums/dto/album-response.dto';
import { TrackResponseDto } from '../../tracks/dto/track-response.dto';

export class FavoritesResponseDto {
  @ApiProperty({
    description: 'Favorite artists',
    type: [ArtistResponseDto],
  })
  artists: ArtistResponseDto[];

  @ApiProperty({
    description: 'Favorite albums',
    type: [AlbumResponseDto],
  })
  albums: AlbumResponseDto[];

  @ApiProperty({
    description: 'Favorite tracks',
    type: [TrackResponseDto],
  })
  tracks: TrackResponseDto[];
}
