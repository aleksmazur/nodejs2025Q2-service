import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsRepository } from './artists.repository';
import { ArtistResponseDto } from './dto/artist-response.dto';
import { TracksRepository } from '../tracks/tracks.repository';
import { AlbumsRepository } from '../albums/albums.repository';
import { FavoritesRepository } from '../favorites/favorites.repository';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artistsRepository: ArtistsRepository,
    private readonly tracksRepository: TracksRepository,
    private readonly albumsRepository: AlbumsRepository,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistResponseDto> {
    const artist = await this.artistsRepository.create(createArtistDto);
    return artist as ArtistResponseDto;
  }

  async findAll(): Promise<ArtistResponseDto[]> {
    const artists = await this.artistsRepository.findAll();
    return artists as ArtistResponseDto[];
  }

  async findById(id: string): Promise<ArtistResponseDto> {
    const artist = await this.artistsRepository.findById(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist as ArtistResponseDto;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistResponseDto> {
    const artist = await this.artistsRepository.findById(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    const updatedArtist = await this.artistsRepository.update(
      id,
      updateArtistDto,
    );
    return updatedArtist as ArtistResponseDto;
  }

  async delete(id: string): Promise<void> {
    const artist = await this.artistsRepository.findById(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    await this.tracksRepository.removeArtistIdFromTracks(id);
    await this.albumsRepository.removeArtistIdFromAlbums(id);
    await this.favoritesRepository.removeArtistIfExists(id);

    await this.artistsRepository.delete(id);
  }
}
