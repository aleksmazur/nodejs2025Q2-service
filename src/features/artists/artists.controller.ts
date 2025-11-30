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
  import { CreateArtistDto } from './dto/create-artist.dto';
  import { UpdateArtistDto } from './dto/update-artist.dto';
  import { ArtistResponseDto } from './dto/artist-response.dto';
  import { ArtistsService } from './artists.service';
  import { validate as uuidValidate } from 'uuid';
  
  @ApiTags('Artists')
  @Controller('artist')
  export class ArtistsController {
    constructor(private readonly artistsService: ArtistsService) {}
  
    @Get()
    @ApiOperation({ summary: 'Get all artists' })
    @ApiResponse({
      status: 200,
      description: 'Returns all artists',
      type: [ArtistResponseDto],
    })
    @HttpCode(HttpStatus.OK)
    async findAll() {
      return await this.artistsService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get artist by id' })
    @ApiParam({
      name: 'id',
      description: 'Artist UUID',
      example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
      status: 200,
      description: 'Returns artist by id',
      type: ArtistResponseDto,
    })
    @ApiResponse({
      status: 400,
      description: 'Invalid artistId format',
    })
    @ApiResponse({
      status: 404,
      description: 'Artist not found',
    })
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string) {
      if (!uuidValidate(id)) {
        throw new BadRequestException('Invalid artistId format');
      }
      return await this.artistsService.findById(id);
    }
  
    @Post()
    @ApiOperation({ summary: 'Create a new artist' })
    @ApiBody({ type: CreateArtistDto })
    @ApiResponse({
      status: 201,
      description: 'Artist created successfully',
      type: ArtistResponseDto,
    })
    @ApiResponse({
      status: 400,
      description: 'Request body does not contain required fields',
    })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createArtistDto: CreateArtistDto) {
      if (
        !createArtistDto.name ||
        createArtistDto.grammy === undefined ||
        createArtistDto.grammy === null
      ) {
        throw new BadRequestException(
          'Request body does not contain required fields',
        );
      }
      return await this.artistsService.create(createArtistDto);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update artist info' })
    @ApiParam({
      name: 'id',
      description: 'Artist UUID',
      example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiBody({ type: UpdateArtistDto })
    @ApiResponse({
      status: 200,
      description: 'Artist updated successfully',
      type: ArtistResponseDto,
    })
    @ApiResponse({
      status: 400,
      description: 'Invalid artistId format',
    })
    @ApiResponse({
      status: 404,
      description: 'Artist not found',
    })
    @HttpCode(HttpStatus.OK)
    async update(
      @Param('id') id: string,
      @Body() updateArtistDto: UpdateArtistDto,
    ) {
      if (!uuidValidate(id)) {
        throw new BadRequestException('Invalid artistId format');
      }
      if (
        !updateArtistDto.name ||
        typeof updateArtistDto.name !== 'string' ||
        updateArtistDto.grammy === undefined ||
        updateArtistDto.grammy === null ||
        typeof updateArtistDto.grammy !== 'boolean'
      ) {
        throw new BadRequestException(
          'Request body does not contain required fields',
        );
      }
      return await this.artistsService.update(id, updateArtistDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete artist by id' })
    @ApiParam({
      name: 'id',
      description: 'Artist UUID',
      example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
      status: 204,
      description: 'Artist deleted successfully',
    })
    @ApiResponse({
      status: 400,
      description: 'Invalid artistId format',
    })
    @ApiResponse({
      status: 404,
      description: 'Artist not found',
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string) {
      if (!uuidValidate(id)) {
        throw new BadRequestException('Invalid artistId format');
      }
    await this.artistsService.delete(id);
    }
  }
  