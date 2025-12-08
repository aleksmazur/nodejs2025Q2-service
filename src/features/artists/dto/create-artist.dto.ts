import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    description: 'Artist name',
    example: 'Artist Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Artist grammy',
    example: true,
  })
  @IsBoolean()
  grammy: boolean;
}
