import { Injectable } from '@nestjs/common';
import { IArtist } from './interfaces/artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';

export abstract class ArtistsRepository {
  abstract create(createArtistDto: CreateArtistDto): Promise<IArtist>;
  abstract findAll(): Promise<IArtist[]>;
  abstract findById(id: string): Promise<IArtist | null>;
  abstract update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<IArtist | null>;
  abstract delete(id: string): Promise<void>;
}

@Injectable()
export class InMemoryArtistsRepository extends ArtistsRepository {
  private readonly artists: IArtist[] = [];

  async create(createArtistDto: CreateArtistDto): Promise<IArtist> {
    const newArtist: IArtist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  async findAll(): Promise<IArtist[]> {
    return this.artists;
  }

  async findById(id: string): Promise<IArtist | null> {
    return this.artists.find((t) => t.id === id) || null;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<IArtist | null> {
    const artistIndex = this.artists.findIndex((t) => t.id === id);
    if (artistIndex === -1) {
      return null;
    }

    const artist = this.artists[artistIndex];
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return artist;
  }

  async delete(id: string): Promise<void> {
    const artistIndex = this.artists.findIndex((t) => t.id === id);
    if (artistIndex !== -1) {
      this.artists.splice(artistIndex, 1);
    }
  }
}
