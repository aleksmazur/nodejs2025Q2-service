import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto {
  @ApiProperty({
    description: 'Track name',
    example: 'Updated Track Name',
  })
  name: string;

  @ApiProperty({
    description: 'Artist UUID (optional)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
  })
  artistId: string | null;

  @ApiProperty({
    description: 'Album UUID (optional)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
  })
  albumId: string | null;

  @ApiProperty({
    description: 'Track duration in seconds',
    example: 180,
  })
  duration: number;
}

