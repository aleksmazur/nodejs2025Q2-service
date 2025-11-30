import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User login',
    example: 'rs_school_user',
  })
  login: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  password: string;
}

