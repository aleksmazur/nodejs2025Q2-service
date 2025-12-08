import { ApiProperty } from '@nestjs/swagger';

export class ArtistResponseDto {
  @ApiProperty({
    description: 'Artist UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Artist name',
    example: 'Artist Name',
  })
  name: string;

  @ApiProperty({
    description: 'Artist grammy',
    example: true,
  })
  grammy: boolean;
}
