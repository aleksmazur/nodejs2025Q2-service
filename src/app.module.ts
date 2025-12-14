import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { TracksModule } from './features/tracks/tracks.module';
import { ArtistsModule } from './features/artists/artists.module';
import { AlbumsModule } from './features/albums/albums.module';
import { FavoritesModule } from './features/favorites/favorites.module';
import { AuthModule } from './features/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './features/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'nodejs2025Q2-service',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
      migrationsRun: true,
    }),
    AuthModule,
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
