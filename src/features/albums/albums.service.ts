import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsRepository } from './albums.repository';
import { AlbumResponseDto } from './dto/album-response.dto';
import { TracksRepository } from '../tracks/tracks.repository';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumsRepository: AlbumsRepository,
    private readonly tracksRepository: TracksRepository,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumResponseDto> {
    const album = await this.albumsRepository.create(createAlbumDto);
    return album as AlbumResponseDto;
  }

  async findAll(): Promise<AlbumResponseDto[]> {
    const albums = await this.albumsRepository.findAll();
    return albums as AlbumResponseDto[];
  }

  async findById(id: string): Promise<AlbumResponseDto> {
    const album = await this.albumsRepository.findById(id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album as AlbumResponseDto;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<AlbumResponseDto> {
    const album = await this.albumsRepository.findById(id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    const updatedAlbum = await this.albumsRepository.update(id, updateAlbumDto);
    return updatedAlbum as AlbumResponseDto;
  }

  async delete(id: string): Promise<void> {
    const album = await this.albumsRepository.findById(id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    await this.tracksRepository.removeAlbumIdFromTracks(id);

    await this.albumsRepository.delete(id);
  }
}

