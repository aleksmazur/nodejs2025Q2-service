import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto {
  @ApiProperty({
    description: 'Artist name',
    example: 'Updated Artist Name',
  })
  name: string;

  @ApiProperty({
    description: 'Artist grammy',
    example: true,
  })
  grammy: boolean;
}

