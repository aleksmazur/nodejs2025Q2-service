import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'Previous password',
    example: 'oldPassword123',
  })
  oldPassword: string;

  @ApiProperty({
    description: 'New password',
    example: 'newPassword456',
  })
  newPassword: string;
}

