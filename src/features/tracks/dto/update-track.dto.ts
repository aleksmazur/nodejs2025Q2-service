import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class UpdateTrackDto {
  @ApiProperty({
    description: 'Track name',
    example: 'Updated Track Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Artist UUID (optional)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @ApiProperty({
    description: 'Album UUID (optional)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @ApiProperty({
    description: 'Track duration in seconds',
    example: 180,
  })
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
