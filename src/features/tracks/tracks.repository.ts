import { Injectable } from '@nestjs/common';
import { ITrack } from './interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';

export abstract class TracksRepository {
  abstract create(createTrackDto: CreateTrackDto): Promise<ITrack>;
  abstract findAll(): Promise<ITrack[]>;
  abstract findById(id: string): Promise<ITrack | null>;
  abstract update(id: string, updateTrackDto: UpdateTrackDto): Promise<ITrack | null>;
  abstract delete(id: string): Promise<void>;
}

@Injectable()
export class InMemoryTracksRepository extends TracksRepository {
  private readonly tracks: ITrack[] = [];

  async create(createTrackDto: CreateTrackDto): Promise<ITrack> {
    const newTrack: ITrack = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  async findAll(): Promise<ITrack[]> {
    return this.tracks;
  }

  async findById(id: string): Promise<ITrack | null> {
    return this.tracks.find((t) => t.id === id) || null;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<ITrack | null> {
    const trackIndex = this.tracks.findIndex((t) => t.id === id);
    if (trackIndex === -1) {
      return null;
    }

    const track = this.tracks[trackIndex];
    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;

    return track;
  }

  async delete(id: string): Promise<void> {
    const trackIndex = this.tracks.findIndex((t) => t.id === id);
    if (trackIndex !== -1) {
      this.tracks.splice(trackIndex, 1);
    }
  }
}

