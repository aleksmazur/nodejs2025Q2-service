import { Injectable } from '@nestjs/common';
import { IFavorite } from './interfaces/favorite.interface';

export abstract class FavoritesRepository {
  abstract findAll(): Promise<IFavorite>;
  abstract addTrack(trackId: string): Promise<void>;
  abstract removeTrack(trackId: string): Promise<void>;
  abstract addAlbum(albumId: string): Promise<void>;
  abstract removeAlbum(albumId: string): Promise<void>;
  abstract addArtist(artistId: string): Promise<void>;
  abstract removeArtist(artistId: string): Promise<void>;
}

@Injectable()
export class InMemoryFavoritesRepository extends FavoritesRepository {
  private readonly favorites: IFavorite = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async findAll(): Promise<IFavorite> {
    return this.favorites;
  }

  async addTrack(trackId: string): Promise<void> {
    if (!this.favorites.tracks.includes(trackId)) {
      this.favorites.tracks.push(trackId);
    }
  }

  async removeTrack(trackId: string): Promise<void> {
    const index = this.favorites.tracks.indexOf(trackId);
    if (index !== -1) {
      this.favorites.tracks.splice(index, 1);
    }
  }

  async addAlbum(albumId: string): Promise<void> {
    if (!this.favorites.albums.includes(albumId)) {
      this.favorites.albums.push(albumId);
    }
  }

  async removeAlbum(albumId: string): Promise<void> {
    const index = this.favorites.albums.indexOf(albumId);
    if (index !== -1) {
      this.favorites.albums.splice(index, 1);
    }
  }

  async addArtist(artistId: string): Promise<void> {
    if (!this.favorites.artists.includes(artistId)) {
      this.favorites.artists.push(artistId);
    }
  }

  async removeArtist(artistId: string): Promise<void> {
    const index = this.favorites.artists.indexOf(artistId);
    if (index !== -1) {
      this.favorites.artists.splice(index, 1);
    }
  }
}

