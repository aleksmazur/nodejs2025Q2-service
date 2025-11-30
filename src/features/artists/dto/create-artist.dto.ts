import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
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

