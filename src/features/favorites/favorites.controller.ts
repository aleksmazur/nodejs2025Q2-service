import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { FavoritesResponseDto } from './dto/favorites-response.dto';
import { validate as uuidValidate } from 'uuid';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: 200,
    description: 'Returns all favorites',
    type: FavoritesResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiParam({
    name: 'id',
    description: 'Track UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 201,
    description: 'Track added to favorites successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid trackId format',
  })
  @ApiResponse({
    status: 422,
    description: 'Track with id does not exist',
  })
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid trackId format');
    }
    await this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiParam({
    name: 'id',
    description: 'Track UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Track removed from favorites successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid trackId format',
  })
  @ApiResponse({
    status: 404,
    description: 'Track is not in favorites',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid trackId format');
    }
    await this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiParam({
    name: 'id',
    description: 'Album UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 201,
    description: 'Album added to favorites successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid albumId format',
  })
  @ApiResponse({
    status: 422,
    description: 'Album with id does not exist',
  })
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid albumId format');
    }
    await this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiParam({
    name: 'id',
    description: 'Album UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Album removed from favorites successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid albumId format',
  })
  @ApiResponse({
    status: 404,
    description: 'Album is not in favorites',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid albumId format');
    }
    await this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiParam({
    name: 'id',
    description: 'Artist UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 201,
    description: 'Artist added to favorites successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid artistId format',
  })
  @ApiResponse({
    status: 422,
    description: 'Artist with id does not exist',
  })
  @HttpCode(HttpStatus.CREATED)
  async addArtist(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid artistId format');
    }
    await this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiParam({
    name: 'id',
    description: 'Artist UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Artist removed from favorites successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid artistId format',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist is not in favorites',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid artistId format');
    }
    await this.favoritesService.removeArtist(id);
  }
}

