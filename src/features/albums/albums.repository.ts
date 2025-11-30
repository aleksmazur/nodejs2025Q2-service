import { Injectable } from '@nestjs/common';
import { IAlbum } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';

export abstract class AlbumsRepository {
  abstract create(createAlbumDto: CreateAlbumDto): Promise<IAlbum>;
  abstract findAll(): Promise<IAlbum[]>;
  abstract findById(id: string): Promise<IAlbum | null>;
  abstract update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<IAlbum | null>;
  abstract delete(id: string): Promise<void>;
}

@Injectable()
export class InMemoryAlbumsRepository extends AlbumsRepository {
  private readonly albums: IAlbum[] = [];

  async create(createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    const newAlbum: IAlbum = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  async findAll(): Promise<IAlbum[]> {
    return this.albums;
  }

  async findById(id: string): Promise<IAlbum | null> {
    return this.albums.find((t) => t.id === id) || null;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<IAlbum | null> {
    const albumIndex = this.albums.findIndex((t) => t.id === id);
    if (albumIndex === -1) {
      return null;
    }

    const album = this.albums[albumIndex];
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    return album;
  }

  async delete(id: string): Promise<void> {
    const albumIndex = this.albums.findIndex((t) => t.id === id);
    if (albumIndex !== -1) {
      this.albums.splice(albumIndex, 1);
    }
  }
}

