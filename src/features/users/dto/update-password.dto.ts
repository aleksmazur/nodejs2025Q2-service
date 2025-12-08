import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'Previous password',
    example: 'oldPassword123',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: 'New password',
    example: 'newPassword456',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
