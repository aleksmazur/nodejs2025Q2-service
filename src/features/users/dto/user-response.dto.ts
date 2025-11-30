import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'User UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'User login',
    example: 'rs_school_user',
  })
  login: string;

  @ApiProperty({
    description: 'Version number (increments on update)',
    example: 1,
  })
  version: number;

  @ApiProperty({
    description: 'Timestamp of creation',
    example: 1234567890,
  })
  createdAt: number;

  @ApiProperty({
    description: 'Timestamp of last update',
    example: 1234567890,
  })
  updatedAt: number;
}
