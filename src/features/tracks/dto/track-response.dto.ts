import { ApiProperty } from '@nestjs/swagger';

export class TrackResponseDto {
  @ApiProperty({
    description: 'Track UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Track name',
    example: 'Track Name',
  })
  name: string;

  @ApiProperty({
    description: 'Track artist ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
  })
  artistId: string | null;

  @ApiProperty({
    description: 'Track album ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
  })
  albumId: string | null;

  @ApiProperty({
    description: 'Track duration',
    example: 120,
  })
  duration: number;
}
