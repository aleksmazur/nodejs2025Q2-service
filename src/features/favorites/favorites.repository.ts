import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFavorite } from './interfaces/favorite.interface';
import { Favorite } from './entities/favorite.entity';

export abstract class FavoritesRepository {
  abstract findAll(): Promise<IFavorite>;
  abstract addTrack(trackId: string): Promise<void>;
  abstract removeTrack(trackId: string): Promise<void>;
  abstract addAlbum(albumId: string): Promise<void>;
  abstract removeAlbum(albumId: string): Promise<void>;
  abstract addArtist(artistId: string): Promise<void>;
  abstract removeArtist(artistId: string): Promise<void>;
  abstract removeTrackIfExists(trackId: string): Promise<void>;
  abstract removeAlbumIfExists(albumId: string): Promise<void>;
  abstract removeArtistIfExists(artistId: string): Promise<void>;
}

@Injectable()
export class TypeOrmFavoritesRepository extends FavoritesRepository {
  private readonly DEFAULT_ID = 'default';

  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {
    super();
  }

  private async getOrCreateFavorite(): Promise<Favorite> {
    let favorite = await this.favoriteRepository.findOne({
      where: { id: this.DEFAULT_ID },
    });

    if (!favorite) {
      favorite = this.favoriteRepository.create({
        id: this.DEFAULT_ID,
        artists: [],
        albums: [],
        tracks: [],
      });
      favorite = await this.favoriteRepository.save(favorite);
    }

    return favorite;
  }

  async findAll(): Promise<IFavorite> {
    const favorite = await this.getOrCreateFavorite();
    return {
      artists: favorite.artists || [],
      albums: favorite.albums || [],
      tracks: favorite.tracks || [],
    };
  }

  async addTrack(trackId: string): Promise<void> {
    const favorite = await this.getOrCreateFavorite();
    if (!favorite.tracks.includes(trackId)) {
      favorite.tracks.push(trackId);
      await this.favoriteRepository.save(favorite);
    }
  }

  async removeTrack(trackId: string): Promise<void> {
    const favorite = await this.getOrCreateFavorite();
    const index = favorite.tracks.indexOf(trackId);
    if (index !== -1) {
      favorite.tracks.splice(index, 1);
      await this.favoriteRepository.save(favorite);
    }
  }

  async addAlbum(albumId: string): Promise<void> {
    const favorite = await this.getOrCreateFavorite();
    if (!favorite.albums.includes(albumId)) {
      favorite.albums.push(albumId);
      await this.favoriteRepository.save(favorite);
    }
  }

  async removeAlbum(albumId: string): Promise<void> {
    const favorite = await this.getOrCreateFavorite();
    const index = favorite.albums.indexOf(albumId);
    if (index !== -1) {
      favorite.albums.splice(index, 1);
      await this.favoriteRepository.save(favorite);
    }
  }

  async addArtist(artistId: string): Promise<void> {
    const favorite = await this.getOrCreateFavorite();
    if (!favorite.artists.includes(artistId)) {
      favorite.artists.push(artistId);
      await this.favoriteRepository.save(favorite);
    }
  }

  async removeArtist(artistId: string): Promise<void> {
    const favorite = await this.getOrCreateFavorite();
    const index = favorite.artists.indexOf(artistId);
    if (index !== -1) {
      favorite.artists.splice(index, 1);
      await this.favoriteRepository.save(favorite);
    }
  }

  async removeTrackIfExists(trackId: string): Promise<void> {
    await this.removeTrack(trackId);
  }

  async removeAlbumIfExists(albumId: string): Promise<void> {
    await this.removeAlbum(albumId);
  }

  async removeArtistIfExists(artistId: string): Promise<void> {
    await this.removeArtist(artistId);
  }
}
