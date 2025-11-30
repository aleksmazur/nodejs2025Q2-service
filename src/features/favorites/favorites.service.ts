import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { FavoritesResponseDto } from './dto/favorites-response.dto';
import { ArtistsRepository } from '../artists/artists.repository';
import { AlbumsRepository } from '../albums/albums.repository';
import { TracksRepository } from '../tracks/tracks.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly artistsRepository: ArtistsRepository,
    private readonly albumsRepository: AlbumsRepository,
    private readonly tracksRepository: TracksRepository,
  ) {}

  async findAll(): Promise<FavoritesResponseDto> {
    const favorites = await this.favoritesRepository.findAll();

    const artists = await Promise.all(
      favorites.artists.map((id) => this.artistsRepository.findById(id)),
    );
    const albums = await Promise.all(
      favorites.albums.map((id) => this.albumsRepository.findById(id)),
    );
    const tracks = await Promise.all(
      favorites.tracks.map((id) => this.tracksRepository.findById(id)),
    );

    return {
      artists: artists.filter((a) => a !== null) as any[],
      albums: albums.filter((a) => a !== null) as any[],
      tracks: tracks.filter((t) => t !== null) as any[],
    };
  }

  async addTrack(trackId: string): Promise<void> {
    const track = await this.tracksRepository.findById(trackId);
    if (!track) {
      throw new UnprocessableEntityException(
        `Track with id ${trackId} doesn't exist`,
      );
    }
    await this.favoritesRepository.addTrack(trackId);
  }

  async removeTrack(trackId: string): Promise<void> {
    const favorites = await this.favoritesRepository.findAll();
    if (!favorites.tracks.includes(trackId)) {
      throw new NotFoundException(
        `Track with id ${trackId} is not in favorites`,
      );
    }
    await this.favoritesRepository.removeTrack(trackId);
  }

  async addAlbum(albumId: string): Promise<void> {
    const album = await this.albumsRepository.findById(albumId);
    if (!album) {
      throw new UnprocessableEntityException(
        `Album with id ${albumId} doesn't exist`,
      );
    }
    await this.favoritesRepository.addAlbum(albumId);
  }

  async removeAlbum(albumId: string): Promise<void> {
    const favorites = await this.favoritesRepository.findAll();
    if (!favorites.albums.includes(albumId)) {
      throw new NotFoundException(
        `Album with id ${albumId} is not in favorites`,
      );
    }
    await this.favoritesRepository.removeAlbum(albumId);
  }

  async addArtist(artistId: string): Promise<void> {
    const artist = await this.artistsRepository.findById(artistId);
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id ${artistId} doesn't exist`,
      );
    }
    await this.favoritesRepository.addArtist(artistId);
  }

  async removeArtist(artistId: string): Promise<void> {
    const favorites = await this.favoritesRepository.findAll();
    if (!favorites.artists.includes(artistId)) {
      throw new NotFoundException(
        `Artist with id ${artistId} is not in favorites`,
      );
    }
    await this.favoritesRepository.removeArtist(artistId);
  }
}

