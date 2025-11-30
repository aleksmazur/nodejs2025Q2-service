import { Injectable, NotFoundException } from '@nestjs/common';
import { ITrack } from './interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksRepository } from './tracks.repository';
import { TrackResponseDto } from './dto/track-response.dto';

@Injectable()
export class TracksService {
  constructor(private readonly tracksRepository: TracksRepository) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackResponseDto> {
    const track = await this.tracksRepository.create(createTrackDto);
    return track as TrackResponseDto;
  }

  async findAll(): Promise<TrackResponseDto[]> {
    const tracks = await this.tracksRepository.findAll();
    return tracks as TrackResponseDto[];
  }

  async findById(id: string): Promise<TrackResponseDto> {
    const track = await this.tracksRepository.findById(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track as TrackResponseDto;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<TrackResponseDto> {
    const track = await this.tracksRepository.findById(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    const updatedTrack = await this.tracksRepository.update(id, updateTrackDto);
    return updatedTrack as TrackResponseDto;
  }

  async delete(id: string): Promise<void> {
    const track = await this.tracksRepository.findById(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    await this.tracksRepository.delete(id);
  }
}

