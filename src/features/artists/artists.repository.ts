import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IArtist } from './interfaces/artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

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
export class TypeOrmArtistsRepository extends ArtistsRepository {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {
    super();
  }

  async create(createArtistDto: CreateArtistDto): Promise<IArtist> {
    const artist = this.artistRepository.create({
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    const savedArtist = await this.artistRepository.save(artist);
    return {
      id: savedArtist.id,
      name: savedArtist.name,
      grammy: savedArtist.grammy,
    };
  }

  async findAll(): Promise<IArtist[]> {
    const artists = await this.artistRepository.find();
    return artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      grammy: artist.grammy,
    }));
  }

  async findById(id: string): Promise<IArtist | null> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      return null;
    }
    return {
      id: artist.id,
      name: artist.name,
      grammy: artist.grammy,
    };
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<IArtist | null> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      return null;
    }

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    const savedArtist = await this.artistRepository.save(artist);
    return {
      id: savedArtist.id,
      name: savedArtist.name,
      grammy: savedArtist.grammy,
    };
  }

  async delete(id: string): Promise<void> {
    await this.artistRepository.delete(id);
  }
}
