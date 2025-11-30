import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'Album name',
    example: 'Album Name',
  })
  name: string;

  @ApiProperty({
    description: 'Album year',
    example: 2025,
  })
  year: number;

  @ApiProperty({
    description: 'Album artist UUID (optional)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
  })
  artistId: string | null;
}
