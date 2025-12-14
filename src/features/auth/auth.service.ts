import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repository';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { TokenResponseDto } from './dto/token-response.dto';

export interface JwtPayload {
  userId: string;
  login: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ id: string }> {
    if (
      typeof signupDto.login !== 'string' ||
      typeof signupDto.password !== 'string' ||
      !signupDto.login ||
      !signupDto.password
    ) {
      throw new BadRequestException(
        'Login and password must be non-empty strings',
      );
    }

    const existingUser = await this.usersRepository.findByLogin(
      signupDto.login,
    );
    if (existingUser) {
      throw new BadRequestException('User with this login already exists');
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    const user = await this.usersRepository.create({
      login: signupDto.login,
      password: hashedPassword,
    });

    return { id: user.id };
  }

  async login(loginDto: LoginDto): Promise<TokenResponseDto> {
    if (
      typeof loginDto.login !== 'string' ||
      typeof loginDto.password !== 'string' ||
      !loginDto.login ||
      !loginDto.password
    ) {
      throw new BadRequestException(
        'Login and password must be non-empty strings',
      );
    }

    const user = await this.usersRepository.findByLogin(loginDto.login);
    if (!user) {
      throw new ForbiddenException('Authentication failed');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new ForbiddenException('Authentication failed');
    }

    return this.generateTokens(user.id, user.login);
  }

  async refresh(refreshDto: RefreshDto): Promise<TokenResponseDto> {
    if (
      !refreshDto.refreshToken ||
      typeof refreshDto.refreshToken !== 'string'
    ) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(
        refreshDto.refreshToken,
        {
          secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
        },
      );

      const user = await this.usersRepository.findById(payload.userId);
      if (!user) {
        throw new ForbiddenException('User not found');
      }

      return this.generateTokens(user.id, user.login);
    } catch (error) {
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }

  private generateTokens(userId: string, login: string): TokenResponseDto {
    const payload: JwtPayload = { userId, login };

    const accessTokenOptions: any = {
      secret: process.env.JWT_SECRET || 'access-secret',
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    };

    const refreshTokenOptions: any = {
      secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    };

    const accessToken = this.jwtService.sign(payload, accessTokenOptions);
    const refreshToken = this.jwtService.sign(payload, refreshTokenOptions);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(userId: string): Promise<JwtPayload | null> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      return null;
    }
    return { userId: user.id, login: user.login };
  }
}
