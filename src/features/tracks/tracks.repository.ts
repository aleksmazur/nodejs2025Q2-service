import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITrack } from './interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

export abstract class TracksRepository {
  abstract create(createTrackDto: CreateTrackDto): Promise<ITrack>;
  abstract findAll(): Promise<ITrack[]>;
  abstract findById(id: string): Promise<ITrack | null>;
  abstract update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<ITrack | null>;
  abstract delete(id: string): Promise<void>;
  abstract removeAlbumIdFromTracks(albumId: string): Promise<void>;
  abstract removeArtistIdFromTracks(artistId: string): Promise<void>;
}

@Injectable()
export class TypeOrmTracksRepository extends TracksRepository {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {
    super();
  }

  async create(createTrackDto: CreateTrackDto): Promise<ITrack> {
    const track = this.trackRepository.create({
      name: createTrackDto.name,
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
      duration: createTrackDto.duration,
    });
    const savedTrack = await this.trackRepository.save(track);
    return {
      id: savedTrack.id,
      name: savedTrack.name,
      artistId: savedTrack.artistId,
      albumId: savedTrack.albumId,
      duration: savedTrack.duration,
    };
  }

  async findAll(): Promise<ITrack[]> {
    const tracks = await this.trackRepository.find();
    return tracks.map((track) => ({
      id: track.id,
      name: track.name,
      artistId: track.artistId,
      albumId: track.albumId,
      duration: track.duration,
    }));
  }

  async findById(id: string): Promise<ITrack | null> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      return null;
    }
    return {
      id: track.id,
      name: track.name,
      artistId: track.artistId,
      albumId: track.albumId,
      duration: track.duration,
    };
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<ITrack | null> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      return null;
    }

    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId || null;
    track.albumId = updateTrackDto.albumId || null;
    track.duration = updateTrackDto.duration;
    const savedTrack = await this.trackRepository.save(track);
    return {
      id: savedTrack.id,
      name: savedTrack.name,
      artistId: savedTrack.artistId,
      albumId: savedTrack.albumId,
      duration: savedTrack.duration,
    };
  }

  async delete(id: string): Promise<void> {
    await this.trackRepository.delete(id);
  }

  async removeAlbumIdFromTracks(albumId: string): Promise<void> {
    await this.trackRepository.update({ albumId }, { albumId: null });
  }

  async removeArtistIdFromTracks(artistId: string): Promise<void> {
    await this.trackRepository.update({ artistId }, { artistId: null });
  }
}
