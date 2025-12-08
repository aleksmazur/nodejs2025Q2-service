import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
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
  ApiBody,
} from '@nestjs/swagger';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumResponseDto } from './dto/album-response.dto';
import { AlbumsService } from './albums.service';
import { validate as uuidValidate } from 'uuid';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({
    status: 200,
    description: 'Returns all albums',
    type: [AlbumResponseDto],
  })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get album by id' })
  @ApiParam({
    name: 'id',
    description: 'Album UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns album by id',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid albumId format',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid albumId format');
    }
    return await this.albumsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new album' })
  @ApiBody({ type: CreateAlbumDto })
  @ApiResponse({
    status: 201,
    description: 'Album created successfully',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Request body does not contain required fields',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    if (
      !createAlbumDto.name ||
      createAlbumDto.year === undefined ||
      createAlbumDto.year === null
    ) {
      throw new BadRequestException(
        'Request body does not contain required fields',
      );
    }
    return await this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album info' })
  @ApiParam({
    name: 'id',
    description: 'Album UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateAlbumDto })
  @ApiResponse({
    status: 200,
    description: 'Album updated successfully',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid albumId format',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid albumId format');
    }
    if (
      !updateAlbumDto.name ||
      typeof updateAlbumDto.name !== 'string' ||
      updateAlbumDto.year === undefined ||
      updateAlbumDto.year === null ||
      typeof updateAlbumDto.year !== 'number'
    ) {
      throw new BadRequestException(
        'Request body does not contain required fields',
      );
    }
    return await this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete album by id' })
  @ApiParam({
    name: 'id',
    description: 'Album UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Album deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid albumId format',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid albumId format');
    }
    await this.albumsService.delete(id);
  }
}
