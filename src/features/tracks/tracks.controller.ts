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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackResponseDto } from './dto/track-response.dto';
import { TracksService } from './tracks.service';
import { validate as uuidValidate } from 'uuid';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({
    status: 200,
    description: 'Returns all tracks',
    type: [TrackResponseDto],
  })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track by id' })
  @ApiParam({
    name: 'id',
    description: 'Track UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns track by id',
    type: TrackResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid trackId format',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found',
  })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid trackId format');
    }
    return await this.tracksService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new track' })
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({
    status: 201,
    description: 'Track created successfully',
    type: TrackResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Request body does not contain required fields',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto) {
    if (
      !createTrackDto.name ||
      createTrackDto.duration === undefined ||
      createTrackDto.duration === null
    ) {
      throw new BadRequestException(
        'Request body does not contain required fields',
      );
    }
    return await this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track info' })
  @ApiParam({
    name: 'id',
    description: 'Track UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateTrackDto })
  @ApiResponse({
    status: 200,
    description: 'Track updated successfully',
    type: TrackResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid trackId format',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found',
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid trackId format');
    }
    if (
      !updateTrackDto.name ||
      updateTrackDto.duration === undefined ||
      updateTrackDto.duration === null
    ) {
      throw new BadRequestException(
        'Request body does not contain required fields',
      );
    }
    return await this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete track by id' })
  @ApiParam({
    name: 'id',
    description: 'Track UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Track deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid trackId format',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid trackId format');
    }
    await this.tracksService.delete(id);
  }
}