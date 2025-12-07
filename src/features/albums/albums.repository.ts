import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAlbum } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

export abstract class AlbumsRepository {
  abstract create(createAlbumDto: CreateAlbumDto): Promise<IAlbum>;
  abstract findAll(): Promise<IAlbum[]>;
  abstract findById(id: string): Promise<IAlbum | null>;
  abstract update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<IAlbum | null>;
  abstract delete(id: string): Promise<void>;
  abstract removeArtistIdFromAlbums(artistId: string): Promise<void>;
}

@Injectable()
export class TypeOrmAlbumsRepository extends AlbumsRepository {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {
    super();
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    const album = this.albumRepository.create({
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId || null,
    });
    const savedAlbum = await this.albumRepository.save(album);
    return {
      id: savedAlbum.id,
      name: savedAlbum.name,
      year: savedAlbum.year,
      artistId: savedAlbum.artistId,
    };
  }

  async findAll(): Promise<IAlbum[]> {
    const albums = await this.albumRepository.find();
    return albums.map((album) => ({
      id: album.id,
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    }));
  }

  async findById(id: string): Promise<IAlbum | null> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      return null;
    }
    return {
      id: album.id,
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<IAlbum | null> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      return null;
    }

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId || null;
    const savedAlbum = await this.albumRepository.save(album);
    return {
      id: savedAlbum.id,
      name: savedAlbum.name,
      year: savedAlbum.year,
      artistId: savedAlbum.artistId,
    };
  }

  async delete(id: string): Promise<void> {
    await this.albumRepository.delete(id);
  }

  async removeArtistIdFromAlbums(artistId: string): Promise<void> {
    await this.albumRepository.update(
      { artistId },
      { artistId: null },
    );
  }
}
